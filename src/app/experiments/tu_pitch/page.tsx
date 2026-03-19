"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Reveal: any;
  }
}

export default function TransitionUnitPitch() {
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initReveal = () => {
      if (window.Reveal && deckRef.current) {
        console.log("Initializing Reveal.js...");
        const deck = new window.Reveal(deckRef.current, {
          hash: true,
          controls: true,
          progress: true,
          center: true,
          transition: "slide",
          width: 1200,
          height: 700,
          margin: 0.1,
        });
        deck.initialize().then(() => {
          console.log("Reveal.js initialized successfully");
        }).catch((err: any) => {
          console.error("Failed to initialize Reveal.js:", err);
        });
      } else {
        setTimeout(initReveal, 100);
      }
    };

    initReveal();
  }, []);

  return (
    <div className="reveal" ref={deckRef}>
      <div className="slides">
        {/* Slide 1: Title */}
        <section>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3em", marginBottom: "0.3em" }}>
            Transition Unit
          </h1>
          <p style={{ fontSize: "1.2em", color: "var(--color-text-muted)" }}>
            A structured pathway from military service to civilian careers
          </p>
        </section>

        {/* Slide 2: The Problem */}
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "0.8em" }}>The Problem</h2>
          <ul style={{ fontSize: "0.9em", lineHeight: 1.8, textAlign: "left", maxWidth: "700px", margin: "0 auto" }}>
            <li>Too many options</li>
            <li>No clear starting point</li>
            <li>Unstructured communities</li>
            <li>Limited mentor capacity</li>
          </ul>
        </section>

        {/* Slide 3: Current State */}
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "0.8em" }}>Current State</h2>
          <ul style={{ fontSize: "0.9em", lineHeight: 1.8, textAlign: "left", maxWidth: "700px", margin: "0 auto" }}>
            <li>Endless chat</li>
            <li>Repeated questions</li>
            <li>Advice disappears</li>
            <li>No progression</li>
          </ul>
        </section>

        {/* Slide 4: Insight */}
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "0.8em" }}>Insight</h2>
          <p style={{ fontSize: "1.1em", lineHeight: 1.7, maxWidth: "800px", margin: "0 auto" }}>
            Not lack of resources<br />
            Lack of structure
          </p>
          <p style={{ fontSize: "1em", color: "var(--color-accent)", marginTop: "1.5em", fontWeight: 500 }}>
            Think training pipeline, not social platform
          </p>
        </section>

        {/* Slide 5: Solution */}
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "0.8em" }}>Solution</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2em", maxWidth: "900px", margin: "0 auto" }}>
            <div style={{
              background: "var(--color-bg-surface)",
              padding: "1.5em",
              borderRadius: "12px",
              border: "1px solid var(--color-border-subtle)"
            }}>
              <h3 style={{ fontSize: "1.1em", marginBottom: "0.5em" }}>Guided pathways</h3>
            </div>
            <div style={{
              background: "var(--color-bg-surface)",
              padding: "1.5em",
              borderRadius: "12px",
              border: "1px solid var(--color-border-subtle)"
            }}>
              <h3 style={{ fontSize: "1.1em", marginBottom: "0.5em" }}>Partner-led training</h3>
            </div>
            <div style={{
              background: "var(--color-bg-surface)",
              padding: "1.5em",
              borderRadius: "12px",
              border: "1px solid var(--color-border-subtle)"
            }}>
              <h3 style={{ fontSize: "1.1em", marginBottom: "0.5em" }}>Cohorts</h3>
            </div>
            <div style={{
              background: "var(--color-bg-surface)",
              padding: "1.5em",
              borderRadius: "12px",
              border: "1px solid var(--color-border-subtle)"
            }}>
              <h3 style={{ fontSize: "1.1em", marginBottom: "0.5em" }}>Task-based progression</h3>
            </div>
          </div>
        </section>

        {/* Slide 6: How It Works */}
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "0.8em" }}>How It Works</h2>
          <ol style={{ fontSize: "0.9em", lineHeight: 2, textAlign: "left", maxWidth: "700px", margin: "0 auto" }}>
            <li>Choose path</li>
            <li>Follow structured track</li>
            <li>Complete tasks</li>
            <li>Get mentor input</li>
          </ol>
        </section>

        {/* Slide 7: Training Partners */}
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "0.8em" }}>Training Partners</h2>
          <ul style={{ fontSize: "0.9em", lineHeight: 1.8, textAlign: "left", maxWidth: "700px", margin: "0 auto" }}>
            <li>We orchestrate training</li>
            <li>Embed into pathways</li>
            <li>Focus on application</li>
          </ul>
        </section>

        {/* Slide 8: Mentor Model */}
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "0.8em" }}>Mentor Model</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2em", maxWidth: "900px", margin: "0 auto" }}>
            <div style={{
              background: "var(--color-bg-surface)",
              padding: "1.5em",
              borderRadius: "12px",
              border: "1px solid var(--color-border-subtle)"
            }}>
              <h3 style={{ fontSize: "1.1em", marginBottom: "0.5em" }}>Group Q&A</h3>
            </div>
            <div style={{
              background: "var(--color-bg-surface)",
              padding: "1.5em",
              borderRadius: "12px",
              border: "1px solid var(--color-border-subtle)"
            }}>
              <h3 style={{ fontSize: "1.1em", marginBottom: "0.5em" }}>Milestone reviews</h3>
            </div>
            <div style={{
              background: "var(--color-bg-surface)",
              padding: "1.5em",
              borderRadius: "12px",
              border: "1px solid var(--color-border-subtle)"
            }}>
              <h3 style={{ fontSize: "1.1em", marginBottom: "0.5em" }}>Peer support</h3>
            </div>
            <div style={{
              background: "var(--color-bg-surface)",
              padding: "1.5em",
              borderRadius: "12px",
              border: "1px solid var(--color-border-subtle)"
            }}>
              <h3 style={{ fontSize: "1.1em", marginBottom: "0.5em" }}>Pre-built guidance</h3>
            </div>
          </div>
        </section>

        {/* Slide 9: Why It Works */}
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "0.8em" }}>Why It Works</h2>
          <ul style={{ fontSize: "0.9em", lineHeight: 1.8, textAlign: "left", maxWidth: "700px", margin: "0 auto" }}>
            <li>Structure</li>
            <li>Clear objectives</li>
            <li>Small units</li>
            <li>Mission focus</li>
          </ul>
        </section>

        {/* Slide 10: Outcomes */}
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", marginBottom: "0.8em" }}>Outcomes</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2em", maxWidth: "900px", margin: "0 auto" }}>
            {["Faster decisions", "Higher completion", "Better job readiness", "Less mentor load"].map((outcome) => (
              <div
                key={outcome}
                style={{
                  background: "var(--color-bg-surface)",
                  padding: "1.5em",
                  borderRadius: "12px",
                  border: "1px solid var(--color-border-subtle)",
                  fontSize: "1.1em"
                }}
              >
                {outcome}
              </div>
            ))}
          </div>
        </section>

        {/* Slide 11: Vision */}
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5em", marginBottom: "0.5em" }}>
            Vision
          </h2>
          <p style={{ fontSize: "1.2em", lineHeight: 1.7, maxWidth: "800px", margin: "0 auto" }}>
            Front door for veteran transition
          </p>
          <p style={{ fontSize: "1em", color: "var(--color-accent)", marginTop: "1em", fontWeight: 500 }}>
            System, not community
          </p>
        </section>
      </div>
    </div>
  );
}
