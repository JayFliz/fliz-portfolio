export type ExperimentStatus = "live" | "wip" | "planned";

export interface Experiment {
  slug: string;
  title: string;
  description: string;
  status: ExperimentStatus;
  tags: string[];
  date: string; // ISO date string
  externalUrl?: string; // For things like Expo that live elsewhere
  vimeoId?: string;
  image?: string;
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
    slug: "warrior-programme-handbook",
    title: "Warrior Programme Handbook",
    description:
      "Post-course online support handbook for the Warrior Programme.",
    status: "live",
    tags: ["HTML", "Veteran Support"],
    date: "2026-06-11",
    externalUrl: "/experiments/warrior-programme/handbook.html",
  },
  {
    slug: "warrior-programme-vimeo-links",
    title: "Warrior Programme Vimeo Links",
    description:
      "Workshop video links for the Warrior Programme.",
    status: "live",
    tags: ["HTML", "Veteran Support", "Video"],
    date: "2026-06-11",
    externalUrl: "/experiments/warrior-programme/vimeo-links.html",
  },
  {
    slug: "biz-workflow",
    title: "Business Workflow Mapper",
    description:
      "A sketchpad for mapping business processes — define steps with SLOs, decisions with branching, and generate process documentation from a shared activity catalogue.",
    status: "live",
    tags: ["React", "TypeScript", "Process Design", "Vercel"],
    date: "2026-09-04",
    externalUrl: "https://biz-workflow.vercel.app/",
    image: "/experiments/biz-workflow.png",
  },
  {
    slug: "dataflow-engine",
    title: "Dataflow Engine",
    description:
      "A lightweight data integration engine with YAML-defined pipelines, visual flow monitoring, and reconciliation checks — built as an n8n-adjacent demo.",
    status: "live",
    tags: ["TypeScript", "Node.js", "SQLite", "YAML", "Data Pipelines"],
    date: "2026-08-31",
    image: "/experiments/dataflow-ui.png",
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
    slug: "franchisee-helpdesk",
    title: "Franchisee Helpdesk",
    description:
      "A multi-role helpdesk POC for franchise networks — ticket management, role-based dashboards, email notifications, and EC2 deployment with OpenTofu.",
    status: "live",
    tags: ["Next.js", "Express", "SQLite", "AWS EC2", "OpenTofu", "Resend", "Zod"],
    date: "2026-08-22",
    image: "/experiments/helpdesk-dashboard.png",
  },
  {
    slug: "resend-integration",
    title: "Resend Email Marketing - Irritable",
    description:
      "Email marketing POC using Resend API and SDK with Next.js .",
    status: "wip",
    tags: ["Email", "API", "Resend"],
    date: "2026-02-27",
    vimeoId: "1213292682",
    image: "/experiments/resend-integration.png",
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
