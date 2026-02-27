import Link from "next/link";
import { experiments, type ExperimentStatus } from "@/lib/experiments";

const statusConfig: Record<
  ExperimentStatus,
  { label: string; color: string; dot: string }
> = {
  live: { label: "Live", color: "text-live", dot: "bg-live" },
  wip: { label: "In Progress", color: "text-wip", dot: "bg-wip" },
  planned: { label: "Planned", color: "text-planned", dot: "bg-planned" },
};

export const metadata = {
  title: "Experiments — Jay Greasley",
  description: "Technical experiments, spikes, and proof-of-concepts.",
};

export default function ExperimentsPage() {
  // Sort: live first, then wip, then planned
  const statusOrder: ExperimentStatus[] = ["live", "wip", "planned"];
  const sorted = [...experiments].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="mb-4 font-mono text-sm tracking-widest text-accent uppercase">
        Experiments
      </p>
      <h1
        className="mb-4 text-4xl tracking-tight md:text-5xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Things I&apos;m building
      </h1>
      <p className="mb-16 max-w-lg text-lg text-text-muted">
        Real spikes and experiments — not tutorials. Each one solves a real
        problem or explores a technology I want production experience with.
      </p>

      <div className="grid gap-4">
        {sorted.map((experiment) => {
          const status = statusConfig[experiment.status];
          const isClickable =
            experiment.status === "live" || experiment.externalUrl;

          const content = (
            <div
              className={`group rounded-lg border border-border-subtle bg-bg-surface p-6 transition-all ${
                isClickable
                  ? "hover:border-border hover:bg-bg-elevated cursor-pointer"
                  : ""
              }`}
            >
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 font-mono text-xs ${status.color}`}
                >
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`}
                  />
                  {status.label}
                </span>
                <span className="font-mono text-xs text-text-faint">
                  {new Date(experiment.date).toLocaleDateString("en-GB", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h2 className="mb-2 text-xl font-medium">{experiment.title}</h2>
              <p className="mb-4 text-sm leading-relaxed text-text-muted">
                {experiment.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {experiment.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-subtle px-2.5 py-0.5 font-mono text-[11px] text-text-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>
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

          if (experiment.status === "live") {
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
