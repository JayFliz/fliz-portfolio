import Link from "next/link";
import { experiments } from "@/lib/experiments";

export default function Home() {
  const liveCount = experiments.filter((e) => e.status === "live").length;
  const totalCount = experiments.length;

  return (
    <div className="mx-auto max-w-[72rem] px-6 md:px-10">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <p className="kicker mb-6">Technical Engineer & Builder</p>
        <h1 className="heading-xl mb-8 max-w-[18ch]">
          I build things, then I help people{" "}
          <span className="italic text-accent">use them.</span>
        </h1>
        <p className="mb-10 max-w-[55ch] text-lg leading-relaxed text-text-muted md:text-xl">
          Technical support engineer and full-stack developer with 15+ years
          across startups, government, legal, and enterprise. I learn fast,
          build pragmatic solutions, and bridge the gap between engineering
          and customers.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/experiments"
            className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-medium text-white transition-colors hover:bg-accent-hover"
          >
            View experiments
            <span className="font-mono text-xs opacity-70">
              {liveCount}/{totalCount}
            </span>
          </Link>
          <a
            href="mailto:jay@fliz.co.uk"
            className="inline-flex items-center gap-2 rounded-full border-2 border-text/10 px-7 py-3.5 text-[0.95rem] text-text-muted transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
          </a>
        </div>
      </section>

      <div className="divider">* * *</div>

      {/* What I bring */}
      <section className="py-16 md:py-24">
        <p className="kicker mb-4">What I bring</p>
        <h2 className="heading-lg mb-16 max-w-[20ch]">
          The rare overlap of <span className="text-highlight">building</span>{" "}
          and <span className="text-highlight">supporting.</span>
        </h2>
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <div className="mb-4 font-mono text-4xl font-light text-accent">
              01
            </div>
            <h3 className="heading-md mb-3">Build Products</h3>
            <p className="text-base leading-relaxed text-text-muted">
              NextJS, React, TypeScript, C#, Ruby on Rails. I build full-stack
              applications from scratch — currently a bespoke CRM handling real
              events and real members.
            </p>
          </div>
          <div>
            <div className="mb-4 font-mono text-4xl font-light text-accent">
              02
            </div>
            <h3 className="heading-md mb-3">Support & Debug</h3>
            <p className="text-base leading-relaxed text-text-muted">
              Deep experience in technical support engineering at InfluxData,
              Demandbase, and ScreenCloud. Distributed systems, databases,
              cloud infrastructure — I trace issues through the full stack.
            </p>
          </div>
          <div>
            <div className="mb-4 font-mono text-4xl font-light text-accent">
              03
            </div>
            <h3 className="heading-md mb-3">Bridge the Gap</h3>
            <p className="text-base leading-relaxed text-text-muted">
              The rarest skill in tech: understanding both how products are
              built and how customers use them. I turn customer pain into
              product improvements.
            </p>
          </div>
        </div>
      </section>

      <div className="divider">* * *</div>

      {/* Current focus */}
      <section className="py-16 md:py-24">
        <p className="kicker mb-4">Current focus</p>
        <h2 className="heading-lg mb-16">What I&apos;m working on.</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="group rounded-2xl border border-border-subtle bg-bg-surface p-8 transition-all hover:border-accent/30 hover:shadow-[0_0_0_1px_rgba(37,99,235,0.1)]">
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-medium text-accent">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Active
            </div>
            <h3 className="heading-md mb-3">Ceroc CRM</h3>
            <p className="text-base leading-relaxed text-text-muted">
              Bespoke event and member management system. NextJS, C#, Azure, SQL
              Server. Claude API integration for intelligent data workflows.
            </p>
          </div>
          <div className="group rounded-2xl border border-border-subtle bg-bg-surface p-8 transition-all hover:border-highlight/30 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.1)]">
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-medium text-highlight">
              <span className="inline-block h-2 w-2 rounded-full bg-highlight" />
              Demo
            </div>
            <h3 className="heading-md mb-3">Global Orientation Ritual</h3>
            <p className="text-base leading-relaxed text-text-muted">
              A live experiment for capturing signals, reviewing patterns, and
              turning scattered updates into a weekly orientation ritual.
            </p>
            <Link
              href="/experiments/global-orientation-ritual"
              className="mt-5 inline-flex text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              View experiment &rarr;
            </Link>
          </div>
          <div className="group rounded-2xl border border-border-subtle bg-bg-surface p-8 transition-all hover:border-accent/30 hover:shadow-[0_0_0_1px_rgba(37,99,235,0.1)]">
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-medium text-accent">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Local demo
            </div>
            <h3 className="heading-md mb-3">Stack Demo App</h3>
            <p className="text-base leading-relaxed text-text-muted">
              A compact ticket-board spike used to demonstrate App Router
              structure, Server Actions, and SQLite-backed persistence without
              pretending it is a production deployment.
            </p>
            <Link
              href="/experiments/stack-demo-app"
              className="mt-5 inline-flex text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              View experiment &rarr;
            </Link>
          </div>
        </div>
      </section>

      <div className="divider">* * *</div>

      {/* Tech */}
      <section className="py-16 md:py-24">
        <p className="kicker mb-4">Tech I work with</p>
        <h2 className="heading-lg mb-12">
          Full-stack, from <span className="text-accent">infrastructure</span>{" "}
          to <span className="text-highlight">interface.</span>
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
              className="rounded-full border border-border-subtle bg-bg-surface px-4 py-2 font-mono text-sm text-text-muted transition-colors hover:border-accent/30 hover:text-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
