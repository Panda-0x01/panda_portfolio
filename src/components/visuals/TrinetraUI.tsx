import {
  Activity,
  Globe,
  LayoutDashboard,
  Network,
  ScrollText,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { Dots, Pill, Sparkline } from "./primitives";

/**
 * TRINETRA — illustrative SOC / cyber-resilience console.
 * Sample data only (TEST-NET ranges), no real indicators.
 */

const LINE = "#333333";
const PAPER = "#f5f5f5";

const NAV = [
  { Icon: LayoutDashboard, label: "Overview", on: true },
  { Icon: ShieldCheck, label: "Threats" },
  { Icon: Globe, label: "Assets" },
  { Icon: Network, label: "Network" },
  { Icon: ScrollText, label: "Playbooks" },
  { Icon: Settings, label: "Settings" },
];

const STATS = [
  { v: "128", l: "Active threats", spark: [3, 5, 4, 7, 6, 9, 8, 12] },
  { v: "3,412", l: "Blocked / 24h", spark: [8, 6, 9, 7, 11, 10, 13, 12] },
  { v: "1,208", l: "Assets watched", spark: [4, 4, 5, 5, 6, 6, 7, 8] },
  { v: "62", l: "Risk score", spark: [9, 10, 8, 11, 7, 6, 5, 4] },
];

const ALERTS = [
  { sev: "CRIT", type: "Credential stuffing", ip: "203.0.113.42", t: "00:12" },
  { sev: "HIGH", type: "SQL injection", ip: "198.51.100.7", t: "00:41" },
  { sev: "MED", type: "Port scan", ip: "192.0.2.155", t: "02:15" },
  { sev: "HIGH", type: "C2 beacon", ip: "203.0.113.9", t: "03:02" },
  { sev: "MED", type: "TLS downgrade", ip: "192.0.2.71", t: "05:30" },
  { sev: "LOW", type: "Rate anomaly", ip: "198.51.100.23", t: "06:04" },
];

function Radar() {
  return (
    <svg
      className="mk-svg"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g fill="none" stroke={LINE}>
        <circle cx="200" cy="150" r="45" />
        <circle cx="200" cy="150" r="85" className="pv-ring" />
        <circle cx="200" cy="150" r="125" />
      </g>
      <g stroke={LINE} strokeWidth="1">
        <line x1="60" y1="150" x2="340" y2="150" />
        <line x1="200" y1="10" x2="200" y2="290" />
      </g>
      <g className="pv-sweep">
        <path d="M200 150 L200 25 A125 125 0 0 1 297 78 Z" fill={PAPER} opacity="0.08" />
        <line x1="200" y1="150" x2="200" y2="25" stroke={PAPER} strokeWidth="1.5" />
      </g>
      <g fill={PAPER}>
        <circle cx="248" cy="110" r="3.5" className="pv-blip" />
        <circle cx="152" cy="196" r="3" className="pv-blip pv-blip--2" />
        <circle cx="240" cy="205" r="3" className="pv-blip pv-blip--3" />
      </g>
    </svg>
  );
}

export default function TrinetraUI() {
  return (
    <div className="mk" aria-hidden="true">
      <div className="mk-winbar">
        <Dots />
        <span className="mk-title">Trinetra</span>
        <span className="mk-sub">National Cyber Resilience</span>
        <span className="mk-spacer" />
        <Pill live>Engine online</Pill>
      </div>

      <div className="mk-subbar">
        <span className="mk-search">Search assets, CVEs, indicators…</span>
        <span className="mk-spacer" />
        <Pill>1h</Pill>
        <Pill on>24h</Pill>
        <Pill>7d</Pill>
      </div>

      <div className="mk-body">
        <aside className="mk-side">
          <nav className="mk-nav">
            {NAV.map(({ Icon, label, on }) => (
              <span key={label} className={on ? "mk-nav-item is-on" : "mk-nav-item"}>
                <Icon />
                {label}
              </span>
            ))}
          </nav>
          <div className="mk-nav-foot">
            <span className="mk-mono mk-mut" style={{ fontSize: "var(--fs-1)" }}>
              CORE v0.9.4
            </span>
            <span className="mk-mono mk-dim" style={{ fontSize: "var(--fs-1)" }}>
              SIGS 48,120
            </span>
          </div>
        </aside>

        <div className="mk-main">
          <div className="mk-stats">
            {STATS.map((s) => (
              <div className="mk-stat" key={s.l}>
                <span className="mk-stat-v">{s.v}</span>
                <span className="mk-stat-l">{s.l}</span>
                <Sparkline values={s.spark} />
              </div>
            ))}
          </div>

          <div className="mk-grid2">
            <section className="mk-panel">
              <div className="mk-panel-h">
                <span className="mk-panel-t">Threat map</span>
                <span className="mk-mono mk-mut" style={{ fontSize: "var(--fs-1)" }}>
                  GLOBAL · LIVE
                </span>
              </div>
              <div className="mk-panel-b">
                <Radar />
              </div>
            </section>

            <section className="mk-panel">
              <div className="mk-panel-h">
                <span className="mk-panel-t">Live alerts</span>
                <span className="mk-mono mk-mut" style={{ fontSize: "var(--fs-1)" }}>
                  <Activity size={10} style={{ display: "inline", verticalAlign: "-1px" }} /> 1,204
                </span>
              </div>
              <div className="mk-panel-b">
                <div className="mk-list">
                  {ALERTS.map((a) => (
                    <div className="mk-li" key={`${a.ip}-${a.t}`}>
                      <span
                        className={
                          a.sev === "CRIT"
                            ? "mk-chip is-solid"
                            : a.sev === "HIGH"
                              ? "mk-chip is-line"
                              : "mk-chip"
                        }
                      >
                        {a.sev}
                      </span>
                      <span className="mk-grow mk-mono mk-paper">{a.type}</span>
                      <span className="mk-mono mk-dim">{a.ip}</span>
                      <span className="mk-mono mk-mut">{a.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
