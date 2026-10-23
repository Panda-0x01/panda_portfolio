import {
  Activity,
  Ban,
  Gauge,
  KeyRound,
  ShieldAlert,
  Webhook,
} from "lucide-react";
import { AreaChart, Dots, Meter, Pill } from "./primitives";

/**
 * BOING — illustrative API abuse-detection console.
 * Sample data only; endpoints are generic placeholders.
 */

const NAV = [
  { Icon: Gauge, label: "Traffic", on: true },
  { Icon: Activity, label: "Endpoints" },
  { Icon: ShieldAlert, label: "Abuse" },
  { Icon: Ban, label: "Blocks" },
  { Icon: KeyRound, label: "API keys" },
  { Icon: Webhook, label: "Webhooks" },
];

const STATS = [
  { v: "12.4K", l: "Requests / sec" },
  { v: "0.42%", l: "Error rate" },
  { v: "318", l: "Blocked today" },
  { v: "142ms", l: "p95 latency" },
];

const VOLUME = [
  18, 22, 20, 26, 24, 30, 28, 34, 31, 38, 36, 44, 40, 47, 43, 52, 49, 58, 54, 61,
  57, 66, 62, 70,
];

const ENDPOINTS = [
  { m: "GET", path: "/v1/auth/login", code: "200", share: 92 },
  { m: "POST", path: "/v1/auth/login", code: "429", share: 71 },
  { m: "GET", path: "/v1/users/:id", code: "200", share: 58 },
  { m: "POST", path: "/v1/orders", code: "401", share: 39 },
  { m: "GET", path: "/v1/search", code: "200", share: 26 },
];

export default function BoingUI() {
  return (
    <div className="mk" aria-hidden="true">
      <div className="mk-winbar">
        <Dots />
        <span className="mk-title">Boing</span>
        <span className="mk-sub">API Abuse Detection</span>
        <span className="mk-spacer" />
        <Pill live>WAF active</Pill>
      </div>

      <div className="mk-subbar">
        <span className="mk-search">Filter by endpoint, key, IP…</span>
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
        </aside>

        <div className="mk-main">
          <div className="mk-stats">
            {STATS.map((s) => (
              <div className="mk-stat" key={s.l}>
                <span className="mk-stat-v">{s.v}</span>
                <span className="mk-stat-l">{s.l}</span>
              </div>
            ))}
          </div>

          <div className="mk-grid2">
            <section className="mk-panel">
              <div className="mk-panel-h">
                <span className="mk-panel-t">Request volume · 24h</span>
                <span className="mk-mono mk-mut" style={{ fontSize: "var(--fs-1)" }}>
                  PEAK 12.4K/s
                </span>
              </div>
              <div className="mk-panel-b">
                <AreaChart values={VOLUME} />
              </div>
            </section>

            <section className="mk-panel">
              <div className="mk-panel-h">
                <span className="mk-panel-t">Top endpoints</span>
                <span className="mk-mono mk-mut" style={{ fontSize: "var(--fs-1)" }}>
                  SHARE
                </span>
              </div>
              <div className="mk-panel-b">
                <div className="mk-list">
                  {ENDPOINTS.map((e) => (
                    <div className="mk-li" key={`${e.m}-${e.path}`}>
                      <span className={e.m === "POST" ? "mk-chip is-line" : "mk-chip"}>
                        {e.m}
                      </span>
                      <span className="mk-grow mk-mono mk-paper">{e.path}</span>
                      <span
                        className={
                          e.code === "429"
                            ? "mk-chip is-solid"
                            : e.code === "401"
                              ? "mk-chip is-line"
                              : "mk-chip"
                        }
                      >
                        {e.code}
                      </span>
                      <span className="mk-meter-slot">
                        <Meter value={e.share} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="mk-foot">
        <span className="mk-mono mk-mut" style={{ fontSize: "var(--fs-1)" }}>
          STATUS CODES
        </span>
        <span className="mk-chip">2xx 96.1%</span>
        <span className="mk-chip">4xx 3.4%</span>
        <span className="mk-chip is-solid">429 0.5%</span>
        <span className="mk-spacer" />
        <span className="mk-mono mk-dim" style={{ fontSize: "var(--fs-1)" }}>
          3 REGIONS · 18 EDGES
        </span>
      </div>
    </div>
  );
}
