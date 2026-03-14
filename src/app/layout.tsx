import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fliz Portfolio — Global Orientation Ritual Demo",
  description:
    "A portfolio site centred on the Global Orientation Ritual demo app, alongside technical experiments and product spikes.",
  openGraph: {
    title: "Fliz Portfolio — Global Orientation Ritual Demo",
    description:
      "A portfolio site centred on the Global Orientation Ritual demo app, alongside technical experiments and product spikes.",
    url: "https://fliz.co.uk",
    siteName: "fliz.co.uk",
    type: "website",
  },
};

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm tracking-wide text-text-muted transition-colors hover:text-accent"
        >
          fliz.co.uk
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/experiments"
            className="text-sm text-text-muted transition-colors hover:text-text"
          >
            Experiments
          </Link>
          <a
            href="https://linkedin.com/in/jamesgreasley"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-text"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/jaygreasley"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-text"
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
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
        <p className="font-mono text-xs text-text-faint">
          © {new Date().getFullYear()} Jay Greasley
        </p>
        <p className="font-mono text-xs text-text-faint">
          Built with Next.js · Hosted on Vercel
        </p>
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
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=JetBrains+Mono:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <Nav />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
