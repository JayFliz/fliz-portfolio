import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import crypto from "crypto";

const DATA_DIR = join(process.cwd(), ".data");
const SNIPPETS_FILE = join(DATA_DIR, "jsx-snippets.json");

function getSnippets(): Record<string, string> {
  if (!existsSync(SNIPPETS_FILE)) return {};
  try {
    return JSON.parse(readFileSync(SNIPPETS_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function saveSnippets(snippets: Record<string, string>) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(SNIPPETS_FILE, JSON.stringify(snippets, null, 2));
}

function generateId(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const bytes = crypto.randomBytes(6);
  return Array.from(bytes)
    .map((b) => chars[b % chars.length])
    .join("");
}

export async function POST(req: NextRequest) {
  const { hash } = await req.json();
  if (!hash || typeof hash !== "string") {
    return NextResponse.json({ error: "Missing hash" }, { status: 400 });
  }

  const snippets = getSnippets();

  const existing = Object.entries(snippets).find(([, h]) => h === hash);
  if (existing) {
    return NextResponse.json({ id: existing[0] });
  }

  let id = generateId();
  while (snippets[id]) {
    id = generateId();
  }
  snippets[id] = hash;
  saveSnippets(snippets);

  return NextResponse.json({ id });
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const snippets = getSnippets();
  const hash = snippets[id];
  if (!hash) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ hash });
}
