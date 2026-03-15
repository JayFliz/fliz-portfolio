import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { experiments, getExperiment } from "@/lib/experiments";

// Generate static paths for all known experiments
export function generateStaticParams() {
  return experiments.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) return { title: "Not Found" };
  return {
    title: `${experiment.title} — Jay Greasley`,
    description: experiment.description,
  };
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experiment = getExperiment(slug);

  if (!experiment) {
    notFound();
  }

  const isOrientationDemo = experiment.slug === "global-orientation-ritual";
  const isStackDemo = experiment.slug === "stack-demo-app";

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Link
        href="/experiments"
        className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-text"
      >
        ← Back to experiments
      </Link>

      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-accent uppercase">
            Experiment
          </span>
          <span className="font-mono text-xs text-text-faint">
            {new Date(experiment.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <h1
          className="mb-4 text-4xl tracking-tight md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {experiment.title}
        </h1>
        <p className="mb-6 max-w-lg text-lg text-text-muted">
          {experiment.description}
        </p>
        {isOrientationDemo ? (
          <div className="mb-6">
            <a
              href="https://gor-orcin.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-sm text-text transition-colors hover:bg-bg-elevated"
            >
              View live demo
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {experiment.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border-subtle px-3 py-1 font-mono text-xs text-text-faint"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {isOrientationDemo ? (
        <>
          <div className="orientation-demo-surface">
            <div className="orientation-demo-grid">
              <div className="orientation-demo-card">
                <p className="portfolio-kicker">Overview</p>
                <h2 className="portfolio-section-title">A dashboard for reading the week</h2>
                <p className="text-base leading-8 text-text-muted">
                  This spike explores how to collect raw inputs, classify them by
                  time horizon, and then produce a calmer weekly view. The point
                  is not just storing notes. It is helping a user separate urgent
                  noise from durable movement.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Signal Base", "184 tracked observations"],
                    ["Inbox", "27 candidates awaiting review"],
                    ["Patterns", "12 recurring themes under watch"],
                    ["Rituals", "Weekly synthesis and implications"],
                  ].map(([label, value]) => (
                    <div key={label} className="orientation-mini-card">
                      <span className="orientation-stat-label">{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="orientation-demo-card">
                <p className="portfolio-kicker">Workflow</p>
                <div className="space-y-4 text-sm leading-7 text-text-muted">
                  <p>1. Capture new inputs into an inbox fed by manual entry and ingestion adapters.</p>
                  <p>2. Promote worthwhile items into signals with domain, type, speed, and confidence.</p>
                  <p>3. Run a weekly ritual to synthesize implications and surface open questions.</p>
                  <p>4. Promote repeated movement into patterns only when the evidence base is strong enough.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="orientation-demo-card">
                <p className="portfolio-kicker">Representative UI</p>
                <div className="orientation-ui-board">
                  <div className="orientation-ui-column">
                    <span className="orientation-stat-label">Recent Signals</span>
                    {[
                      "Export restrictions tighten around advanced chips",
                      "Middle-market budgets shift from tooling to enablement",
                      "Regional energy policy changes make supply risk visible",
                    ].map((item) => (
                      <div key={item} className="orientation-list-row">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="orientation-ui-column">
                    <span className="orientation-stat-label">Pattern Watchlist</span>
                    {[
                      "AI governance moving from policy to procurement",
                      "More teams asking for low-ops intelligence workflows",
                      "Economic uncertainty increasing shorter planning cycles",
                    ].map((item) => (
                      <div key={item} className="orientation-list-row">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="orientation-demo-card">
                <p className="portfolio-kicker">Stack and shape</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js App Router",
                    "Prisma schema",
                    "CRUD routes",
                    "Seed data",
                    "RSS ingestion",
                    "AI provider abstraction",
                  ].map((item) => (
                    <span key={item} className="portfolio-tag">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-7 text-text-muted">
                  The scaffold is intentionally restrained. It proves the domain
                  model, workflow, and interaction design first, then leaves room
                  for auth, jobs, and deeper visualisation later.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-border-subtle pt-12">
            <h2 className="mb-6 font-mono text-xs tracking-widest text-text-faint uppercase">
              What I learned
            </h2>
            <div className="space-y-5 text-text-muted">
              <p>
                A better demo starts with a concrete decision-making workflow,
                not a list of features. As soon as the app was framed around a
                weekly ritual, the data model and navigation became much clearer.
              </p>
              <p>
                The strongest part of this spike is the separation of tactical,
                strategic, and structural speeds. That simple distinction gives
                the interface a clear job and stops everything collapsing into a
                generic notes app.
              </p>
            </div>
          </div>
        </>
      ) : isStackDemo ? (
        <>
          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-border-subtle bg-bg-surface p-4 shadow-[0_18px_40px_rgba(72,53,28,0.12)]">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2 pt-2">
                <div>
                  <p className="portfolio-kicker">Captured locally</p>
                  <h2 className="mt-2 text-2xl font-medium tracking-tight">
                    Ticket board screenshot from the spike app
                  </h2>
                </div>
                <span className="rounded-full border border-border-subtle px-3 py-1 font-mono text-xs text-text-muted">
                  Not deployed
                </span>
              </div>
              <div className="overflow-hidden rounded-[1.25rem] border border-border-subtle">
                <Image
                  src="/experiments/stack-demo-board.png"
                  alt="Stack Demo App ticket board showing a local SQLite-backed kanban interface."
                  width={1440}
                  height={1100}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.5rem] border border-border-subtle bg-bg-surface p-8">
                <p className="portfolio-kicker">Why this exists</p>
                <h2 className="portfolio-section-title">
                  A minimal stack reference turned into a working board
                </h2>
                <div className="space-y-4 text-base leading-8 text-text-muted">
                  <p>
                    This experiment was built as a small proof of structure:
                    keep routing in the App Router, push domain logic into a
                    feature folder, and use a file-backed SQLite database so the
                    demo survives server restarts.
                  </p>
                  <p>
                    It is intentionally local-only. The point is to show the
                    architecture and interaction pattern, not to treat a tiny
                    spike like a hosted product.
                  </p>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border-subtle bg-bg-surface p-8">
                <p className="portfolio-kicker">What it demonstrates</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "App Router pages",
                    "Feature-first folders",
                    "SQLite persistence",
                    "Zod validation",
                    "Server Actions",
                    "Simple kanban workflow",
                  ].map((item) => (
                    <span key={item} className="portfolio-tag">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6 space-y-3 text-sm leading-7 text-text-muted">
                  <p>1. Create a ticket with a validated Server Action.</p>
                  <p>2. Persist it into a local SQLite file.</p>
                  <p>3. Read grouped board data through a query and service layer.</p>
                  <p>4. Move cards between columns without adding deployment complexity.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-border-subtle pt-12">
            <h2 className="mb-6 font-mono text-xs tracking-widest text-text-faint uppercase">
              What I learned
            </h2>
            <div className="space-y-5 text-text-muted">
              <p>
                A small demo gets more credible once it persists real state.
                Even a lightweight SQLite file changes the exercise from static
                UI to something closer to an application slice.
              </p>
              <p>
                Keeping the scope narrow also matters. This is more useful in
                the portfolio as a concise architecture example than it would be
                as another half-finished hosted app.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-lg border border-border-subtle bg-bg-surface p-12">
            <div className="text-center">
              <p className="mb-2 font-mono text-sm text-text-faint">
                {experiment.status === "planned"
                  ? "Coming soon"
                  : experiment.status === "wip"
                    ? "Work in progress"
                    : "Demo"}
              </p>
              <p className="text-text-muted">
                {experiment.status === "live"
                  ? "Replace this placeholder with your experiment component."
                  : "This experiment is still in development. Check back soon."}
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-border-subtle pt-12">
            <h2 className="mb-6 font-mono text-xs tracking-widest text-text-faint uppercase">
              What I learned
            </h2>
            <div className="prose prose-invert max-w-none text-text-muted">
              <p>
                Notes and learnings will go here as the experiment progresses.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
