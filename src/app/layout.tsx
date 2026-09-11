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
    <nav className="nav-bar">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          Jay Greasley
        </Link>
        <div className="nav-links">
          <Link href="/experiments" className="nav-link">
            Experiments
          </Link>
          <a
            href="https://linkedin.com/in/jamesgreasley"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/JayFliz"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
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
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-name">Jay Greasley</p>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
        <div className="footer-links">
          <a href="mailto:jay@fliz.co.uk" className="footer-link">
            Email
          </a>
          <a
            href="https://linkedin.com/in/jamesgreasley"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/JayFliz"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
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
        <div className="page-wrap">
          <Nav />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
