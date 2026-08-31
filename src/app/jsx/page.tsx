"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { transform } from "sucrase";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import * as LucideReact from "lucide-react";
import * as Recharts from "recharts";

const DEFAULT_CODE = `<div style={{ padding: 24, fontFamily: 'system-ui' }}>
  <h1>Hello JSX</h1>
  <p>Edit the code on the left to see it render here.</p>
</div>`;

const RECENTS_KEY = "jsx-playground-recents";
const MAX_RECENTS = 20;

interface SavedSnippet {
  title: string;
  code: string;
  savedAt: number;
}

function loadRecents(): SavedSnippet[] {
  try {
    return JSON.parse(localStorage.getItem(RECENTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRecent(snippet: SavedSnippet) {
  const recents = loadRecents().filter((r) => r.code !== snippet.code);
  recents.unshift(snippet);
  if (recents.length > MAX_RECENTS) recents.length = MAX_RECENTS;
  try {
    localStorage.setItem(RECENTS_KEY, JSON.stringify(recents));
  } catch {}
}

function deleteRecent(savedAt: number) {
  const recents = loadRecents().filter((r) => r.savedAt !== savedAt);
  try {
    localStorage.setItem(RECENTS_KEY, JSON.stringify(recents));
  } catch {}
}

function codeToHash(code: string): string {
  return compressToEncodedURIComponent(code);
}

function hashToCode(hash: string): string | null {
  try {
    return decompressFromEncodedURIComponent(hash);
  } catch {
    return null;
  }
}

function stubComponent(lib: string, name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Stub = ({ children, ...rest }: any) => {
    const size = typeof rest.size === "number" ? rest.size : undefined;
    return React.createElement(
      "span",
      {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          border: "1px dashed #ccc",
          borderRadius: 4,
          padding: "2px 6px",
          fontSize: size ? Math.max(size * 0.7, 10) : 11,
          color: "#999",
          ...(typeof rest.style === "object" ? rest.style : {}),
        },
        title: `${lib}/${name}`,
        className: typeof rest.className === "string" ? rest.className : undefined,
      },
      children != null ? children : name
    );
  };
  Stub.displayName = name;
  return Stub;
}

const MODULES: Record<string, unknown> = {
  react: React,
  "lucide-react": LucideReact,
  recharts: Recharts,
};

function mockRequire(name: string): unknown {
  if (MODULES[name]) return MODULES[name];
  return new Proxy(
    { __esModule: true },
    {
      get(target, prop) {
        if (prop === "__esModule") return true;
        if (prop === "default") return stubComponent(name, "default");
        if (typeof prop === "string") return stubComponent(name, prop);
        return undefined;
      },
    }
  );
}

function transpileAndRender(code: string): React.ReactNode {
  const isModule = /^\s*(import|export)\s/m.test(code);

  if (!isModule) {
    const wrapped = `return (${code})`;
    const { code: compiled } = transform(wrapped, {
      transforms: ["jsx"],
      jsxRuntime: "classic",
      jsxPragma: "React.createElement",
      jsxFragmentPragma: "React.Fragment",
      production: true,
    });
    const fn = new Function("React", compiled);
    return fn(React);
  }

  const { code: compiled } = transform(code, {
    transforms: ["jsx", "imports"],
    jsxRuntime: "classic",
    jsxPragma: "React.createElement",
    jsxFragmentPragma: "React.Fragment",
    production: true,
  });

  const exports: Record<string, unknown> = {};
  const module = { exports };
  const fn = new Function("require", "exports", "module", "React", compiled);
  fn(mockRequire, exports, module, React);

  const result = module.exports.default ?? module.exports;
  if (typeof result === "function") {
    return React.createElement(result as React.ComponentType);
  }
  return result as React.ReactNode;
}

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default function JsxPlayground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [rendered, setRendered] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);
  const [splitPct, setSplitPct] = useState(65);
  const [recents, setRecents] = useState<SavedSnippet[]>([]);
  const [showRecents, setShowRecents] = useState(false);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const initDone = useRef(false);

  const lineCount = code.split("\n").length;

  const syncScroll = () => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const compile = useCallback((src: string) => {
    try {
      const node = transpileAndRender(src);
      setRendered(node);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  useEffect(() => {
    if (initDone.current) return;
    initDone.current = true;

    const hash = window.location.hash.slice(1);
    if (hash) {
      const decoded = hashToCode(hash);
      if (decoded) {
        setCode(decoded);
        compile(decoded);
        return;
      }
    }
    compile(code);
  }, []);

  useEffect(() => {
    setRecents(loadRecents());
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPct(Math.min(Math.max(pct, 20), 80));
    };
    const onUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCode(val);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => compile(val), 300);
  };

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleShare = () => {
    const hash = codeToHash(code);
    const url = `${window.location.origin}${window.location.pathname}#${hash}`;
    window.history.replaceState(null, "", `#${hash}`);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSave = () => {
    const firstLine = code.trim().split("\n")[0].slice(0, 60);
    const title = prompt("Name this snippet:", firstLine) || firstLine;
    const snippet: SavedSnippet = { title, code, savedAt: Date.now() };
    saveRecent(snippet);
    setRecents(loadRecents());
  };

  const handleLoadRecent = (snippet: SavedSnippet) => {
    setCode(snippet.code);
    compile(snippet.code);
    setShowRecents(false);
    const hash = codeToHash(snippet.code);
    window.history.replaceState(null, "", `#${hash}`);
  };

  const handleDeleteRecent = (savedAt: number, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteRecent(savedAt);
    setRecents(loadRecents());
  };

  return (
    <div className="mx-auto px-6 py-10 md:px-10" style={{ maxWidth: "90vw" }}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="heading-md">JSX Playground</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRecents(!showRecents)}
            className="rounded-lg border border-border px-3 py-1.5 font-mono text-xs transition-colors hover:border-accent"
          >
            Saved ({recents.length})
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg border border-border px-3 py-1.5 font-mono text-xs transition-colors hover:border-accent"
          >
            Save
          </button>
          <button
            onClick={handleShare}
            className="rounded-lg border border-border px-3 py-1.5 font-mono text-xs transition-colors hover:border-accent"
          >
            {copied ? "Copied!" : "Share link"}
          </button>
        </div>
      </div>

      {showRecents && recents.length > 0 && (
        <div className="mb-4 rounded-xl border border-border bg-bg-surface p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="kicker">Saved snippets</span>
            <button
              onClick={() => setShowRecents(false)}
              className="font-mono text-xs text-text-faint hover:text-text"
            >
              Close
            </button>
          </div>
          <div className="grid gap-1">
            {recents.map((r) => (
              <button
                key={r.savedAt}
                onClick={() => handleLoadRecent(r)}
                className="group flex items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-bg"
              >
                <div className="min-w-0">
                  <div className="truncate font-mono text-sm">{r.title}</div>
                  <div className="font-mono text-xs text-text-faint">
                    {formatDate(r.savedAt)}
                  </div>
                </div>
                <span
                  onClick={(e) => handleDeleteRecent(r.savedAt, e)}
                  className="ml-3 shrink-0 font-mono text-xs text-text-faint opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                >
                  Delete
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-0" ref={containerRef} style={{ minHeight: 500 }}>
        <div className="flex flex-col" style={{ width: `${splitPct}%` }}>
          <span className="kicker mb-2">Code</span>
          <div className="relative flex flex-1 overflow-hidden rounded-xl border border-border bg-bg-surface focus-within:border-accent">
            <div
              ref={gutterRef}
              aria-hidden
              className="overflow-hidden py-4 pl-3 pr-2 text-right font-mono text-sm leading-relaxed text-text-faint select-none"
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={handleChange}
              onScroll={syncScroll}
              spellCheck={false}
              className="flex-1 resize-none border-none bg-transparent py-4 pr-4 pl-2 font-mono text-sm leading-relaxed text-text outline-none"
            />
          </div>
        </div>
        <div
          onMouseDown={startDrag}
          className="flex w-3 shrink-0 cursor-col-resize items-center justify-center"
        >
          <div className="h-8 w-1 rounded-full bg-border" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="kicker mb-2">Preview</span>
          <div className="flex-1 overflow-auto rounded-xl border border-border bg-white p-4">
            {error ? (
              <pre className="whitespace-pre-wrap font-mono text-sm text-red-600">
                {error}
              </pre>
            ) : (
              rendered
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
