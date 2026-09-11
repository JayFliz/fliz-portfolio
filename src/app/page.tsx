import Link from "next/link";
import { experiments } from "@/lib/experiments";

export default function Home() {
  const liveCount = experiments.filter((e) => e.status === "live").length;
  const totalCount = experiments.length;

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <h1 className="hero-title">
          I build things, then I help people <em>use them.</em>
        </h1>
        <p className="hero-sub">
          Technical support engineer and full-stack developer with 15+ years
          across startups, government, legal, and enterprise.
        </p>
        <div className="hero-actions">
          <Link href="/experiments" className="btn-primary">
            View experiments
            <span className="btn-count">
              {liveCount}/{totalCount}
            </span>
          </Link>
          <a href="mailto:jay@fliz.co.uk" className="btn-secondary">
            Get in touch
          </a>
        </div>
      </section>

      <div className="ornament">&#9670;</div>

      {/* What I bring */}
      <section className="section-content">
        <p className="kicker">What I bring</p>
        <h2 className="section-heading">
          The rare overlap of{" "}
          <span className="text-accent">building</span> and{" "}
          <span className="text-accent">supporting.</span>
        </h2>
        <div className="pillars-grid">
          <div>
            <span className="pillar-num">01</span>
            <h3 className="pillar-title">Build Products</h3>
            <p className="pillar-desc">
              NextJS, React, TypeScript, C#, Ruby on Rails. I build full-stack
              applications from scratch — currently a bespoke CRM handling real
              events and real members.
            </p>
          </div>
          <div>
            <span className="pillar-num">02</span>
            <h3 className="pillar-title">Support &amp; Debug</h3>
            <p className="pillar-desc">
              Deep experience in technical support engineering at InfluxData,
              Demandbase, and ScreenCloud. Distributed systems, databases, cloud
              infrastructure — I trace issues through the full stack.
            </p>
          </div>
          <div>
            <span className="pillar-num">03</span>
            <h3 className="pillar-title">Bridge the Gap</h3>
            <p className="pillar-desc">
              The rarest skill in tech: understanding both how products are
              built and how customers use them. I turn customer pain into product
              improvements.
            </p>
          </div>
        </div>
      </section>

      <div className="ornament">&#9670;</div>

      {/* Current focus */}
      <section className="dark-band">
        <div className="section-content">
          <p className="kicker">Current focus</p>
          <h2 className="section-heading section-heading-light">
            What I&apos;m working on.
          </h2>
          <div className="focus-grid">
            <div className="focus-card">
              <div className="focus-badge">
                <span className="focus-dot" />
                Active
              </div>
              <h3 className="focus-title">Ceroc CRM</h3>
              <p className="focus-desc">
                Bespoke event and member management system. NextJS, C#, Azure,
                SQL Server. Claude API integration for intelligent data
                workflows.
              </p>
            </div>
            <div className="focus-card">
              <div className="focus-badge">
                <span className="focus-dot" />
                Demo
              </div>
              <h3 className="focus-title">Global Orientation Ritual</h3>
              <p className="focus-desc">
                A live experiment for capturing signals, reviewing patterns, and
                turning scattered updates into a weekly orientation ritual.
              </p>
              <Link
                href="/experiments/global-orientation-ritual"
                className="focus-link"
              >
                View experiment &#8599;
              </Link>
            </div>
            <div className="focus-card">
              <div className="focus-badge">
                <span className="focus-dot" />
                Demo
              </div>
              <h3 className="focus-title">Franchisee Helpdesk</h3>
              <p className="focus-desc">
                A multi-role helpdesk POC for franchise networks — ticket
                management, role-based dashboards, email notifications, and EC2
                deployment.
              </p>
              <Link
                href="/experiments/franchisee-helpdesk"
                className="focus-link"
              >
                View experiment &#8599;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="ornament">&#9670;</div>

      {/* Tech */}
      <section className="section-content">
        <p className="kicker">Tech I work with</p>
        <h2 className="section-heading">
          Full-stack, from{" "}
          <span className="text-accent">infrastructure</span> to{" "}
          <span className="text-accent">interface.</span>
        </h2>
        <div className="tech-grid">
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
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
