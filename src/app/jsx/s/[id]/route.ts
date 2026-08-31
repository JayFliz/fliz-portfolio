import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const SNIPPETS_FILE = join(process.cwd(), ".data", "jsx-snippets.json");

function getSnippets(): Record<string, string> {
  if (!existsSync(SNIPPETS_FILE)) return {};
  try {
    return JSON.parse(readFileSync(SNIPPETS_FILE, "utf-8"));
  } catch {
    return {};
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const snippets = getSnippets();
  const hash = snippets[id];

  const base = new URL("/jsx", req.url);
  if (hash) {
    base.hash = hash;
  }
  return NextResponse.redirect(base);
}
