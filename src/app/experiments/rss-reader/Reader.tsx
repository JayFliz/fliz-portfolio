"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { FeedItem, ReaderData } from "@/lib/rss/reader";

const KEY = "rssreader.read";

const css = `
  .rss { --line: var(--color-border); --chip: var(--color-paper-alt); --read: var(--color-text-faint);
    font-size: 15px; line-height: 1.5; padding: 1.5rem 0 3rem; }
  .rss header { display: flex; gap: .6rem; align-items: center; flex-wrap: wrap;
    padding: .6rem 1rem; border-bottom: 1px solid var(--line); }
  .rss header h1 { font-family: var(--font-display); font-size: 1.4rem; margin: 0 .5rem 0 0; }
  .rss header small { color: var(--color-text-muted); }
  .rss input[type=search] { flex: 1; min-width: 160px; padding: .4rem .6rem; border: 1px solid var(--line);
    border-radius: 6px; background: var(--color-bg-surface); color: var(--color-text); }
  .rss label { display: inline-flex; gap: .3rem; align-items: center; font-size: .9rem; }
  .rss button { padding: .35rem .7rem; border: 1px solid var(--line); border-radius: 6px;
    background: var(--color-bg-surface); color: var(--color-text); cursor: pointer; }
  .rss button:hover { border-color: var(--color-accent); }
  .rss .body { display: grid; grid-template-columns: 230px 1fr; }
  .rss nav { border-right: 1px solid var(--line); padding: 1rem .6rem; position: sticky; top: 0;
    align-self: start; max-height: 100vh; overflow: auto; }
  .rss nav h2 { font-size: .72rem; letter-spacing: .06em; text-transform: uppercase;
    color: var(--color-text-muted); margin: .8rem .4rem .3rem; }
  .rss nav a { display: flex; justify-content: space-between; gap: .5rem; padding: .25rem .5rem;
    border-radius: 5px; color: var(--color-text); text-decoration: none; font-size: .9rem; cursor: pointer; }
  .rss nav a:hover, .rss nav a.on { background: var(--chip); }
  .rss nav a b { color: var(--color-text-muted); font-weight: 500; font-size: .8rem; }
  .rss nav a.err { color: #b4443c; }
  .rss section { padding: 1rem; min-width: 0; }
  .rss h3.day { font-size: .78rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: .06em;
    margin: 1.4rem 0 .5rem; padding-bottom: .3rem; border-bottom: 1px solid var(--line); }
  .rss article { padding: .6rem 0; border-bottom: 1px solid var(--line); display: grid;
    grid-template-columns: 1fr auto; gap: .2rem .8rem; }
  .rss article .t { font-weight: 600; color: var(--color-text); text-decoration: none; }
  .rss article .t:hover { color: var(--color-accent); }
  .rss article.read .t, .rss article.read .s { color: var(--read); }
  .rss article .m { grid-column: 1; font-size: .78rem; color: var(--color-text-muted); }
  .rss article .m span { background: var(--chip); padding: 0 .4rem; border-radius: 4px; margin-right: .4rem; }
  .rss article .s { grid-column: 1; font-size: .88rem; color: var(--color-text-muted); margin: .15rem 0 0; }
  .rss article .x { grid-row: 1 / 4; grid-column: 2; align-self: start; }
  .rss article .x button { font-size: .75rem; padding: .15rem .5rem; }
  .rss .empty { color: var(--color-text-muted); padding: 3rem 0; text-align: center; }
  @media (max-width: 760px) {
    .rss .body { grid-template-columns: 1fr; }
    .rss nav { display: flex; flex-wrap: wrap; gap: .3rem; border-right: 0; position: static; max-height: none; }
  }
`;

const fmtTime = (ts: number) =>
  ts ? new Date(ts * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
const fmtDay = (ts: number) =>
  ts ? new Date(ts * 1000).toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" }) : "Undated";

// Read state is a JSON array of item ids in localStorage, exposed as an external store
// so it hydrates cleanly (null on the server) and stays in sync across tabs.
let memory = "[]"; // fallback when localStorage is unavailable
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getRaw(): string {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return memory;
  }
}

function setRaw(raw: string) {
  memory = raw;
  try {
    localStorage.setItem(KEY, raw);
  } catch {}
  listeners.forEach((cb) => cb());
}

function parseRead(raw: string | null): Set<string> | null {
  if (raw === null) return null;
  try {
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

export default function Reader({ data }: { data: ReaderData }) {
  // null until mounted: read state and local-time formatting only exist in the browser.
  const raw = useSyncExternalStore(subscribe, getRaw, () => null);
  const read = useMemo(() => parseRead(raw), [raw]);
  const [feed, setFeed] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(false);

  const update = (fn: (s: Set<string>) => void) => {
    const next = new Set(read);
    fn(next);
    setRaw(JSON.stringify([...next]));
  };

  const isRead = (i: FeedItem) => read?.has(i.id) ?? false;

  const groups = useMemo(() => {
    const g = new Map<string, string[]>();
    for (const f of data.feeds) g.set(f.group, [...(g.get(f.group) ?? []), f.title]);
    return g;
  }, [data.feeds]);

  const unreadCounts = new Map<string, number>();
  for (const i of data.items) if (!isRead(i)) unreadCounts.set(i.feed, (unreadCounts.get(i.feed) ?? 0) + 1);
  const totalUnread = [...unreadCounts.values()].reduce((a, b) => a + b, 0);

  const s = q.toLowerCase();
  const visible = data.items.filter(
    (i) =>
      (feed === null || i.feed === feed) &&
      (!unreadOnly || !isRead(i)) &&
      (!s || `${i.title} ${i.summary} ${i.feed}`.toLowerCase().includes(s)),
  );

  let lastDay = "";

  return (
    <div className="rss">
      <style>{css}</style>
      <header>
        <h1>Defence feeds</h1>
        <small suppressHydrationWarning>
          {read && `updated ${new Date(data.generated * 1000).toLocaleString()}`}
        </small>
        <input type="search" placeholder="Search titles & summaries…" value={q} onChange={(e) => setQ(e.target.value)} />
        <label>
          <input type="checkbox" checked={unreadOnly} onChange={(e) => setUnreadOnly(e.target.checked)} /> unread only
        </label>
        <button onClick={() => update((r) => visible.forEach((i) => r.add(i.id)))}>Mark all visible read</button>
      </header>
      <div className="body">
        <nav>
          <a className={feed === null ? "on" : ""} onClick={() => setFeed(null)}>
            <span>All feeds</span>
            <b>{totalUnread}</b>
          </a>
          {[...groups].map(([group, titles]) => (
            <div key={group} style={{ display: "contents" }}>
              <h2>{group}</h2>
              {titles.map((t) => {
                const err = data.errors[t];
                return (
                  <a
                    key={t}
                    className={`${feed === t ? "on" : ""}${err ? " err" : ""}`}
                    title={err ?? ""}
                    onClick={() => setFeed(t)}
                  >
                    <span>{t}</span>
                    <b>{err ? "!" : (unreadCounts.get(t) ?? 0)}</b>
                  </a>
                );
              })}
            </div>
          ))}
        </nav>
        <section>
          {!read ? (
            <p className="empty">Loading…</p>
          ) : !visible.length ? (
            <p className="empty">Nothing here.</p>
          ) : (
            visible.map((i) => {
              const day = fmtDay(i.ts);
              const heading = day !== lastDay ? <h3 className="day">{day}</h3> : null;
              lastDay = day;
              const r = isRead(i);
              return (
                <div key={i.id}>
                  {heading}
                  <article className={r ? "read" : ""}>
                    <a className="t" href={i.link} target="_blank" rel="noopener" onClick={() => update((set) => set.add(i.id))}>
                      {i.title}
                    </a>
                    <div className="m">
                      <span>{i.feed}</span>
                      {i.author && `${i.author} · `}
                      {fmtTime(i.ts)}
                    </div>
                    {i.summary && <p className="s">{i.summary}</p>}
                    <div className="x">
                      <button onClick={() => update((set) => (r ? set.delete(i.id) : set.add(i.id)))}>{r ? "unread" : "read"}</button>
                    </div>
                  </article>
                </div>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
}
