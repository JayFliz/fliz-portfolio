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

      {/* Demo area - replace this with actual experiment content */}
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

      {/* Writeup area */}
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
    </div>
  );
}
