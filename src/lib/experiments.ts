export type ExperimentStatus = "live" | "wip" | "planned";

export interface Experiment {
  slug: string;
  title: string;
  description: string;
  status: ExperimentStatus;
  tags: string[];
  date: string; // ISO date string
  externalUrl?: string; // For things like Expo that live elsewhere
}

// Add new experiments here — they'll appear on the experiments index automatically.
// Create matching route at src/app/experiments/[slug]/page.tsx for the demo.
export const experiments: Experiment[] = [
  {
    slug: "global-orientation-ritual",
    title: "Global Orientation Ritual",
    description:
      "A personal intelligence desk for sorting tactical noise from slower strategic and structural change.",
    status: "live",
    tags: ["Next.js", "React", "Prisma", "Signals", "Dashboard"],
    date: "2026-03-14",
  },
  {
    slug: "stack-demo-app",
    title: "Stack Demo App",
    description:
      "A local-only architecture spike: a simple ticket board using App Router, Server Actions, and SQLite persistence.",
    status: "live",
    tags: ["Next.js", "SQLite", "Server Actions", "Zod"],
    date: "2026-03-15",
  },
  {
    slug: "streamlit-datafusion-explorer",
    title: "Streamlit DataFusion Explorer",
    description:
      "A local SQL workbench for uploaded CSV, JSON, and Parquet files using Streamlit, DataFusion, PyArrow, and pandas.",
    status: "live",
    tags: ["Python", "Streamlit", "DataFusion", "PyArrow"],
    date: "2026-03-18",
  },
  {
    slug: "transition-unit-mockup",
    title: "Transition Unit MVP",
    description:
      "A structured career transition platform for veterans entering tech — mission tracks, cohort accountability, and mentor-linked progression instead of Discord chaos.",
    status: "live",
    tags: ["React", "Framer Motion", "Product Design", "UX"],
    date: "2026-03-18",
  },
  {
    slug: "react-email",
    title: "React Email Templates",
    description:
      "Transactional email templates built with react.email — type-safe, testable email components that render to HTML.",
    status: "planned",
    tags: ["React", "Email", "Resend"],
    date: "2026-02-27",
  },
  {
    slug: "betterstack-logging",
    title: "BetterStack Observability",
    description:
      "Structured logging and uptime monitoring integration. Demonstrating production-grade observability patterns.",
    status: "planned",
    tags: ["Observability", "Logging", "BetterStack"],
    date: "2026-02-27",
  },
  {
    slug: "playwright-recording",
    title: "Playwright E2E Recording",
    description:
      "Automated browser testing and visual regression recording of the Ceroc CRM system.",
    status: "planned",
    tags: ["Testing", "Playwright", "Automation"],
    date: "2026-02-27",
  },
  {
    slug: "expo-mobile",
    title: "Expo Mobile Experiments",
    description:
      "React Native experiments with Expo — cross-platform mobile prototyping.",
    status: "planned",
    tags: ["React Native", "Expo", "Mobile"],
    date: "2026-02-27",
    externalUrl: "https://expo.fliz.co.uk",
  },
  {
    slug: "resend-integration",
    title: "Resend Transactional Email",
    description:
      "Email delivery integration using Resend API with Next.js serverless functions.",
    status: "planned",
    tags: ["Email", "API", "Resend"],
    date: "2026-02-27",
  },
];

export function getExperiment(slug: string): Experiment | undefined {
  return experiments.find((e) => e.slug === slug);
}

export function getExperimentsByStatus(
  status: ExperimentStatus
): Experiment[] {
  return experiments.filter((e) => e.status === status);
}
