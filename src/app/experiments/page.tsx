import Image from "next/image";
import Link from "next/link";
import { experiments, type ExperimentStatus } from "@/lib/experiments";

const statusConfig: Record<
  ExperimentStatus,
  { label: string; color: string; dot: string }
> = {
  live: { label: "Live", color: "text-accent", dot: "bg-accent" },
  wip: { label: "In Progress", color: "text-wip", dot: "bg-wip" },
  planned: { label: "Planned", color: "text-text-faint", dot: "bg-text-faint" },
};

export const metadata = {
  title: "Experiments — Jay Greasley",
  description: "Technical experiments, spikes, and proof-of-concepts.",
};

export default function ExperimentsPage() {
  const statusOrder: ExperimentStatus[] = ["live", "wip", "planned"];
  const sorted = [...experiments].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  );

  return (
    <div className="section-content">
      <p className="kicker">Experiments</p>
      <h1 className="heading-xl" style={{ marginTop: "0.5rem" }}>
        Things I&apos;m building.
      </h1>
      <p
        className="experiment-desc"
        style={{ marginTop: "1rem", marginBottom: "2.5rem" }}
      >
        Real spikes and experiments — not tutorials. Each one solves a real
        problem or explores a technology I want production experience with.
      </p>

      <div className="grid gap-4">
        {sorted.map((experiment) => {
          const status = statusConfig[experiment.status];
          const isClickable =
            experiment.status === "live" ||
            experiment.status === "wip" ||
            experiment.externalUrl;

          const content = (
            <div
              className={`experiment-card${isClickable ? " clickable" : ""}`}
            >
              <div className="experiment-meta">
                <span className={`experiment-status ${status.color}`}>
                  <span className={`experiment-dot ${status.dot}`} />
                  {status.label}
                </span>
                <span className="experiment-date">
                  {new Date(experiment.date).toLocaleDateString("en-GB", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h2 className="experiment-title">{experiment.title}</h2>
              <p className="experiment-desc">{experiment.description}</p>
              <div className="experiment-tags">
                {experiment.tags.map((tag) => (
                  <span key={tag} className="experiment-tag">
                    {tag}
                  </span>
                ))}
              </div>
              {experiment.image && (
                <div className="experiment-image">
                  <Image
                    src={experiment.image}
                    alt={`${experiment.title} screenshot`}
                    width={1440}
                    height={900}
                    className="h-auto w-full"
                  />
                </div>
              )}
            </div>
          );

          if (experiment.externalUrl) {
            return (
              <a
                key={experiment.slug}
                href={experiment.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            );
          }

          if (experiment.status === "live" || experiment.status === "wip") {
            return (
              <Link
                key={experiment.slug}
                href={`/experiments/${experiment.slug}`}
              >
                {content}
              </Link>
            );
          }

          return <div key={experiment.slug}>{content}</div>;
        })}
      </div>
    </div>
  );
}
