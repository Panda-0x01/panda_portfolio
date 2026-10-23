import { Plus, Wrench } from "lucide-react";
import { Dots, Pill } from "./primitives";

/**
 * ZENO — illustrative local-first AI desktop assistant.
 * Everything runs "on device"; the conversation is sample content.
 */

const SESSIONS = [
  { title: "Packet capture triage", t: "09:41", on: true },
  { title: "Explain TLS handshake", t: "08:12" },
  { title: "Refactor auth flow", t: "yesterday" },
  { title: "Draft incident report", t: "mon" },
  { title: "Summarise CVE-2024-…", t: "mon" },
];

const SESSION_KV = [
  { k: "Model", v: "llama-3.1-8b" },
  { k: "Context", v: "8,192" },
  { k: "Temp", v: "0.20" },
  { k: "Device", v: "local · gpu" },
];

const TOOLS = [
  { name: "file_read", n: 12, code: "ok" },
  { name: "shell", n: 5, code: "ok" },
  { name: "http_get", n: 3, code: "403" },
  { name: "index_search", n: 8, code: "ok" },
];

export default function ZenoUI() {
  return (
    <div className="mk" aria-hidden="true">
      <div className="mk-winbar">
        <Dots />
        <span className="mk-title">Zeno</span>
        <span className="mk-sub">Local-first AI assistant</span>
        <span className="mk-spacer" />
        <Pill live>On device</Pill>
      </div>

      <div className="mk-body">
        <aside className="mk-side">
          <div className="mk-section" style={{ paddingBottom: 0 }}>
            <span className="mk-btn is-ghost" style={{ display: "inline-flex", gap: "calc(var(--u) * 1)" }}>
              <Plus size={10} style={{ alignSelf: "center" }} /> New session
            </span>
          </div>
          <div className="mk-section">Recent</div>
          <div className="mk-list">
            {SESSIONS.map((s) => (
              <div
                className="mk-session"
                key={s.title}
                style={s.on ? { background: "var(--paper)", color: "var(--ink)" } : undefined}
              >
                <span className="mk-grow">{s.title}</span>
                <span className="mk-mono" style={{ fontSize: "var(--fs-1)", opacity: 0.7 }}>
                  {s.t}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <div className="mk-main is-flush">
          <div className="mk-chat">
            <div className="mk-msg is-user">
              <span className="mk-role">You</span>
              <p>Summarise today&apos;s packet capture and flag anything unusual.</p>
            </div>

            <div className="mk-msg">
              <span className="mk-role">Zeno</span>
              <p>Scanning <span className="mk-mono">eth0</span> — 12,480 packets over 24h.</p>
              <div className="mk-tool">
                <span className="mk-tool-h">
                  <Wrench size={9} /> tool · run_shell
                </span>
                <span className="mk-tool-b">{`$ neonet scan --iface eth0 --window 24h
→ 12,480 packets parsed · 3 anomalies`}</span>
              </div>
              <p>
                Top talker <span className="mk-mono">198.51.100.7 → 203.0.113.42:443</span>. Three
                outbound bursts at 02:15.
                <span className="mk-caret" />
              </p>
            </div>
          </div>

          <div className="mk-composer">
            <span className="mk-input">Ask Zeno…</span>
            <Pill>llama-3.1-8b</Pill>
            <span className="mk-btn">Run</span>
          </div>
        </div>

        <aside className="mk-rail">
          <div className="mk-section">Session</div>
          <dl style={{ margin: 0 }}>
            {SESSION_KV.map((row) => (
              <div className="mk-kv" key={row.k}>
                <dt>{row.k}</dt>
                <dd>{row.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mk-section">Tools</div>
          <div className="mk-list">
            {TOOLS.map((t) => (
              <div className="mk-li" key={t.name}>
                <span className="mk-grow mk-mono mk-paper">{t.name}</span>
                <span className="mk-mono mk-mut">×{t.n}</span>
                <span className={t.code === "ok" ? "mk-chip" : "mk-chip is-solid"}>
                  {t.code}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
