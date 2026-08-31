import Link from "next/link";
import { experiments } from "@/lib/experiments";

export default function Home() {
  const liveCount = experiments.filter((e) => e.status === "live").length;
  const totalCount = experiments.length;

  return (
    <>
      {/* Hero */}
      <section className="bg-accent">
        <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-32">
          <h1 className="heading-xl mb-10 max-w-[16ch]">
            <span className="highlight-mark">I build things,</span>
            <br />
            <span className="highlight-mark">then I help</span>
            <br />
            <span className="highlight-mark">people</span>{" "}
            <span className="highlight-mark italic">use them.</span>
          </h1>
          <p className="mb-12 max-w-[48ch] font-display text-xl italic leading-relaxed text-text/70 md:text-2xl">
            Technical support engineer and full-stack developer with 15+ years
            across startups, government, legal, and enterprise.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/experiments"
              className="inline-flex items-center gap-3 bg-text px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-80"
            >
              View experiments
              <span className="font-mono text-xs opacity-60">
                {liveCount}/{totalCount}
              </span>
              <span aria-hidden="true">↗</span>
            </Link>
            <a
              href="mailto:jay@fliz.co.uk"
              className="inline-flex items-center gap-2 border-2 border-text bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-widest text-text transition-colors hover:bg-text hover:text-accent"
            >
              Get in touch
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* What I bring */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
          <p className="kicker mb-6">What I bring</p>
          <h2 className="heading-lg mb-20 max-w-[18ch]">
            The rare overlap of{" "}
            <span className="highlight-mark-inline">building</span> and{" "}
            <span className="highlight-mark-inline">supporting.</span>
          </h2>
          <div className="grid gap-16 md:grid-cols-3 md:gap-10">
            <div>
              <div className="mb-5 font-mono text-sm font-medium text-text-faint">
                01
              </div>
              <h3 className="heading-md mb-4">Build Products</h3>
              <p className="text-base leading-relaxed text-text-muted">
                NextJS, React, TypeScript, C#, Ruby on Rails. I build full-stack
                applications from scratch — currently a bespoke CRM handling real
                events and real members.
              </p>
            </div>
            <div>
              <div className="mb-5 font-mono text-sm font-medium text-text-faint">
                02
              </div>
              <h3 className="heading-md mb-4">Support & Debug</h3>
              <p className="text-base leading-relaxed text-text-muted">
                Deep experience in technical support engineering at InfluxData,
                Demandbase, and ScreenCloud. Distributed systems, databases,
                cloud infrastructure — I trace issues through the full stack.
              </p>
            </div>
            <div>
              <div className="mb-5 font-mono text-sm font-medium text-text-faint">
                03
              </div>
              <h3 className="heading-md mb-4">Bridge the Gap</h3>
              <p className="text-base leading-relaxed text-text-muted">
                The rarest skill in tech: understanding both how products are
                built and how customers use them. I turn customer pain into
                product improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current focus */}
      <section className="bg-bg-dark text-text-inverse">
        <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
          <p className="kicker mb-6 !text-accent">Current focus</p>
          <h2 className="heading-lg mb-16">What I&apos;m working on.</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group border border-white/10 p-8 transition-colors hover:border-accent/40">
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-accent">
                <span className="inline-block h-2 w-2 bg-accent" />
                Active
              </div>
              <h3 className="heading-sm mb-3">Ceroc CRM</h3>
              <p className="text-base leading-relaxed text-text-inverse/60">
                Bespoke event and member management system. NextJS, C#, Azure,
                SQL Server. Claude API integration for intelligent data
                workflows.
              </p>
            </div>
            <div className="group border border-white/10 p-8 transition-colors hover:border-accent/40">
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-accent">
                <span className="inline-block h-2 w-2 bg-accent" />
                Demo
              </div>
              <h3 className="heading-sm mb-3">Global Orientation Ritual</h3>
              <p className="text-base leading-relaxed text-text-inverse/60">
                A live experiment for capturing signals, reviewing patterns, and
                turning scattered updates into a weekly orientation ritual.
              </p>
              <Link
                href="/experiments/global-orientation-ritual"
                className="mt-5 inline-flex text-sm font-semibold uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
              >
                View experiment ↗
              </Link>
            </div>
            <div className="group border border-white/10 p-8 transition-colors hover:border-accent/40">
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-accent">
                <span className="inline-block h-2 w-2 bg-accent" />
                Demo
              </div>
              <h3 className="heading-sm mb-3">Franchisee Helpdesk</h3>
              <p className="text-base leading-relaxed text-text-inverse/60">
                A multi-role helpdesk POC for franchise networks — ticket
                management, role-based dashboards, email notifications, and EC2
                deployment.
              </p>
              <Link
                href="/experiments/franchisee-helpdesk"
                className="mt-5 inline-flex text-sm font-semibold uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
              >
                View experiment ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
          <p className="kicker mb-6">Tech I work with</p>
          <h2 className="heading-lg mb-16">
            Full-stack, from{" "}
            <span className="highlight-mark-inline">infrastructure</span> to{" "}
            <span className="highlight-mark-inline">interface.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "NextJS",
              "React",
              "TypeScript",
              "Node.js",
              "C#",
              "Ruby on Rails",
              "Python",
              "PostgreSQL",
              "SQL Server",
              "AWS",
              "Azure",
              "GCP",
              "Kubernetes",
              "Grafana",
              "InfluxDB",
              "GraphQL",
              "Zendesk API",
              "Salesforce",
            ].map((tech) => (
              <span
                key={tech}
                className="border border-border bg-bg-surface px-5 py-2.5 font-mono text-sm text-text-muted transition-colors hover:border-text hover:text-text"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
