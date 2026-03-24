"use client";

import { useState } from "react";

const css = `
  :root {
    --bg: #0f1117;
    --surface: #1a1d27;
    --surface2: #22263a;
    --border: #2e3350;
    --accent: #3b82f6;
    --text: #e2e8f0;
    --muted: #94a3b8;
    --heading: #f8fafc;
    --amber: #f59e0b;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }

  .icsc-header {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 18px 32px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .icsc-badge {
    background: var(--accent);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 3px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .icsc-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--heading);
  }
  .icsc-subtitle {
    font-size: 0.8rem;
    color: var(--muted);
    margin-top: 2px;
  }

  .icsc-tabs {
    display: flex;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 32px;
    overflow-x: auto;
  }
  .icsc-tab-btn {
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    color: var(--muted);
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 12px 18px;
    transition: color 0.15s, border-color 0.15s;
    white-space: nowrap;
  }
  .icsc-tab-btn:hover { color: var(--text); }
  .icsc-tab-btn.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .icsc-panel { padding: 28px 32px 48px; }

  .icsc-intro {
    font-size: 0.85rem;
    color: var(--muted);
    margin-bottom: 24px;
    max-width: 820px;
  }
  .icsc-alert {
    background: #1c1a10;
    border: 1px solid #78350f;
    border-left: 4px solid var(--amber);
    border-radius: 6px;
    padding: 10px 14px;
    font-size: 0.82rem;
    color: #fbbf24;
    margin-bottom: 28px;
  }

  .icsc-section-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px;
    margin-top: 32px;
  }
  .icsc-section-label:first-of-type { margin-top: 0; }

  .icsc-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 14px;
    margin-bottom: 8px;
  }

  .icsc-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: 6px;
    transition: border-color 0.15s, background 0.15s;
  }
  .icsc-card:hover {
    border-color: var(--accent);
    background: var(--surface2);
  }
  .icsc-card-top {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .icsc-card-icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
  }
  .icsc-card-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--heading);
  }
  .icsc-card-desc {
    font-size: 0.78rem;
    color: var(--muted);
    line-height: 1.5;
  }
  .icsc-card-tag {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 4px;
    width: fit-content;
  }
  .icsc-card-warn {
    margin-top: 8px;
    font-size: 0.75rem;
    color: #f59e0b;
  }

  /* Category colour themes */
  .cat-conflict .icsc-card-icon { background: #1f0a0a; color: #f87171; }
  .cat-conflict .icsc-card-tag  { background: #1f0a0a; color: #f87171; }
  .cat-think   .icsc-card-icon  { background: #0c1a3d; color: #93c5fd; }
  .cat-think   .icsc-card-tag   { background: #0c1a3d; color: #93c5fd; }
  .cat-news    .icsc-card-icon  { background: #0a1a14; color: #4ade80; }
  .cat-news    .icsc-card-tag   { background: #0a1a14; color: #4ade80; }
  .cat-geo     .icsc-card-icon  { background: #0f1a0a; color: #86efac; }
  .cat-geo     .icsc-card-tag   { background: #0f1a0a; color: #86efac; }
  .cat-social  .icsc-card-icon  { background: #1a0c2e; color: #c084fc; }
  .cat-social  .icsc-card-tag   { background: #1a0c2e; color: #c084fc; }
  .cat-data    .icsc-card-icon  { background: #1a130a; color: #fbbf24; }
  .cat-data    .icsc-card-tag   { background: #1a130a; color: #fbbf24; }

  /* ── Course panel (light inset) ── */
  .icsc-course {
    background: #f8fafc;
    color: #1f2937;
    border-radius: 10px;
    padding: 32px 36px;
  }
  .icsc-course h2 {
    color: #111827;
    font-size: 1.05rem;
    margin-top: 28px;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 6px;
  }
  .icsc-course h2:first-of-type { margin-top: 0; }
  .icsc-course a { color: #1d4ed8; }
  .icsc-course ul, .icsc-course ol { padding-left: 20px; }
  .icsc-course li { margin: 8px 0; line-height: 1.6; }
  .icsc-course .course-note {
    background: #fff7ed;
    border-left: 4px solid #fb923c;
    padding: 12px 14px;
    margin: 18px 0;
    border-radius: 0 6px 6px 0;
  }
  .icsc-course code {
    background: #f3f4f6;
    padding: 1px 5px;
    border-radius: 4px;
    font-size: 0.9em;
  }
  .icsc-course p { margin: 10px 0; line-height: 1.7; }
  .icsc-course-footer {
    margin-top: 32px;
    font-size: 0.88rem;
    color: #4b5563;
    border-top: 1px solid #e5e7eb;
    padding-top: 14px;
  }
`;

type Tab = "dashboard" | "course";

interface CardProps {
  href: string;
  icon: string;
  name: string;
  tag: string;
  desc: string;
  cat: string;
  warn?: string;
  noLink?: boolean;
}

function Card({ href, icon, name, tag, desc, cat, warn, noLink }: CardProps) {
  const inner = (
    <>
      <div className="icsc-card-top">
        <div className="icsc-card-icon">{icon}</div>
        <div>
          <div className="icsc-card-name">{name}</div>
          <span className="icsc-card-tag">{tag}</span>
        </div>
      </div>
      <div className="icsc-card-desc">{desc}</div>
      {warn && <div className="icsc-card-warn">⚠ {warn}</div>}
    </>
  );

  if (noLink) {
    return (
      <div className={`icsc-card ${cat}`} style={{ cursor: "default" }}>
        {inner}
      </div>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`icsc-card ${cat}`}>
      {inner}
    </a>
  );
}

export default function ICSCPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ── Header ── */}
      <header className="icsc-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="icsc-badge">OSINT</span>
            <h1 className="icsc-title">ICSC(L) Open Sources &amp; OSINT Dashboard</h1>
          </div>
          <div className="icsc-subtitle">
            Open-source intelligence feeds &amp; course reference material — UK Intermediate Command and Staff Course (Land)
          </div>
        </div>
      </header>

      {/* ── Tabs ── */}
      <nav className="icsc-tabs">
        {(["dashboard", "course"] as Tab[]).map((tab) => (
          <button
            key={tab}
            className={`icsc-tab-btn${activeTab === tab ? " active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "dashboard" ? "OSINT Dashboard" : "Course Material"}
          </button>
        ))}
      </nav>

      {/* ── OSINT Dashboard ── */}
      {activeTab === "dashboard" && (
        <section className="icsc-panel">
          <p className="icsc-intro">
            Curated open-source intelligence sources organised by category. All links are publicly available.
            Some social-media sources are listed for reference but may be rate-limited or require an account.
          </p>

          <div className="icsc-alert">
            ⚠ This dashboard contains no restricted or classified material. Sources are open-access.
            Verify currency and corroborate across at least two independent sources before drawing analytical conclusions.
          </div>

          {/* Conflict */}
          <div className="icsc-section-label">Conflict &amp; Situation Monitoring</div>
          <div className="icsc-cards">
            <Card cat="cat-conflict" href="https://www.understandingwar.org/backgrounder/ukraine-conflict-updates" icon="⚔" name="ISW — Ukraine Conflict Updates" tag="Conflict Monitor"
              desc="Institute for the Study of War daily situation reports with map assessments. Considered a primary open-source reference for the Ukraine theatre." />
            <Card cat="cat-conflict" href="https://acleddata.com/dashboard/#/dashboard" icon="📊" name="ACLED Dashboard" tag="Conflict Monitor"
              desc="Armed Conflict Location and Event Data Project — real-time, geolocated conflict event data covering 220+ countries. Downloadable datasets available." />
            <Card cat="cat-conflict" href="https://liveuamap.com/" icon="🗺" name="Live Universal Awareness Map" tag="Conflict Monitor"
              desc="Near-real-time geolocation of reported events drawn from social media and news. Useful for initial orientation; corroboration essential." />
            <Card cat="cat-conflict" href="https://www.oryxspioenkop.com/2022/02/attack-on-europe-documenting-equipment.html" icon="🛡" name="Oryx — Equipment Loss Tracker" tag="Conflict Monitor"
              desc="Visually confirmed vehicle and equipment losses with photo-sourced evidence. A methodological benchmark for open-source battle damage assessment." />
            <Card cat="cat-conflict" href="https://www.cfr.org/global-conflict-tracker" icon="🌐" name="CFR Global Conflict Tracker" tag="Conflict Monitor"
              desc="Council on Foreign Relations interactive tracker covering active conflicts and crises worldwide, with US strategic-interest ratings." />
            <Card cat="cat-conflict" href="https://kyivindependent.com/" icon="🇺🇦" name="The Kyiv Independent" tag="Conflict Monitor"
              desc="English-language Ukrainian outlet with frontline reporting, analysis, and context. Primary source for in-country perspective; bias awareness required." />
          </div>

          {/* Think Tanks */}
          <div className="icsc-section-label">Think Tanks &amp; Strategic Analysis</div>
          <div className="icsc-cards">
            <Card cat="cat-think" href="https://www.rusi.org/" icon="🏛" name="RUSI" tag="Think Tank"
              desc="Royal United Services Institute — UK's primary defence and security think tank. Publishes commentary, research papers, and the RUSI Journal. Many pieces are open access." />
            <Card cat="cat-think" href="https://www.iiss.org/" icon="🔭" name="IISS" tag="Think Tank"
              desc="International Institute for Strategic Studies — publishes the Military Balance, Strategic Survey, and Adelphi papers. Some open-access content available." />
            <Card cat="cat-think" href="https://www.sipri.org/" icon="⚖" name="SIPRI" tag="Think Tank"
              desc="Stockholm International Peace Research Institute — authoritative data on arms transfers, military expenditure, and nuclear arsenals. All data fully open access." />
            <Card cat="cat-think" href="https://www.chathamhouse.org/topics/defence-and-security" icon="🏠" name="Chatham House — Security" tag="Think Tank"
              desc="Royal Institute of International Affairs defence and security research, including Russia/Eurasia, cyber, and deterrence programmes." />
            <Card cat="cat-think" href="https://www.csis.org/programs/international-security-program" icon="🏢" name="CSIS — International Security" tag="Think Tank"
              desc="Center for Strategic and International Studies. US-aligned but internationally credible. Produces frequent open-access analysis on NATO, Indo-Pacific, and emerging threats." />
            <Card cat="cat-think" href="https://warontherocks.com/" icon="✍" name="War on the Rocks" tag="Analysis"
              desc="Practitioner-led analysis by current and former military officers, diplomats, and academics. Particularly strong on operational art and US/NATO strategy." />
            <Card cat="cat-think" href="https://mwi.westpoint.edu/" icon="🪖" name="Modern War Institute (West Point)" tag="Analysis"
              desc="West Point's operational-level analysis outlet. Regular podcasts, papers, and short essays with a practical military education focus." />
            <Card cat="cat-think" href="https://www.rand.org/topics/defense-and-security.html" icon="📋" name="RAND — Defence &amp; Security" tag="Think Tank"
              desc="Large open-access library of defence research covering force structure, deterrence, logistics, and campaign analysis." />
          </div>

          {/* News */}
          <div className="icsc-section-label">News &amp; Defence Journalism</div>
          <div className="icsc-cards">
            <Card cat="cat-news" href="https://theweek.com/world-news" icon="📰" name="The Week — World News" tag="News"
              desc="Aggregates and contextualises coverage from across the political spectrum. Useful for quickly surveying how events are being reported and framed." />
            <Card cat="cat-news" href="https://www.defenseone.com/" icon="🔍" name="Defense One" tag="News"
              desc="US-centric but internationally relevant defence journalism covering acquisition, policy, operations, and technology." />
            <Card cat="cat-news" href="https://breakingdefense.com/" icon="📡" name="Breaking Defense" tag="News"
              desc="Trade publication covering defence programmes, procurement, and strategy with US and European editions." />
            <Card cat="cat-news" href="https://foreignpolicy.com/category/analysis/security/" icon="🌍" name="Foreign Policy — Security" tag="News"
              desc="Authoritative analysis from senior practitioners. Some content behind paywall, but free articles provide significant value." />
            <Card cat="cat-news" href="https://www.bbc.co.uk/news/world" icon="📻" name="BBC News — World" tag="News"
              desc="Widely trusted public broadcaster. BBC Verify and Monitoring Service cover disinformation and open-source verification." />
            <Card cat="cat-news" href="https://www.theguardian.com/world/defence-and-security" icon="🗞" name="The Guardian — Defence" tag="News"
              desc="Useful for UK defence policy coverage, Parliamentary reporting, and investigative pieces on procurement and veterans' affairs." />
            <Card cat="cat-news" href="https://www.economist.com/topics/defence" icon="📈" name="The Economist — Defence" tag="News"
              desc="High-quality strategic analysis integrating economic and political context. Babbage podcast is particularly useful for operational and technology issues." />
            <Card cat="cat-news" href="https://www.thetimes.co.uk/topic/defence" icon="🏴󠁧󠁢󠁥󠁮󠁧󠁿" name="The Times — Defence" tag="News"
              desc="Strong UK military reporting with good MOD and Whitehall sourcing. Some content paywalled." />
          </div>

          {/* Geospatial */}
          <div className="icsc-section-label">Geospatial &amp; Imagery Intelligence (GEOINT)</div>
          <div className="icsc-cards">
            <Card cat="cat-geo" href="https://apps.sentinel-hub.com/eo-browser/" icon="🛰" name="Sentinel Hub EO Browser" tag="Geospatial"
              desc="Free access to ESA Sentinel-1 SAR and Sentinel-2 optical imagery with temporal change analysis. Widely used for open-source battle damage assessment." />
            <Card cat="cat-geo" href="https://www.planet.com/explorer/" icon="🌏" name="Planet Explorer" tag="Geospatial"
              desc="High-cadence commercial satellite imagery (3–5m resolution). Free tier limited; full access requires subscription but Planet shares imagery through media partnerships." />
            <Card cat="cat-geo" href="https://worldview.earthdata.nasa.gov/" icon="🔭" name="NASA Worldview" tag="Geospatial"
              desc="Near-real-time satellite imagery from MODIS, VIIRS, and other NASA instruments. Useful for fire, flood, and large-scale change detection." />
            <Card cat="cat-geo" href="https://www.google.com/intl/en_uk/earth/about/versions/" icon="🌐" name="Google Earth Pro" tag="Geospatial"
              desc="Free desktop application. Supports KML overlays, historical imagery timelines, and measurement tools. Standard OSINT baseline tool." />
            <Card cat="cat-geo" href="https://www.flightradar24.com/" icon="✈" name="Flightradar24" tag="SIGINT / Track"
              desc="ADS-B flight tracking. Useful for monitoring military transport movements (where transponders are active), medevac patterns, and logistics indicators." />
            <Card cat="cat-geo" href="https://www.marinetraffic.com/" icon="🚢" name="MarineTraffic" tag="SIGINT / Track"
              desc="AIS vessel tracking. Useful for naval movement monitoring, sanctions compliance research, and amphibious logistics indicators." />
          </div>

          {/* OSINT methodology */}
          <div className="icsc-section-label">OSINT Methodology &amp; Verification</div>
          <div className="icsc-cards">
            <Card cat="cat-social" href="https://www.bellingcat.com/" icon="🔎" name="Bellingcat" tag="OSINT / Verify"
              desc="Leading open-source investigative outlet. The Bellingcat Online Investigation Toolkit and methodology guides are a standard OSINT reference. Also publishes training resources." />
            <Card cat="cat-social" href="https://www.bellingcat.com/resources/how-tos/2019/06/01/belling-the-cat-how-to-use-our-online-investigation-toolkit/" icon="🧰" name="Bellingcat Online Investigation Toolkit" tag="OSINT / Verify"
              desc="Curated list of geolocation, imagery, and social media investigation tools. A starting point for any OSINT workflow." />
            <Card cat="cat-social" href="https://firstdraftnews.org/long-form-article/verification-of-user-generated-content/" icon="✅" name="First Draft — UGC Verification" tag="OSINT / Verify"
              desc="Foundational guide to verifying user-generated content, including video geolocation, reverse image search, and source credibility assessment." />
            <Card cat="cat-social" href="https://osintframework.com/" icon="🕸" name="OSINT Framework" tag="OSINT / Verify"
              desc="Interactive tree of OSINT tools organised by category (social media, geospatial, domain research, etc). Useful as a tool-discovery reference." />
            <Card cat="cat-social" href="https://www.nytimes.com/interactive/2022/world/europe/ukraine-maps.html" icon="🗺" name="NYT Ukraine Conflict Maps" tag="OSINT / Verify"
              desc="New York Times visual desk maps synthesising open-source reporting. Useful as a corroboration source for ISW and ACLED assessments." />
          </div>

          {/* Social media */}
          <div className="icsc-section-label">Social Media &amp; Primary Source Accounts</div>
          <div className="icsc-cards">
            <Card noLink cat="cat-social" href="#" icon="𝕏" name="@SentDefender (X)" tag="Social / Primary"
              desc="High-volume open-source defence analyst. Rapid reporting on conflict developments with imagery. Requires X (Twitter) account — rate limits apply for unauthenticated users. Corroboration strongly advised before use in analysis."
              warn="Account access requires X login. Not embeddable. Treat as tip-line, not primary source." />
            <Card noLink cat="cat-social" href="#" icon="✈" name="@OSINTdefender (X)" tag="Social / Primary"
              desc="OSINT aggregator covering global conflict, terrorism, and security events. High-frequency posting; same X access caveats apply. Use alongside ISW and ACLED for verification."
              warn="Requires X login. Use as a cueing source only." />
            <Card cat="cat-social" href="https://t.me/s/ukrainewar" icon="✉" name="Telegram Open Channels" tag="Social / Primary"
              desc="Multiple open Telegram channels (DeepStateMap, Ukraine War, various mil-blogger feeds) publish near-real-time imagery and reporting. High noise-to-signal ratio — verification essential." />
            <Card cat="cat-social" href="https://www.youtube.com/@HistoryLegends" icon="▶" name="Military/History YouTube Channels" tag="Social / Secondary"
              desc="Various YouTube channels aggregate and contextualise footage and reporting. Treat as orientation, not analysis. Evaluate narrator credentials and sourcing carefully." />
          </div>

          {/* Data */}
          <div className="icsc-section-label">Data &amp; Reference Databases</div>
          <div className="icsc-cards">
            <Card cat="cat-data" href="https://www.sipri.org/databases/milex" icon="💰" name="SIPRI Military Expenditure DB" tag="Data"
              desc="Downloadable time-series data on defence spending for 170+ countries. Authoritative for orders-of-magnitude comparisons and trend analysis." />
            <Card cat="cat-data" href="https://www.sipri.org/databases/armstransfers" icon="🔫" name="SIPRI Arms Transfers DB" tag="Data"
              desc="Global major conventional arms transfers since 1950. Essential for analysing supply chains, dependency relationships, and proliferation risk." />
            <Card cat="cat-data" href="https://www.iiss.org/publications/the-military-balance/" icon="📚" name="IISS Military Balance" tag="Data"
              desc="Annual assessment of global military capabilities and defence economics. Standard reference for order-of-battle analysis. Requires subscription for full access." />
            <Card cat="cat-data" href="https://nuclearweaponsedusuite.carnegieendowment.org/" icon="☢" name="Carnegie Nuclear Policy Programme" tag="Data"
              desc="Open-access nuclear policy research and databases covering arsenals, doctrine, and arms control. Relevant for strategic context and deterrence modules." />
            <Card cat="cat-data" href="https://www.nato.int/cps/en/natohq/topics_49198.htm" icon="🏳" name="NATO Spending &amp; Burden-Sharing" tag="Data"
              desc="Official NATO defence expenditure data by member state, including GDP percentage and per-capita figures. Updated annually." />
            <Card cat="cat-data" href="https://janesequipmentdb.com/" icon="🔩" name="Jane's — Equipment Reference" tag="Data"
              desc="Subscription-based but widely available through Defence Academy and university library proxies. Authoritative order-of-battle and equipment specifications." />
          </div>
        </section>
      )}

      {/* ── Course Material ── */}
      {activeTab === "course" && (
        <section className="icsc-panel">
          <div className="icsc-course">
            <h2>Open Sources for the Intermediate Command and Staff Course (Land)</h2>

            <p>
              What you described is essentially the UK <strong>Intermediate Command and Staff Course (Land)</strong>, a sensitive
              professional military education programme. There is no public, complete course pack or full reading list, but there are
              credible <strong>open-source equivalents</strong> and feeder materials used across UK and NATO-aligned staff education.
            </p>

            <div className="course-note">
              <strong>Important:</strong> this document points only to open, public sources. It does not include restricted teaching
              material, current internal exercises, assessment material, or operationally sensitive content.
            </div>

            <h2>1. Official and Semi-Official Defence Sources</h2>
            <p>These are the closest public equivalents to primary course material.</p>
            <ul>
              <li>
                <a href="https://www.gov.uk/government/publications/uk-defence-doctrine-jdp-0-01">UK Defence Doctrine (JDP 0-01)</a>
                {" "}— the main UK capstone doctrine publication.
              </li>
              <li>
                <a href="https://www.gov.uk/government/collections/joint-doctrine-publication-jdp">Joint Doctrine Publications (JDPs) collection</a>
                {" "}— gateway to the wider UK doctrine library.
              </li>
              <li>
                <a href="https://assets.publishing.service.gov.uk/media/6579c11a254aaa000d050c6e/20201112-ARCHIVE_JCN_1_20_MDI_Official.pdf">Joint Concept Note 1/20: Multi-Domain Integration</a>
                {" "}— useful for the multi-domain integration side of the syllabus.
              </li>
              <li>
                <a href="https://www.gov.uk/government/publications/the-strategic-defence-review-2025-making-britain-safer-secure-at-home-strong-abroad/the-strategic-defence-review-2025-making-britain-safer-secure-at-home-strong-abroad">The Strategic Defence Review 2025</a>
                {" "}— current strategic policy context for UK defence.
              </li>
              <li>
                <a href="https://www.gov.uk/government/publications/the-integrated-operating-concept-2025">Integrated Operating Concept</a>
                {" "}— historically important, but note that this GOV.UK publication is marked <strong>withdrawn</strong>.
              </li>
            </ul>

            <h2>2. NATO Doctrine and Planning Sources</h2>
            <p>These are especially useful for operational planning, staff work, and multinational interoperability.</p>
            <ul>
              <li>
                <a href="https://nllp.jallc.nato.int/cmnt/ciedcoi/CIED%20PUBLICATIONS/Handbooks%20and%20Doctrines/AJP-3%28B%29%20CONDUCT%20OPS%20dated%20march11.pdf">AJP-3: Allied Joint Doctrine for the Conduct of Operations</a>
              </li>
              <li>
                <a href="https://www.act.nato.int/wp-content/uploads/2023/06/nato-pao-handbook-2020.pdf">Public Affairs Handbook (contains references to AJP-5 and the planning process)</a>
              </li>
              <li>
                <a href="https://www.jwc.nato.int/article/jwc-doctrine-development-process/">NATO Joint Warfare Centre: Doctrine Development Process</a>
              </li>
              <li>
                <a href="https://www.jallc.nato.int/download_file/view/1616/466">NATO Lessons Learned Handbook</a>
              </li>
              <li>
                <a href="https://nllp.jallc.nato.int/cmnt/ciedcoi/CIED%20PUBLICATIONS/Handbooks%20and%20Doctrines/AJP%203.9.%20DOCTRINE%20OF%20JOINT%20TARGETING.pdf">AJP-3.9: Allied Joint Doctrine for Joint Targeting</a>
              </li>
            </ul>
            <p>
              <strong>Note:</strong> public access to the latest edition of <code>AJP-5</code> is inconsistent, so the links above are
              safe public proxies for NATO planning doctrine and practice.
            </p>

            <h2>3. UK Course and Institutional Context</h2>
            <ul>
              <li>
                <a href="https://www.army.mod.uk/support-and-training/our-schools-and-colleges/international-defence-training-army/">International Defence Training (Army)</a>
                {" "}— public-facing Army page listing ICSC(L).
              </li>
              <li>
                <a href="https://www.army.mod.uk/media/3hgdpryj/24-07-192_idt_a4_digital_idtcatalogue_v6_-proof02-final.pdf">International Defence Training (Army) Catalogue</a>
                {" "}— includes a public course summary for ICSC(L).
              </li>
              <li>
                <a href="https://www.army.mod.uk/learn-and-explore/about-the-army/formations-divisions-and-brigades/field-army-troops/land-warfare-centre/">Land Warfare Centre</a>
                {" "}— includes the Land Command Staff College context.
              </li>
            </ul>

            <h2>4. Academic and Accreditation Sources</h2>
            <ul>
              <li><a href="https://www.kcl.ac.uk/warstudies">King&apos;s College London Department of War Studies</a></li>
              <li><a href="https://www.kcl.ac.uk/security-studies">King&apos;s College London School of Security Studies</a></li>
              <li><a href="https://www.kcl.ac.uk/dsd">King&apos;s College London Defence Studies Department</a></li>
              <li><a href="https://www.kcl.ac.uk/dsd/military-education/icsclma">MA in Military and Security Studies (for ICSC(L) students)</a></li>
              <li><a href="https://www.henley.ac.uk/study/corporate-development/army-higher-education-pathway">Henley Business School Army Higher Education Pathway</a></li>
              <li><a href="https://www.henley.ac.uk/research/centres/henley-centre-for-leadership">Henley Centre for Leadership</a></li>
              <li><a href="https://www.henley.ac.uk/corporate-development/leadership">Leadership at Henley</a></li>
            </ul>

            <h2>5. Allied Staff College Material</h2>
            <p>
              Your description mentions the two-week exercise at the US Command and General Staff College, Fort Leavenworth.
              For public, related context, start with the institution itself:
            </p>
            <ul>
              <li><a href="https://www.armyuniversity.edu/cgsc">US Command and General Staff College</a></li>
            </ul>
            <p>
              From there, public material on staff planning, orders, and military decision-making can usually be found through
              Army University and Fort Leavenworth resources.
            </p>

            <h2>6. Historical Campaign and Staff Ride Sources (Normandy)</h2>
            <p>Your course description explicitly references Operation OVERLORD, including DEADSTICK, GOODWOOD, and TRACTABLE.</p>
            <ul>
              <li><a href="https://www.iwm.org.uk/collections/item/object/1060019590">Imperial War Museums: Scenes from Operation Goodwood</a></li>
              <li><a href="https://www.iwm.org.uk/collections/item/object/1060028091">Imperial War Museums: Operation Goodwood Part 3</a></li>
              <li><a href="https://www.iwm.org.uk/collections/item/object/1060019573">Imperial War Museums: Scenes on the second day of Operation Goodwood</a></li>
              <li><a href="https://www.iwm.org.uk/collections/item/object/1060019578">Imperial War Museums: The 11th Armoured Division in action on Operation Goodwood</a></li>
              <li><a href="https://www.iwm.org.uk/collections/item/object/1060019581">Imperial War Museums: German defences opposing Operation Goodwood</a></li>
            </ul>

            <h2>7. What You Are Unlikely to Find Publicly</h2>
            <ul>
              <li>Actual syndicate room material</li>
              <li>Current internal MAPEX, MODELEX, or TEWT packs</li>
              <li>Real assessment rubrics and staff grading material</li>
              <li>Current operational scenarios or restricted doctrine supplements</li>
            </ul>
            <p>
              That said, a large share of the intellectual content behind the course can still be studied through doctrine,
              academic reading, campaign history, and public staff-college material.
            </p>

            <h2>8. Practical Self-Study Sequence</h2>
            <ol>
              <li>Start with <a href="https://www.gov.uk/government/publications/uk-defence-doctrine-jdp-0-01">UK Defence Doctrine (JDP 0-01)</a>.</li>
              <li>Move to <a href="https://assets.publishing.service.gov.uk/media/6579c11a254aaa000d050c6e/20201112-ARCHIVE_JCN_1_20_MDI_Official.pdf">Multi-Domain Integration</a> and related UK concepts.</li>
              <li>Read public NATO planning and operations doctrine such as <a href="https://nllp.jallc.nato.int/cmnt/ciedcoi/CIED%20PUBLICATIONS/Handbooks%20and%20Doctrines/AJP-3%28B%29%20CONDUCT%20OPS%20dated%20march11.pdf">AJP-3</a>.</li>
              <li>Use King&apos;s College London material for conflict, strategy, and security studies.</li>
              <li>Use Henley material for leadership, management, and executive-level thinking.</li>
              <li>Study Normandy campaign sources to mirror the staff ride and historical analysis components.</li>
            </ol>

            <div className="icsc-course-footer">
              Prepared as a public, open-source companion document. All links were live and public at the time this page was created.
            </div>
          </div>
        </section>
      )}
    </>
  );
}
