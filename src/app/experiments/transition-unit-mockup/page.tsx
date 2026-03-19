"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Inline design system ────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0d0f14;
    --surface:   #151820;
    --surface2:  #1c2030;
    --border:    rgba(255,255,255,0.07);
    --border2:   rgba(255,255,255,0.13);
    --text:      #e8eaf0;
    --muted:     #7a8099;
    --accent:    #4f7cff;
    --accent2:   #29e0a9;
    --danger:    #ff6b6b;
    --warn:      #f5a623;
    --radius:    16px;
    --radius-sm: 10px;
    --font-head: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

  .app { display: flex; height: 100vh; overflow: hidden; }

  /* ── Sidebar ── */
  .sidebar {
    width: 260px; flex-shrink: 0;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    overflow: hidden;
  }
  .sidebar-brand {
    padding: 22px 20px 18px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 12px;
  }
  .brand-icon {
    width: 40px; height: 40px; border-radius: 12px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .brand-label { font-family: var(--font-head); font-size: 14px; font-weight: 700; letter-spacing: 0.02em; }
  .brand-sub { font-size: 11px; color: var(--muted); margin-top: 1px; }

  .sidebar-nav { padding: 14px 12px; flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .nav-btn {
    width: 100%; background: none; border: none; cursor: pointer;
    display: flex; align-items: center; gap: 11px;
    padding: 11px 14px; border-radius: var(--radius-sm);
    color: var(--muted); font-family: var(--font-body); font-size: 13.5px; font-weight: 500;
    transition: background 0.15s, color 0.15s;
    text-align: left;
  }
  .nav-btn:hover { background: var(--surface2); color: var(--text); }
  .nav-btn.active { background: var(--accent); color: #fff; }
  .nav-btn .nav-icon { font-size: 16px; opacity: 0.9; }

  .sidebar-footer {
    padding: 14px 12px 20px;
    border-top: 1px solid var(--border);
  }
  .sidebar-cta {
    background: var(--surface2); border: 1px solid var(--border2);
    border-radius: var(--radius); padding: 14px;
  }
  .sidebar-cta .cta-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 6px; }
  .sidebar-cta .cta-title { font-family: var(--font-head); font-size: 13px; font-weight: 600; margin-bottom: 10px; }
  .cta-pills { display: flex; flex-direction: column; gap: 5px; }
  .cta-pill {
    font-size: 11.5px; color: var(--accent2);
    display: flex; align-items: center; gap: 6px;
  }

  /* ── Main ── */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  .topbar {
    border-bottom: 1px solid var(--border);
    padding: 18px 28px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    background: var(--surface);
    flex-shrink: 0;
  }
  .topbar-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--muted); }
  .topbar-title { font-family: var(--font-head); font-size: 22px; font-weight: 700; margin-top: 2px; }
  .topbar-actions { display: flex; align-items: center; gap: 10px; }

  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 16px; border-radius: var(--radius-sm);
    font-family: var(--font-body); font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.15s; border: none;
  }
  .btn-ghost {
    background: var(--surface2); color: var(--text);
    border: 1px solid var(--border2);
  }
  .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: #3d6de8; }
  .btn-sm { padding: 6px 12px; font-size: 12px; }

  .search-wrap { position: relative; }
  .search-wrap input {
    background: var(--surface2); border: 1px solid var(--border);
    color: var(--text); border-radius: var(--radius-sm);
    padding: 9px 14px 9px 36px; font-family: var(--font-body); font-size: 13px;
    width: 240px; outline: none; transition: border 0.15s;
  }
  .search-wrap input:focus { border-color: var(--accent); }
  .search-wrap input::placeholder { color: var(--muted); }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 14px; }

  .content { flex: 1; overflow-y: auto; padding: 28px; }

  /* ── Cards ── */
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 22px;
  }
  .card-dark {
    background: linear-gradient(135deg, #1a2540 0%, #0d1626 100%);
    border-color: var(--border2);
  }
  .card-title { font-family: var(--font-head); font-size: 16px; font-weight: 700; margin-bottom: 4px; }
  .card-desc { font-size: 12.5px; color: var(--muted); margin-bottom: 18px; }

  /* ── Grid helpers ── */
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .gap-16 { gap: 16px; }
  .space-y { display: flex; flex-direction: column; gap: 14px; }

  /* ── Metric card ── */
  .metric-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
  .metric-header { display: flex; align-items: flex-start; justify-content: space-between; }
  .metric-label { font-size: 12px; color: var(--muted); margin-bottom: 6px; }
  .metric-value { font-family: var(--font-head); font-size: 26px; font-weight: 700; }
  .metric-detail { font-size: 12px; color: var(--muted); margin-top: 4px; }
  .metric-icon { width: 40px; height: 40px; border-radius: var(--radius-sm); background: var(--surface2); display: flex; align-items: center; justify-content: center; font-size: 18px; }

  /* ── Progress bar ── */
  .progress-wrap { background: var(--surface2); border-radius: 99px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--accent), var(--accent2)); transition: width 0.6s ease; }

  /* ── Badges ── */
  .badge {
    display: inline-flex; align-items: center;
    padding: 3px 9px; border-radius: 99px;
    font-size: 11px; font-weight: 500;
  }
  .badge-default { background: var(--surface2); color: var(--muted); border: 1px solid var(--border); }
  .badge-accent  { background: rgba(79,124,255,0.15); color: var(--accent); }
  .badge-green   { background: rgba(41,224,169,0.12); color: var(--accent2); }
  .badge-warn    { background: rgba(245,166,35,0.15); color: var(--warn); }
  .badge-danger  { background: rgba(255,107,107,0.15); color: var(--danger); }

  /* ── Step row ── */
  .step-row { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; }
  .step-row.active { border-color: var(--accent); }
  .step-check { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
  .step-title { font-family: var(--font-head); font-size: 15px; font-weight: 600; margin-bottom: 6px; }
  .step-tasks { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
  .step-task { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 5px 10px; font-size: 12px; color: var(--muted); }
  .step-task.done { color: var(--accent2); border-color: rgba(41,224,169,0.2); }

  /* ── Avatar ── */
  .avatar { width: 40px; height: 40px; border-radius: 99px; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; font-family: var(--font-head); font-size: 13px; font-weight: 700; flex-shrink: 0; }

  /* ── Tabs ── */
  .tabs-list { display: flex; background: var(--surface2); border-radius: var(--radius-sm); padding: 4px; gap: 4px; margin-bottom: 20px; border: 1px solid var(--border); width: fit-content; }
  .tab-trigger {
    padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500;
    cursor: pointer; border: none; background: none; color: var(--muted);
    font-family: var(--font-body); transition: all 0.15s;
  }
  .tab-trigger.active { background: var(--accent); color: #fff; }

  /* ── Discussion post ── */
  .disc-post { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; cursor: pointer; transition: border 0.15s; }
  .disc-post:hover { border-color: var(--accent); }
  .disc-title { font-size: 14px; font-weight: 500; margin-bottom: 6px; }
  .disc-meta { font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 10px; }

  /* ── Mentor post ── */
  .mentor-post { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; }
  .mentor-name { font-size: 12px; color: var(--accent); margin-bottom: 6px; font-weight: 500; }
  .mentor-title { font-family: var(--font-head); font-size: 15px; font-weight: 600; margin-bottom: 8px; }
  .mentor-summary { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* ── Upcoming event ── */
  .event-row { display: flex; align-items: flex-start; gap: 12px; }
  .event-icon { width: 38px; height: 38px; border-radius: var(--radius-sm); background: var(--surface2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
  .event-title { font-size: 13.5px; font-weight: 500; }
  .event-time { font-size: 12px; color: var(--muted); margin-top: 2px; }

  /* ── Highlight box ── */
  .highlight-box {
    background: linear-gradient(135deg, rgba(79,124,255,0.1), rgba(41,224,169,0.06));
    border: 1px solid rgba(79,124,255,0.25); border-radius: var(--radius); padding: 18px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }
  .highlight-label { font-size: 12px; color: var(--muted); margin-bottom: 4px; }
  .highlight-title { font-family: var(--font-head); font-size: 16px; font-weight: 700; margin-bottom: 6px; }
  .highlight-desc { font-size: 13px; color: var(--muted); }

  /* ── Comparison card ── */
  .compare-row { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 14px; }
  .compare-tag { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
  .compare-body { font-size: 13px; color: var(--muted); }

  /* ── Stats row ── */
  .stat-row { display: flex; gap: 12px; }
  .stat-box { flex: 1; background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; }
  .stat-label { font-size: 12px; color: var(--muted); margin-bottom: 6px; }
  .stat-value { font-family: var(--font-head); font-size: 24px; font-weight: 700; }

  /* ── Cadence row ── */
  .cadence-row { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 12px 14px; font-size: 13px; }
  .cadence-day { font-weight: 600; color: var(--accent2); }

  /* Scrollbar */
  .content::-webkit-scrollbar { width: 5px; }
  .content::-webkit-scrollbar-track { background: transparent; }
  .content::-webkit-scrollbar-thumb { background: var(--surface2); border-radius: 99px; }

  .screen-wrap { display: flex; flex-direction: column; gap: 20px; }
`;

// ── Data ────────────────────────────────────────────────────────────────────

const cohortMembers = [
  { name: "James G.", role: "Ex-Signals", status: "On track", statusType: "default", progress: 64 },
  { name: "Sarah M.", role: "Ex-REME",    status: "Needs review", statusType: "warn",  progress: 42 },
  { name: "Tom B.",   role: "Ex-Infantry",status: "On track", statusType: "default", progress: 58 },
  { name: "Leah P.",  role: "Ex-RAF",     status: "Ahead",    statusType: "green",  progress: 77 },
  { name: "Chris D.", role: "Ex-RLC",     status: "On track", statusType: "default", progress: 61 },
];

const steps = [
  {
    id: 1, title: "Translate your experience", phase: "Foundation", complete: true,
    tasks: ["Map military skills to civilian roles", "Draft career story", "Define target role"],
  },
  {
    id: 2, title: "Build your monitoring toolkit", phase: "Skills", complete: true,
    tasks: ["Set up InfluxDB locally", "Create Grafana dashboard", "Write sample data with Telegraf"],
  },
  {
    id: 3, title: "Create a proof-of-work project", phase: "Application", complete: false,
    tasks: ["Publish dashboard screenshots", "Write architecture summary", "Record 3-min walkthrough"],
  },
  {
    id: 4, title: "Prepare for the job market", phase: "Job Readiness", complete: false,
    tasks: ["Civilian CV review", "Mock interview", "Apply to 5 target roles"],
  },
];

const discussions = [
  { title: "Best way to explain on-call support as civilian experience?", author: "Sarah M.", replies: 12, tag: "CV Translation" },
  { title: "Anyone got a simple InfluxDB + Grafana project example?",      author: "Tom B.",   replies: 8,  tag: "Project Work"  },
  { title: "Which certs actually helped you get interviews?",               author: "Chris D.", replies: 21, tag: "Career Path"   },
  { title: "Translating 'tactical comms' into a tech resume bullet",       author: "Leah P.",  replies: 6,  tag: "CV Translation"},
];

const discordComparison = [
  { tag: "Discord", tagColor: "var(--danger)",  body: "Generic channels, disappearing advice, no structure — veterans get lost in noise." },
  { tag: "Transition Unit", tagColor: "var(--accent2)", body: "Career pathways with defined milestones, cohort accountability, and mentor-linked discussions." },
  { tag: "The Outcome", tagColor: "var(--warn)", body: "Users leave with a portfolio, clearer narrative, and measurable job readiness." },
];

const mentorPosts = [
  {
    title: "What employers really want from veterans entering tech",
    mentor: "Alex R. — Ex-RAF → SRE Manager @ Cloudflare",
    summary: "Focus less on titles and more on evidence: incidents handled, systems improved, dashboards built, teams supported under pressure.",
  },
  {
    title: "How to present support experience as engineering value",
    mentor: "Priya S. — Veteran Careers Mentor",
    summary: "Position your operational discipline, troubleshooting rigour, telemetry work, and service ownership as hard business resilience skills.",
  },
  {
    title: "The 3-project portfolio that gets interviews",
    mentor: "Dan K. — Ex-Army → DevOps Engineer @ AWS",
    summary: "One monitoring project, one automation script, one incident post-mortem write-up. That combination repeatedly unlocks first-round calls.",
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(" ").map((s) => s[0]).join("");
}

function ProgressBar({ value, height = 6 }: { value: number; height?: number }) {
  return (
    <div className="progress-wrap" style={{ height }}>
      <div className="progress-fill" style={{ width: `${value}%`, height }} />
    </div>
  );
}

function Badge({ children, type = "default" }: { children: React.ReactNode; type?: string }) {
  return <span className={`badge badge-${type}`}>{children}</span>;
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

// ── Sidebar ──────────────────────────────────────────────────────────────────

const navItems = [
  { id: "dashboard",   label: "Dashboard",     icon: "⬡" },
  { id: "track",       label: "Mission Track",  icon: "◎" },
  { id: "cohort",      label: "Cohort",         icon: "◈" },
  { id: "discussions", label: "Discussions",    icon: "◫" },
  { id: "mentor",      label: "Mentor Hub",     icon: "◉" },
];

function Sidebar({ current, setCurrent }: { current: string; setCurrent: (id: string) => void }) {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">🎯</div>
        <div>
          <div className="brand-label">Transition Unit</div>
          <div className="brand-sub">Veteran Career Platform</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-btn ${current === item.id ? "active" : ""}`}
            onClick={() => setCurrent(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-cta">
          <div className="cta-label">Why this beats Discord</div>
          <div className="cta-title">Structured progression,<br />not chat chaos</div>
          <div className="cta-pills">
            {["✦ Defined pathways", "✦ Cohort accountability", "✦ Mentor-linked tasks"].map((t) => (
              <div key={t} className="cta-pill">{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Topbar ───────────────────────────────────────────────────────────────────

function Topbar() {
  return (
    <div className="topbar">
      <div>
        <div className="topbar-label">Demo walkthrough</div>
        <div className="topbar-title">Transition Unit MVP</div>
      </div>
      <div className="topbar-actions">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input placeholder="Search tracks, mentors…" />
        </div>
        <button className="btn btn-ghost">🔔 Updates</button>
        <button className="btn btn-primary">Request review</button>
      </div>
    </div>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────

function MetricCard({ icon, title, value, detail }: { icon: string; title: string; value: string; detail: string }) {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <div>
          <div className="metric-label">{title}</div>
          <div className="metric-value">{value}</div>
          <div className="metric-detail">{detail}</div>
        </div>
        <div className="metric-icon">{icon}</div>
      </div>
    </div>
  );
}

function DashboardScreen({ setCurrent }: { setCurrent: (id: string) => void }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="screen-wrap">

      <div className="grid-4">
        <MetricCard icon="◎" title="Current mission"  value="Proof-of-work"    detail="Phase 3 of 4" />
        <MetricCard icon="↗" title="Progress"          value="58%"              detail="Ahead of weekly target" />
        <MetricCard icon="◈" title="Cohort"            value="Alpha-02"         detail="12 veterans in this unit" />
        <MetricCard icon="◻" title="Job readiness"     value="6 weeks"          detail="Estimated to application-ready" />
      </div>

      <div className="grid-3">

        <div className="card">
          <div className="card-title">Mission overview</div>
          <div className="card-desc">What you should do next, not just where you are.</div>

          <div className="highlight-box" style={{ marginBottom: 20 }}>
            <div style={{ flex: 1 }}>
              <div className="highlight-label">Current objective</div>
              <div className="highlight-title">Create a proof-of-work monitoring project</div>
              <div className="highlight-desc">Build something tangible: dashboard, telemetry flow, and short write-up.</div>
            </div>
            <button className="btn btn-primary" onClick={() => setCurrent("track")}>
              Open track →
            </button>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
              <span style={{ fontWeight: 500 }}>Track completion</span>
              <span style={{ color: "var(--muted)" }}>58%</span>
            </div>
            <ProgressBar value={58} height={8} />
          </div>

          <div className="stat-row">
            {[["Completed missions", "7"], ["Discussion replies", "14"], ["Mentor reviews", "2"]].map(([k, v]) => (
              <div key={k} className="stat-box">
                <div className="stat-label">{k}</div>
                <div className="stat-value">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Upcoming</div>
          <div className="card-desc">Cadence creates accountability.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { time: "Wed 19:00", title: "Mentor Q&A: Translating support into engineering value" },
              { time: "Thu 18:30", title: "Cohort check-in: review project progress" },
              { time: "Fri 12:00", title: "CV milestone due" },
            ].map((e) => (
              <div key={e.title} className="event-row">
                <div className="event-icon">📅</div>
                <div>
                  <div className="event-title">{e.title}</div>
                  <div className="event-time">{e.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Track ────────────────────────────────────────────────────────────────────

function TrackScreen() {
  const completed = useMemo(() => steps.filter((s) => s.complete).length, []);
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="screen-wrap">

      <div className="card card-dark" style={{ padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Mission track</div>
            <div style={{ fontFamily: "var(--font-head)", fontSize: 26, fontWeight: 800, marginBottom: 10 }}>
              Data &amp; Monitoring Engineering
            </div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", maxWidth: 560, lineHeight: 1.7 }}>
              A structured route into civilian technical roles using operational experience,
              observability, troubleshooting, and dashboard-led proof of capability.
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["Progress", "58%"], ["Complete", `${completed}/4`]].map(([k, v]) => (
              <div key={k} style={{ background: "rgba(255,255,255,0.07)", borderRadius: "var(--radius)", padding: "16px 22px", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>{k}</div>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 26, fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-3">

        <div className="card">
          <div className="card-title">Pathway steps</div>
          <div className="card-desc">Linear progression reduces overwhelm and gives veterans a clear route forward.</div>
          <div className="space-y">
            {steps.map((step, i) => (
              <div key={step.id} className={`step-row ${!step.complete && i === 2 ? "active" : ""}`}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div className="step-check">{step.complete ? "✅" : "○"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <div className="step-title">{i + 1}. {step.title}</div>
                      <Badge type="default">{step.phase}</Badge>
                      {!step.complete && i === 2 && <Badge type="accent">Current</Badge>}
                    </div>
                    <div className="step-tasks">
                      {step.tasks.map((t) => (
                        <div key={t} className={`step-task ${step.complete ? "done" : ""}`}>{t}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Why this works</div>
          <div className="card-desc">The product story for stakeholders.</div>
          <div className="space-y">
            {discordComparison.map((row) => (
              <div key={row.tag} className="compare-row">
                <div className="compare-tag" style={{ color: row.tagColor }}>{row.tag}</div>
                <div className="compare-body">{row.body}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ── Cohort ───────────────────────────────────────────────────────────────────

function CohortScreen() {
  const statusTypeMap: Record<string, string> = { "On track": "default", "Ahead": "green", "Needs review": "warn" };
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="screen-wrap">
      <div className="grid-3">

        <div className="card">
          <div className="card-title">Cohort Alpha-02</div>
          <div className="card-desc">Small-unit progression creates accountability and belonging.</div>
          <div className="space-y">
            {cohortMembers.map((m) => (
              <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "14px 16px" }}>
                <div className="avatar">{initials(m.name)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</span>
                    <Badge type={statusTypeMap[m.status] || "default"}>{m.status}</Badge>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{m.role}</div>
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1 }}><ProgressBar value={m.progress} height={5} /></div>
                    <span style={{ fontSize: 12, color: "var(--muted)", minWidth: 32 }}>{m.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="card-title">Unit cadence</div>
            <div className="card-desc">Reliable rhythm keeps people returning.</div>
            <div className="space-y">
              {[
                ["Mon", "Weekly mission issued to all members"],
                ["Wed", "Mentor office hours — open Q&A"],
                ["Thu", "Cohort progress check-in"],
                ["Fri", "Project or CV milestone due"],
              ].map(([day, text]) => (
                <div key={day} className="cadence-row">
                  <span className="cadence-day">{day}  </span>
                  <span style={{ color: "var(--muted)", fontSize: 13 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Unit health</div>
            <div className="card-desc">At a glance.</div>
            <div className="stat-row">
              {[["On track", "3"], ["Ahead", "1"], ["At risk", "1"]].map(([k, v]) => (
                <div key={k} className="stat-box">
                  <div className="stat-label">{k}</div>
                  <div className="stat-value">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Discussions ───────────────────────────────────────────────────────────────

function DiscussionsScreen() {
  const [tab, setTab] = useState("structured");
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="screen-wrap">

      <div className="tabs-list">
        {[["structured", "Structured discussions"], ["comparison", "Why not Discord"]].map(([id, label]) => (
          <button key={id} className={`tab-trigger ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "structured" && (
          <motion.div key="structured" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="grid-3">

            <div className="card">
              <div className="card-title">Task-linked conversations</div>
              <div className="card-desc">Discussion is attached to action, so advice stays relevant and findable.</div>
              <div className="space-y">
                {discussions.map((post) => (
                  <div key={post.title} className="disc-post">
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <Badge type="accent">{post.tag}</Badge>
                    </div>
                    <div className="disc-title">{post.title}</div>
                    <div className="disc-meta">
                      <span>by {post.author}</span>
                      <span>·</span>
                      <span>💬 {post.replies} replies</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-title">Why it works</div>
              <div className="card-desc">Context-attached discussion beats generic forums.</div>
              <div className="space-y">
                {[
                  ["🔗 Linked to milestones", "Each thread is tied to a specific task, so answers stay useful long after the conversation ends."],
                  ["👥 Cohort-scoped", "Discussions stay within the unit. No noise from unrelated groups or random members."],
                  ["📌 Mentor-flagged", "Mentors can pin key replies, so the best advice rises to the top automatically."],
                ].map(([title, body]) => (
                  <div key={title} className="compare-row">
                    <div className="compare-tag" style={{ color: "var(--accent2)", marginBottom: 4 }}>{title}</div>
                    <div className="compare-body">{body}</div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {tab === "comparison" && (
          <motion.div key="comparison" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="grid-2">
            {[
              {
                label: "Discord", color: "var(--danger)",
                points: [
                  "Messages buried within hours",
                  "No structure or milestone context",
                  "Any veteran at any stage mixed together",
                  "No accountability for progress",
                  "Mentors burnt out by repetitive questions",
                ],
              },
              {
                label: "Transition Unit", color: "var(--accent2)",
                points: [
                  "Discussions pinned to specific pathway steps",
                  "Cohort-scoped — relevant peers only",
                  "Mentor-flagged best answers surface automatically",
                  "Weekly cadence creates natural check-in moments",
                  "Veterans leave with tangible work, not just advice",
                ],
              },
            ].map((col) => (
              <div key={col.label} className="card">
                <div style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 700, color: col.color, marginBottom: 16 }}>{col.label}</div>
                <div className="space-y">
                  {col.points.map((p) => (
                    <div key={p} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, color: "var(--muted)" }}>
                      <span style={{ color: col.color, marginTop: 1 }}>›</span> {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Mentor Hub ────────────────────────────────────────────────────────────────

function MentorScreen() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="screen-wrap">

      <div className="grid-4">
        {[
          ["◉", "Active mentors", "8", "Across 3 specialisms"],
          ["🏅", "Posts this week", "14", "New guidance added"],
          ["📅", "Next session", "Wed 19:00", "Translating support into engineering"],
          ["✦", "Avg response", "< 24 hrs", "Via review requests"],
        ].map(([icon, label, value, detail]) => (
          <MetricCard key={label} icon={icon} title={label} value={value} detail={detail} />
        ))}
      </div>

      <div className="grid-3">

        <div className="card">
          <div className="card-title">Mentor Hub</div>
          <div className="card-desc">Guidance from people who made the same transition.</div>
          <div className="space-y">
            {mentorPosts.map((post) => (
              <div key={post.title} className="mentor-post">
                <div className="mentor-name">◉ {post.mentor}</div>
                <div className="mentor-title">{post.title}</div>
                <div className="mentor-summary">{post.summary}</div>
                <div style={{ marginTop: 12 }}>
                  <button className="btn btn-ghost btn-sm">Read post →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="card-title">Request a review</div>
            <div className="card-desc">Submit your CV or project for mentor feedback.</div>
            <div className="space-y" style={{ marginBottom: 14 }}>
              {[
                ["CV review", "~2 day turnaround"],
                ["Project walkthrough", "Book a 30-min slot"],
                ["Mock interview", "Friday sessions only"],
              ].map(([type, detail]) => (
                <div key={type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "12px 14px" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{type}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{detail}</div>
                  </div>
                  <button className="btn btn-primary btn-sm">Request</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Mentor specialisms</div>
            <div className="card-desc">Who&apos;s in the pool.</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Site Reliability", "DevOps", "Cloud Infra", "Observability", "Technical Support", "Solutions Eng.", "CV Translation"].map((s) => (
                <Badge key={s} type="default">{s}</Badge>
              ))}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────

export default function App() {
  const [current, setCurrent] = useState("dashboard");

  const screens: Record<string, React.ReactNode> = {
    dashboard:   <DashboardScreen setCurrent={setCurrent} />,
    track:       <TrackScreen />,
    cohort:      <CohortScreen />,
    discussions: <DiscussionsScreen />,
    mentor:      <MentorScreen />,
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <Sidebar current={current} setCurrent={setCurrent} />
        <div className="main">
          <Topbar />
          <div className="content">
            <AnimatePresence mode="wait">
              <React.Fragment key={current}>
                {screens[current]}
              </React.Fragment>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
