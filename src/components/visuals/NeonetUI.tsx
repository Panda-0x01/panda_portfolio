import { Dots, Meter, Pill } from "./primitives";

/**
 * NEONET — illustrative Python network-analysis console (TUI styling).
 * Sample traffic only; hosts use TEST-NET ranges.
 */

const LINE = "#333333";
const PAPER = "#f5f5f5";

const TABS = ["Capture", "Topology", "Protocols", "Hosts"];

const IFACES = [
  { name: "eth0", n: "12,480", share: 92, on: true },
  { name: "wlan0", n: "318", share: 24 },
  { name: "lo", n: "52", share: 6 },
  { name: "tun0", n: "0", share: 1 },
];

const NODES: [number, number][] = [
  [200, 60],
  [90, 150],
  [310, 150],
  [200, 230],
  [60, 250],
  [340, 250],
];
const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [1, 4],
  [2, 5],
  [3, 4],
  [3, 5],
];

const PACKETS = [
  { t: "12:04:11", flow: "198.51.100.7 → 203.0.113.42", p: "TCP", len: "1420" },
  { t: "12:04:11", flow: "192.0.2.155 → 198.51.100.7", p: "TCP", len: "66" },
  { t: "12:04:12", flow: "203.0.113.9 → 192.0.2.71", p: "UDP", len: "512" },
  { t: "12:04:12", flow: "198.51.100.23 → 203.0.113.42", p: "DNS", len: "74" },
  { t: "12:04:13", flow: "192.0.2.71 → 198.51.100.7", p: "ICMP", len: "98" },
  { t: "12:04:13", flow: "203.0.113.42 → 198.51.100.23", p: "TCP", len: "1420" },
  { t: "12:04:14", flow: "198.51.100.7 → 192.0.2.155", p: "TCP", len: "120" },
];

const PROTO = [
  { name: "TCP", v: 62 },
  { name: "UDP", v: 24 },
  { name: "ICMP", v: 9 },
  { name: "DNS", v: 5 },
];

function Topology() {
  return (
    <svg className="mk-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g stroke={LINE} strokeWidth="1">
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            className="pv-flow"
          />
        ))}
      </g>
      <g>
        {NODES.map(([x, y], i) => (
          <g key={`${x}-${y}`} className="pv-node" style={{ animationDelay: `${i * 220}ms` }}>
            <circle cx={x} cy={y} r={i === 0 ? 9 : 6} fill={PAPER} />
            <circle cx={x} cy={y} r={i === 0 ? 18 : 13} fill="none" stroke={PAPER} opacity="0.25" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function NeonetUI() {
  return (
    <div className="mk" aria-hidden="true">
      <div className="mk-winbar">
        <Dots />
        <span className="mk-title">Neonet</span>
        <span className="mk-sub">Network analysis</span>
        <span className="mk-spacer" />
        <Pill on>eth0 · promisc</Pill>
      </div>

      <div className="mk-subbar">
        <div className="mk-tabs" style={{ alignSelf: "stretch" }}>
          {TABS.map((t, i) => (
            <span key={t} className={i === 0 ? "mk-tab is-on" : "mk-tab"}>
              {t}
            </span>
          ))}
        </div>
        <span className="mk-spacer" />
        <Pill live>Capturing</Pill>
      </div>

      <div className="mk-main is-flush" style={{ padding: "var(--gp)" }}>
        <div className="mk-grid3">
          <section className="mk-panel">
            <div className="mk-panel-h">
              <span className="mk-panel-t">Interfaces</span>
            </div>
            <div className="mk-panel-b">
              <div className="mk-list">
                {IFACES.map((f) => (
                  <div className="mk-iface" key={f.name}>
                    <div className="mk-iface-top">
                      <span className={f.on ? "mk-chip is-solid" : "mk-chip"}>{f.name}</span>
                      <span className="mk-mono mk-mut" style={{ fontSize: "var(--fs-1)" }}>
                        {f.n} pkts
                      </span>
                    </div>
                    <Meter value={f.share} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mk-panel">
            <div className="mk-panel-h">
              <span className="mk-panel-t">Topology</span>
              <span className="mk-mono mk-mut" style={{ fontSize: "var(--fs-1)" }}>
                6 HOSTS
              </span>
            </div>
            <div className="mk-panel-b">
              <Topology />
            </div>
          </section>

          <section className="mk-panel">
            <div className="mk-panel-h">
              <span className="mk-panel-t">Live packets</span>
              <span className="mk-mono mk-mut" style={{ fontSize: "var(--fs-1)" }}>
                TAIL -F
              </span>
            </div>
            <div className="mk-panel-b">
              <div className="mk-list">
                {PACKETS.map((p) => (
                  <div className="mk-li" key={`${p.t}-${p.flow}-${p.len}`}>
                    <span className="mk-mono mk-dim">{p.t}</span>
                    <span className="mk-grow mk-mono mk-paper">{p.flow}</span>
                    <span className="mk-chip">{p.p}</span>
                    <span className="mk-mono mk-mut">{p.len}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mk-foot">
        <span className="mk-mono mk-mut" style={{ fontSize: "var(--fs-1)" }}>
          PROTOCOL MIX
        </span>
        {PROTO.map((p) => (
          <span
            key={p.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "calc(var(--u) * 0.8)",
              minWidth: "calc(var(--u) * 16)",
            }}
          >
            <span className="mk-mono mk-dim" style={{ fontSize: "var(--fs-1)" }}>
              {p.name}
            </span>
            <Meter value={p.v * 1.6} />
            <span className="mk-mono mk-mut" style={{ fontSize: "var(--fs-1)" }}>
              {p.v}%
            </span>
          </span>
        ))}
        <span className="mk-spacer" />
        <span className="mk-mono mk-dim" style={{ fontSize: "var(--fs-1)" }}>
          12,480 PKTS · 0 DROPS
        </span>
      </div>
    </div>
  );
}
