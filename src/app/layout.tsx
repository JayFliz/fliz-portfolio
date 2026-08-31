import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jay Greasley — Technical Engineer & Builder",
  description:
    "Experiments, spikes, and real production work from a technical support engineer and full-stack developer.",
  openGraph: {
    title: "Jay Greasley — Technical Engineer & Builder",
    description:
      "Experiments, spikes, and real production work from a technical support engineer and full-stack developer.",
    url: "https://fliz.co.uk",
    siteName: "fliz.co.uk",
    type: "website",
  },
};

function Nav() {
  return (
    <nav className="border-b border-border-subtle">
      <div className="mx-auto flex max-w-[72rem] items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-text transition-colors hover:text-accent"
        >
          Jay Greasley
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/experiments"
            className="text-[0.95rem] text-text-muted transition-colors hover:text-accent"
          >
            Experiments
          </Link>
          <a
            href="https://linkedin.com/in/jamesgreasley"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.95rem] text-text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/JayFliz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.95rem] text-text-muted transition-colors hover:text-accent"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto flex max-w-[72rem] flex-col items-center gap-4 px-6 py-12 text-center md:flex-row md:justify-between md:px-10 md:text-left">
        <p className="text-sm text-text-faint">
          &copy; {new Date().getFullYear()} Jay Greasley
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:jay@fliz.co.uk"
            className="text-sm text-text-faint transition-colors hover:text-accent"
          >
            jay@fliz.co.uk
          </a>
          <span className="text-text-faint">*</span>
          <a
            href="https://linkedin.com/in/jamesgreasley"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-faint transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <span className="text-text-faint">*</span>
          <a
            href="https://github.com/JayFliz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-faint transition-colors hover:text-accent"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
