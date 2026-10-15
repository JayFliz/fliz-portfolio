// Server-side port of temp/rssreader.py: read an OPML file, fetch every feed,
// return items from the last N days. Read/unread state lives in the browser.
import "server-only";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";

export interface FeedRef {
  group: string;
  title: string;
  url: string;
  site: string;
}

export interface FeedItem {
  id: string;
  feed: string;
  group: string;
  title: string;
  link: string;
  summary: string;
  ts: number; // unix seconds, 0 if undated
  author: string;
}

export interface ReaderData {
  items: FeedItem[];
  feeds: { group: string; title: string }[];
  errors: Record<string, string>;
  generated: number;
}

const UA = "rssreader/1.0 (+personal use)";
const ACCEPT = "application/rss+xml, application/atom+xml, application/xml;q=0.9, */*;q=0.8";
const OPML_PATH = path.join(process.cwd(), "src/lib/rss/feeds.opml");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  parseTagValue: false,
  parseAttributeValue: false,
  htmlEntities: true,
  isArray: (name) => ["outline", "item", "entry", "link"].includes(name),
});

// fast-xml-parser yields a string, or an object with "#text" when the node has attributes.
type Node = string | number | { "#text"?: string; [k: string]: unknown } | undefined;
const text = (v: unknown): string => {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  if (Array.isArray(v)) return text(v[0]);
  return text((v as Record<string, unknown>)["#text"]);
};

export async function readOpml(file = OPML_PATH): Promise<FeedRef[]> {
  const doc = parser.parse(await readFile(file, "utf-8"));
  const feeds: FeedRef[] = [];
  const walk = (nodes: Record<string, string>[] | undefined, group: string) => {
    for (const o of nodes ?? []) {
      const url = o["@_xmlUrl"];
      if (url) feeds.push({ group, title: o["@_title"] || o["@_text"] || url, url, site: o["@_htmlUrl"] || "" });
      else walk(o.outline as unknown as Record<string, string>[], o["@_text"] || group);
    }
  };
  walk(doc.opml?.body?.outline, "Feeds");
  return feeds;
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", mdash: "—", ndash: "–", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", pound: "£" };
const unescape = (s: string) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });

function clean(input: string, limit = 320): string {
  const t = unescape(input.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  if (t.length <= limit) return t;
  const cut = t.slice(0, limit);
  const sp = cut.lastIndexOf(" ");
  return (sp > 0 ? cut.slice(0, sp) : cut) + "…";
}

const shortHash = (s: string) => createHash("sha1").update(s).digest("hex").slice(0, 12);

function parseTime(...candidates: unknown[]): number {
  for (const c of candidates) {
    const ms = Date.parse(text(c));
    if (!Number.isNaN(ms)) return Math.floor(ms / 1000);
  }
  return 0;
}

interface RawEntry {
  title: string;
  link: string;
  id: string;
  summary: string;
  author: string;
  ts: number;
}

// Atom <link> elements: prefer rel="alternate" (or no rel), fall back to the first href.
function atomLink(links: Node[] | undefined): string {
  const list = (links ?? []) as Record<string, string>[];
  const alt = list.find((l) => !l["@_rel"] || l["@_rel"] === "alternate") ?? list[0];
  return alt?.["@_href"] ?? text(alt);
}

function atomAuthor(a: unknown): string {
  const first = Array.isArray(a) ? a[0] : a;
  return first && typeof first === "object" ? text((first as Record<string, unknown>).name) : text(first);
}

function parseFeed(xml: string): RawEntry[] {
  const doc = parser.parse(xml);
  if (doc.feed) {
    return ((doc.feed.entry ?? []) as Record<string, unknown>[]).map((e) => ({
      title: text(e.title),
      link: atomLink(e.link as Node[]),
      id: text(e.id),
      summary: text(e.summary) || text(e.content),
      author: atomAuthor(e.author),
      ts: parseTime(e.published, e.updated),
    }));
  }
  const rssItems = doc.rss?.channel?.item ?? doc["rdf:RDF"]?.item ?? doc["rdf:RDF"]?.channel?.item;
  if (rssItems) {
    return (rssItems as Record<string, unknown>[]).map((e) => ({
      title: text(e.title),
      link: text(e.link),
      id: text(e.guid),
      summary: text(e.description) || text(e["content:encoded"]),
      author: text(e["dc:creator"]) || text(e.author),
      ts: parseTime(e.pubDate, e["dc:date"], e.published, e.updated),
    }));
  }
  throw new Error("parse error: not an RSS or Atom document");
}

async function fetchFeed(feed: FeedRef, since: number): Promise<FeedItem[]> {
  const res = await fetch(feed.url, {
    headers: { "User-Agent": UA, Accept: ACCEPT },
    signal: AbortSignal.timeout(15_000),
  });
  if (res.status >= 400) throw new Error(`HTTP ${res.status}`);
  return parseFeed(await res.text())
    .filter((e) => !e.ts || e.ts >= since)
    .map((e) => ({
      id: shortHash(e.link || e.id || e.title),
      feed: feed.title,
      group: feed.group,
      title: clean(e.title || "(untitled)", 200),
      link: e.link,
      summary: clean(e.summary),
      ts: e.ts,
      author: clean(e.author, 60),
    }));
}

export async function loadReader({ days = 7 } = {}): Promise<ReaderData> {
  const feeds = await readOpml();
  const since = Math.floor(Date.now() / 1000) - days * 86_400;
  const errors: Record<string, string> = {};
  const results = await Promise.allSettled(feeds.map((f) => fetchFeed(f, since)));

  const items: FeedItem[] = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") items.push(...r.value);
    else {
      const err = r.reason instanceof Error ? r.reason : new Error(String(r.reason));
      errors[feeds[i].title] = err.name === "TimeoutError" ? "timed out" : err.message;
    }
  });

  const seen = new Set<string>();
  const dedup = items
    .sort((a, b) => b.ts - a.ts)
    .filter((i) => !seen.has(i.id) && (seen.add(i.id), true));

  return {
    items: dedup,
    feeds: feeds.map(({ group, title }) => ({ group, title })),
    errors,
    generated: Math.floor(Date.now() / 1000),
  };
}
