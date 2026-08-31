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
    <nav className="border-b border-border">
      <div className="mx-auto flex max-w-[80rem] items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="font-display text-2xl font-black tracking-tight text-text transition-colors hover:text-text-muted md:text-3xl"
        >
          Jay Greasley
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/experiments"
            className="text-sm font-semibold uppercase tracking-widest text-text transition-colors hover:text-accent-hover"
          >
            Experiments
          </Link>
          <a
            href="https://linkedin.com/in/jamesgreasley"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold uppercase tracking-widest text-text transition-colors hover:text-accent-hover"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/JayFliz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold uppercase tracking-widest text-text transition-colors hover:text-accent-hover"
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
    <footer className="border-t border-border bg-bg-dark text-text-inverse">
      <div className="mx-auto flex max-w-[80rem] flex-col items-center gap-6 px-6 py-16 text-center md:flex-row md:justify-between md:px-10 md:text-left">
        <div>
          <p className="font-display text-xl font-black">Jay Greasley</p>
          <p className="mt-1 text-sm text-text-inverse/60">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex items-center gap-8">
          <a
            href="mailto:jay@fliz.co.uk"
            className="text-sm font-medium uppercase tracking-widest text-text-inverse/60 transition-colors hover:text-accent"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/jamesgreasley"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium uppercase tracking-widest text-text-inverse/60 transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/JayFliz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium uppercase tracking-widest text-text-inverse/60 transition-colors hover:text-accent"
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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=IBM+Plex+Mono:wght@300;400;500&display=swap"
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
