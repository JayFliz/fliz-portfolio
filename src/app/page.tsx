import Link from "next/link";
import { experiments } from "@/lib/experiments";

export default function Home() {
  const liveCount = experiments.filter((e) => e.status === "live").length;
  const totalCount = experiments.length;

  return (
    <div className="portfolio-shell">
      <section className="hero-panel-grid">
        <div className="hero-panel-copy">
          <p className="mb-4 font-mono text-sm tracking-[0.28em] text-accent uppercase">
            Fliz Portfolio / Demo Focus
          </p>
          <h1
            className="max-w-4xl text-5xl leading-[0.96] tracking-tight md:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Showing the product, not just saying I can build one.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl">
            This portfolio now leads with the Global Orientation Ritual demo: a
            personal intelligence desk for capturing signals, reviewing weak
            patterns, and turning scattered updates into a weekly read on what
            matters.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/experiments/global-orientation-ritual"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-dim"
            >
              Open the demo case study
            </Link>
            <Link
              href="/experiments"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-text-muted transition-colors hover:border-text-muted hover:text-text"
            >
              Browse all experiments
              <span className="font-mono text-xs text-text-faint">
                {liveCount}/{totalCount} live
              </span>
            </Link>
          </div>
        </div>
        <div className="orientation-preview-card">
          <div className="orientation-preview-header">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-text-faint">
              Orientation Overview
            </span>
            <span className="orientation-badge">Live demo concept</span>
          </div>
          <div className="orientation-stat-grid">
            <div className="orientation-stat">
              <span className="orientation-stat-label">Signal Base</span>
              <strong>184</strong>
            </div>
            <div className="orientation-stat">
              <span className="orientation-stat-label">Pending Inbox</span>
              <strong>27</strong>
            </div>
            <div className="orientation-stat">
              <span className="orientation-stat-label">Patterns</span>
              <strong>12</strong>
            </div>
            <div className="orientation-stat">
              <span className="orientation-stat-label">Mean Confidence</span>
              <strong>0.71</strong>
            </div>
          </div>
          <div className="orientation-reading">
            <span className="orientation-stat-label">Current reading</span>
            <p>
              Tactical volatility is rising faster than structural change. The
              desk is designed to stop short-term noise from dominating the
              weekly view.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Tactical 62", "Strategic 78", "Structural 44"].map((item) => (
              <span key={item} className="orientation-pill">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-section-grid">
        <div className="portfolio-section-card portfolio-section-card-wide">
          <p className="portfolio-kicker">What the demo does</p>
          <h2 className="portfolio-section-title">A product spike with a real operating model</h2>
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <h3 className="mb-2 text-lg font-medium">Capture signals</h3>
              <p className="text-sm leading-7 text-text-muted">
                Manual intake and automated inbox flows for fast tactical noise,
                slower strategic moves, and deeper structural change.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">Run a weekly ritual</h3>
              <p className="text-sm leading-7 text-text-muted">
                The app turns scattered observations into implications, open
                questions, and a coherent orientation read.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">Track recurring patterns</h3>
              <p className="text-sm leading-7 text-text-muted">
                Durable movement gets promoted into pattern watchlists with
                explicit supporting evidence and conviction.
              </p>
            </div>
          </div>
        </div>

        <div className="portfolio-section-card">
          <p className="portfolio-kicker">Built with</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js 15",
              "React 19",
              "TypeScript",
              "Prisma",
              "SQLite/Postgres",
              "Route Handlers",
              "RSS Ingestion",
              "AI Adapters",
            ].map((tech) => (
              <span key={tech} className="portfolio-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-section-grid">
        <div className="portfolio-section-card">
          <p className="portfolio-kicker">Why this belongs here</p>
          <h2 className="portfolio-section-title">It shows how I work</h2>
          <p className="text-base leading-8 text-text-muted">
            I build tools around real operating problems: messy inputs,
            uncertain signals, review workflows, and decisions that need a
            usable interface instead of a vague prototype. This demo is a
            stronger portfolio piece than a generic landing page because it
            makes the product thinking visible.
          </p>
        </div>
        <div className="portfolio-section-card">
          <p className="portfolio-kicker">Current site status</p>
          <div className="space-y-4 text-sm leading-7 text-text-muted">
            <p>
              The homepage now frames the portfolio around a concrete app,
              while the experiments section still tracks smaller technical
              spikes and supporting builds.
            </p>
            <p>
              For contact or deeper background, use the links in the main nav
              or jump straight into the experiment detail page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
