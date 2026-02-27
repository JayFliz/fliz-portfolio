import Link from "next/link";
import { experiments } from "@/lib/experiments";

export default function Home() {
  const liveCount = experiments.filter((e) => e.status === "live").length;
  const totalCount = experiments.length;

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="flex min-h-[70vh] flex-col justify-center py-20">
        <p className="mb-4 font-mono text-sm tracking-widest text-accent uppercase">
          Jay Greasley
        </p>
        <h1
          className="mb-6 text-5xl leading-tight tracking-tight md:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          I build things,
          <br />
          then I help people
          <br />
          <span className="italic text-text-muted">use them.</span>
        </h1>
        <p className="mb-10 max-w-lg text-lg leading-relaxed text-text-muted">
          Technical support engineer and full-stack developer with 15+ years
          across startups, government, legal, and enterprise. I learn fast,
          build pragmatic solutions, and bridge the gap between engineering
          and customers.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/experiments"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-dim"
          >
            View experiments
            <span className="font-mono text-xs opacity-70">
              {liveCount}/{totalCount}
            </span>
          </Link>
          <a
            href="mailto:jay@fliz.co.uk"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-text-muted transition-colors hover:border-text-muted hover:text-text"
          >
            Get in touch
          </a>
        </div>
      </section>

      {/* What I do */}
      <section className="border-t border-border-subtle py-20">
        <h2 className="mb-12 font-mono text-xs tracking-widest text-text-faint uppercase">
          What I bring
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group">
            <div className="mb-3 font-mono text-2xl text-accent">01</div>
            <h3 className="mb-2 text-lg font-medium">Build Products</h3>
            <p className="text-base leading-relaxed text-text-muted">
              NextJS, React, TypeScript, C#, Ruby on Rails. I build full-stack
              applications from scratch — currently a bespoke CRM handling
              real events and real members.
            </p>
          </div>
          <div className="group">
            <div className="mb-3 font-mono text-2xl text-accent">02</div>
            <h3 className="mb-2 text-lg font-medium">Support & Debug</h3>
            <p className="text-base leading-relaxed text-text-muted">
              Deep experience in technical support engineering at InfluxData,
              Demandbase, and ScreenCloud. Distributed systems, databases,
              cloud infrastructure — I trace issues through the full stack.
            </p>
          </div>
          <div className="group">
            <div className="mb-3 font-mono text-2xl text-accent">03</div>
            <h3 className="mb-2 text-lg font-medium">Bridge the Gap</h3>
            <p className="text-base leading-relaxed text-text-muted">
              The rarest skill in tech: understanding both how products are
              built and how customers use them. I turn customer pain into
              product improvements.
            </p>
          </div>
        </div>
      </section>

      {/* Current focus */}
      <section className="border-t border-border-subtle py-20">
        <h2 className="mb-12 font-mono text-xs tracking-widest text-text-faint uppercase">
          Current focus
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border-subtle bg-bg-surface p-6">
            <div className="mb-2 font-mono text-xs text-live">● Active</div>
            <h3 className="mb-2 text-lg font-medium">Ceroc CRM</h3>
            <p className="text-base leading-relaxed text-text-muted">
              Bespoke event and member management system. NextJS, C#,
              Azure, SQL Server. Claude API integration for intelligent
              data workflows.
            </p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-bg-surface p-6">
            <div className="mb-2 font-mono text-xs text-wip">● Building</div>
            <h3 className="mb-2 text-lg font-medium">This Site</h3>
            <p className="text-base leading-relaxed text-text-muted">
              A living portfolio of technical experiments and spikes.
              Each one is a real thing I built to learn, not a tutorial
              I followed.
            </p>
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="border-t border-border-subtle py-20">
        <h2 className="mb-12 font-mono text-xs tracking-widest text-text-faint uppercase">
          Tech I work with
        </h2>
        <div className="flex flex-wrap gap-2">
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
              className="rounded-full border border-border-subtle px-3 py-1 font-mono text-xs text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
