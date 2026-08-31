import Image from "next/image";
import Link from "next/link";
import { experiments, type ExperimentStatus } from "@/lib/experiments";

const statusConfig: Record<
  ExperimentStatus,
  { label: string; color: string; dot: string }
> = {
  live: { label: "Live", color: "text-accent", dot: "bg-accent" },
  wip: { label: "In Progress", color: "text-highlight", dot: "bg-highlight" },
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
    <div className="mx-auto max-w-[72rem] px-6 md:px-10">
      <section className="py-24 md:py-32">
        <p className="kicker mb-4">Experiments</p>
        <h1 className="heading-xl mb-6 max-w-[16ch]">
          Things I&apos;m building.
        </h1>
        <p className="mb-20 max-w-[55ch] text-lg text-text-muted md:text-xl">
          Real spikes and experiments — not tutorials. Each one solves a real
          problem or explores a technology I want production experience with.
        </p>

        <div className="grid gap-5">
          {sorted.map((experiment) => {
            const status = statusConfig[experiment.status];
            const isClickable =
              experiment.status === "live" || experiment.status === "wip" || experiment.externalUrl;

            const content = (
              <div
                className={`group rounded-2xl border border-border-subtle bg-bg-surface p-8 transition-all ${
                  isClickable
                    ? "hover:border-accent/30 hover:shadow-[0_0_0_1px_rgba(37,99,235,0.1)] cursor-pointer"
                    : ""
                }`}
              >
                <div className="mb-4 flex items-center gap-4">
                  <span
                    className={`inline-flex items-center gap-2 font-mono text-xs font-medium ${status.color}`}
                  >
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${status.dot}`}
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
                <h2 className="heading-md mb-3">{experiment.title}</h2>
                <p className="mb-5 max-w-[60ch] text-base leading-relaxed text-text-muted">
                  {experiment.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {experiment.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border-subtle bg-bg px-3 py-1 font-mono text-xs text-text-faint"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {experiment.image && (
                  <div className="mt-6 overflow-hidden rounded-xl border border-border-subtle">
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
      </section>
    </div>
  );
}
