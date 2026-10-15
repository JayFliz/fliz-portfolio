# rssreader

One Python script, one OPML file, one HTML page. No server, no accounts.

```
pip install feedparser
python3 rssreader.py feeds.opml reader.html
open reader.html          # or just double-click it
```

Flags: `--days 14` keeps two weeks of items (default 7); `--workers 8` parallel fetches.

What the page does: items grouped by day, newest first; sidebar filters by feed
with unread counts; search box; "unread only" toggle; click a headline (opens in a
new tab) or the button to mark read; "mark all visible read". Read state is kept
in the browser's localStorage, so you can regenerate the page as often as you like.
Feeds that failed show a `!` in the sidebar — hover for the error.

## Refresh on a schedule

**macOS / Linux (cron)** – every 30 minutes:

```
*/30 * * * * cd /path/to/rssreader && /usr/bin/python3 rssreader.py feeds.opml reader.html >/dev/null 2>&1
```

**Windows (Task Scheduler)** – action `python.exe`, arguments
`rssreader.py feeds.opml reader.html`, start in the script's folder, trigger
"repeat every 30 minutes".

Bookmark `file:///path/to/reader.html` and hit refresh.

## Adding feeds

Edit `feeds.opml` – or export OPML from any reader and point the script at it.
Nested `<outline>` groups become sidebar sections.
