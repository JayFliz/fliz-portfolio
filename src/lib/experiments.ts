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
