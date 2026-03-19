export default function TUPitchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.css" />
      <script src="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.js" async></script>
      <style>{`
        html, body {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .reveal {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--color-bg);
          color: var(--color-text);
          font-family: var(--font-body);
        }
        .reveal h1, .reveal h2, .reveal h3 {
          color: var(--color-text);
          font-family: var(--font-display);
        }
        .reveal .slides {
          text-align: center;
        }
        .reveal .progress {
          background: rgba(14, 92, 82, 0.2);
        }
        .reveal .progress span {
          background: var(--color-accent);
        }
        .reveal .controls {
          color: var(--color-accent);
        }
      `}</style>
      {children}
    </>
  );
}
