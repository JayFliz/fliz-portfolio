#!/usr/bin/env python3
"""
Minimal RSS reader: reads an OPML file, fetches every feed, writes one
self-contained HTML page. Read/unread state lives in the browser (localStorage),
so the page can be regenerated as often as you like without losing it.

Usage:
    python3 rssreader.py                       # uses feeds.opml -> reader.html
    python3 rssreader.py feeds.opml out.html
    python3 rssreader.py --days 14             # keep two weeks of items

Requires: pip install feedparser
"""
import argparse
import concurrent.futures as cf
import datetime as dt
import hashlib
import html
import json
import re
import sys
import time
import xml.etree.ElementTree as ET
from pathlib import Path

import feedparser

UA = "rssreader/1.0 (+personal use)"
TAG_RE = re.compile(r"<[^>]+>")


def read_opml(path):
    """Return [(group, title, xmlUrl, htmlUrl), ...] from an OPML file."""
    feeds = []
    root = ET.parse(path).getroot()

    def walk(node, group):
        for o in node.findall("outline"):
            url = o.get("xmlUrl")
            if url:
                feeds.append((group, o.get("title") or o.get("text") or url, url, o.get("htmlUrl", "")))
            else:
                walk(o, o.get("text") or group)

    walk(root.find("body"), "Feeds")
    return feeds


def clean(text, limit=320):
    text = html.unescape(TAG_RE.sub(" ", text or ""))
    text = re.sub(r"\s+", " ", text).strip()
    return text[:limit].rsplit(" ", 1)[0] + "…" if len(text) > limit else text


def entry_time(e):
    for key in ("published_parsed", "updated_parsed", "created_parsed"):
        t = e.get(key)
        if t:
            return dt.datetime(*t[:6], tzinfo=dt.timezone.utc)
    return None


def fetch(feed, since):
    group, title, url, site = feed
    try:
        d = feedparser.parse(url, agent=UA, request_headers={"Accept": "application/rss+xml, application/atom+xml, application/xml;q=0.9, */*;q=0.8"})
    except Exception as ex:  # feedparser is forgiving; this is a last resort
        return title, [], f"{type(ex).__name__}: {ex}"
    status = getattr(d, "status", None)
    if status and status >= 400:
        return title, [], f"HTTP {status}"
    if d.bozo and not d.entries:
        return title, [], f"parse error: {d.bozo_exception}"
    items = []
    for e in d.entries:
        when = entry_time(e)
        if when and when < since:
            continue
        link = e.get("link") or ""
        summary = e.get("summary") or (e.get("content") or [{}])[0].get("value", "")
        items.append({
            "id": hashlib.sha1((link or e.get("id") or e.get("title", "")).encode()).hexdigest()[:12],
            "feed": title,
            "group": group,
            "title": clean(e.get("title", "(untitled)"), 200),
            "link": link,
            "summary": clean(summary),
            "ts": int(when.timestamp()) if when else 0,
            "author": clean(e.get("author", ""), 60),
        })
    return title, items, None


def build_html(items, feeds, errors, generated):
    payload = json.dumps({"items": items, "feeds": feeds, "errors": errors, "generated": generated}, ensure_ascii=False)
    payload = payload.replace("</", "<\\/")  # never let a summary close the <script> tag
    return TEMPLATE.replace("/*DATA*/", payload)


TEMPLATE = r"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Defence feeds</title>
<style>
:root{--bg:#fafaf7;--fg:#1b1b1b;--muted:#6b6b66;--line:#e2e1da;--accent:#2a5d9f;--read:#9a9a94;--card:#fff;--chip:#eeede6}
@media(prefers-color-scheme:dark){:root{--bg:#141412;--fg:#e8e6df;--muted:#9a9890;--line:#2b2a26;--accent:#7fb0ea;--read:#5c5b55;--card:#1c1b18;--chip:#2a2924}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
header{position:sticky;top:0;background:var(--bg);border-bottom:1px solid var(--line);padding:.6rem 1rem;display:flex;gap:.6rem;align-items:center;flex-wrap:wrap;z-index:2}
header h1{font-size:1rem;margin:0 .5rem 0 0}header small{color:var(--muted)}
input[type=search]{flex:1;min-width:160px;padding:.4rem .6rem;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--fg)}
button{padding:.35rem .7rem;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--fg);cursor:pointer}
button:hover{border-color:var(--accent)}
main{display:grid;grid-template-columns:230px 1fr;max-width:1200px;margin:0 auto}
@media(max-width:760px){main{grid-template-columns:1fr}nav{display:flex;flex-wrap:wrap;gap:.3rem;border-right:0!important}}
nav{border-right:1px solid var(--line);padding:1rem .6rem;position:sticky;top:3.2rem;align-self:start;max-height:calc(100vh - 3.2rem);overflow:auto}
nav h2{font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin:.8rem .4rem .3rem}
nav a{display:flex;justify-content:space-between;gap:.5rem;padding:.25rem .5rem;border-radius:5px;color:var(--fg);text-decoration:none;font-size:.9rem}
nav a:hover,nav a.on{background:var(--chip)}nav a b{color:var(--muted);font-weight:500;font-size:.8rem}
nav a.err{color:#b4443c}
section{padding:1rem}
h3.day{font-size:.78rem;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin:1.4rem 0 .5rem;padding-bottom:.3rem;border-bottom:1px solid var(--line)}
article{padding:.6rem 0;border-bottom:1px solid var(--line);display:grid;grid-template-columns:1fr auto;gap:.2rem .8rem}
article .t{font-weight:600;color:var(--fg);text-decoration:none}article .t:hover{color:var(--accent)}
article.read .t,article.read .s{color:var(--read)}
article .m{grid-column:1;font-size:.78rem;color:var(--muted)}article .m span{background:var(--chip);padding:0 .4rem;border-radius:4px;margin-right:.4rem}
article .s{grid-column:1;font-size:.88rem;color:var(--muted);margin:.15rem 0 0}
article .x{grid-row:1/4;grid-column:2;align-self:start;font-size:.8rem;color:var(--muted);white-space:nowrap}
article .x button{font-size:.75rem;padding:.15rem .5rem}
.empty{color:var(--muted);padding:3rem 0;text-align:center}
</style></head><body>
<header><h1>Defence feeds</h1><small id="gen"></small>
<input type="search" id="q" placeholder="Search titles & summaries…">
<label><input type="checkbox" id="unread"> unread only</label>
<button id="markall">Mark all visible read</button></header>
<main><nav id="nav"></nav><section id="list"></section></main>
<script>
const D=/*DATA*/;
const KEY='rssreader.read';let read=new Set(JSON.parse(localStorage.getItem(KEY)||'[]'));
let feed=null,q='',unreadOnly=false;
const $=s=>document.querySelector(s);const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const save=()=>localStorage.setItem(KEY,JSON.stringify([...read]));
const fmt=ts=>ts?new Date(ts*1000).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}):'';
const day=ts=>ts?new Date(ts*1000).toLocaleDateString([], {weekday:'long',day:'numeric',month:'long'}):'Undated';
function nav(){
  const n=$('#nav');const groups={};const counts={};
  D.items.forEach(i=>{counts[i.feed]=(counts[i.feed]||0)+(read.has(i.id)?0:1)});
  D.feeds.forEach(f=>{(groups[f[0]]=groups[f[0]]||[]).push(f)});
  let h=`<a href="#" data-f="" class="${feed===null?'on':''}"><span>All feeds</span><b>${D.items.filter(i=>!read.has(i.id)).length}</b></a>`;
  for(const g in groups){h+=`<h2>${g}</h2>`;groups[g].forEach(f=>{const e=D.errors[f[1]];
    h+=`<a href="#" data-f="${f[1]}" class="${feed===f[1]?'on':''}${e?' err':''}" title="${esc(e||'')}"><span>${esc(f[1])}</span><b>${e?'!':(counts[f[1]]||0)}</b></a>`})}
  n.innerHTML=h;n.querySelectorAll('a').forEach(a=>a.onclick=e=>{e.preventDefault();feed=a.dataset.f||null;render()});
}
function visible(){const s=q.toLowerCase();return D.items.filter(i=>(feed===null||i.feed===feed)&&(!unreadOnly||!read.has(i.id))&&(!s||(i.title+' '+i.summary+' '+i.feed).toLowerCase().includes(s)))}
function render(){
  nav();const L=$('#list');const items=visible();if(!items.length){L.innerHTML='<p class="empty">Nothing here.</p>';return}
  let h='',last='';items.forEach(i=>{const d=day(i.ts);if(d!==last){h+=`<h3 class="day">${d}</h3>`;last=d}
    h+=`<article id="a-${i.id}" class="${read.has(i.id)?'read':''}">
      <a class="t" href="${esc(i.link)}" target="_blank" rel="noopener" data-id="${esc(i.id)}">${esc(i.title)}</a>
      <div class="m"><span>${esc(i.feed)}</span>${i.author?esc(i.author)+' · ':''}${fmt(i.ts)}</div>
      ${i.summary?`<p class="s">${esc(i.summary)}</p>`:''}
      <div class="x"><button data-toggle="${i.id}">${read.has(i.id)?'unread':'read'}</button></div></article>`});
  L.innerHTML=h;
  L.querySelectorAll('a.t').forEach(a=>a.addEventListener('click',()=>{read.add(a.dataset.id);save();render()}));
  L.querySelectorAll('[data-toggle]').forEach(b=>b.onclick=()=>{const id=b.dataset.toggle;read.has(id)?read.delete(id):read.add(id);save();render()});
}
$('#gen').textContent='updated '+new Date(D.generated*1000).toLocaleString();
$('#q').oninput=e=>{q=e.target.value;render()};
$('#unread').onchange=e=>{unreadOnly=e.target.checked;render()};
$('#markall').onclick=()=>{visible().forEach(i=>read.add(i.id));save();render()};
render();
</script></body></html>"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("opml", nargs="?", default="feeds.opml")
    ap.add_argument("out", nargs="?", default="reader.html")
    ap.add_argument("--days", type=int, default=7, help="keep items newer than N days (default 7)")
    ap.add_argument("--workers", type=int, default=8)
    a = ap.parse_args()

    feeds = read_opml(a.opml)
    since = dt.datetime.now(dt.timezone.utc) - dt.timedelta(days=a.days)
    items, errors = [], {}
    with cf.ThreadPoolExecutor(a.workers) as ex:
        for title, got, err in ex.map(lambda f: fetch(f, since), feeds):
            if err:
                errors[title] = err
                print(f"  !! {title}: {err}", file=sys.stderr)
            else:
                print(f"  ok {title}: {len(got)}", file=sys.stderr)
            items.extend(got)

    seen, dedup = set(), []
    for i in sorted(items, key=lambda i: i["ts"], reverse=True):
        if i["id"] not in seen:
            seen.add(i["id"])
            dedup.append(i)

    Path(a.out).write_text(build_html(dedup, [list(f[:2]) for f in feeds], errors, int(time.time())), encoding="utf-8")
    print(f"wrote {a.out}: {len(dedup)} items from {len(feeds) - len(errors)}/{len(feeds)} feeds", file=sys.stderr)


if __name__ == "__main__":
    main()
