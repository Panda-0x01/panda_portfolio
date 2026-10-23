import type { ReactNode } from "react";

/**
 * Small building blocks shared by the product mockups. All are purely
 * decorative (the whole mockup is wrapped in an aria-hidden container), so
 * none of them carry semantics or labels.
 */

/** macOS-style window buttons. */
export function Dots() {
  return (
    <span className="mk-dots" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

/** Bordered status pill with an optional pulsing LED. */
export function Pill({
  children,
  live = false,
  on = false,
}: {
  children: ReactNode;
  live?: boolean;
  on?: boolean;
}) {
  return (
    <span className={live || on ? "mk-pill is-on" : "mk-pill"}>
      {live && <span className="mk-led" />}
      {children}
    </span>
  );
}

/** Horizontal progress / distribution meter. */
export function Meter({ value }: { value: number }) {
  return (
    <span className="mk-meter" aria-hidden="true">
      <i style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </span>
  );
}

const linePath = (values: number[], w: number, h: number, pad: number) => {
  const n = values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const px = (i: number) => (i / (n - 1)) * w;
  const py = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
  const d = values
    .map((v, i) => `${i === 0 ? "M" : "L"}${px(i).toFixed(1)} ${py(v).toFixed(1)}`)
    .join(" ");
  return { d, px, py, last: values[n - 1] };
};

/** Tiny trend line for stat tiles. */
export function Sparkline({ values }: { values: number[] }) {
  const { d } = linePath(values, 100, 30, 2);
  return (
    <svg className="mk-spark" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Larger area chart with gridlines and an animated draw-in. */
export function AreaChart({ values }: { values: number[] }) {
  const w = 1000;
  const h = 300;
  const { d, px, py, last } = linePath(values, w, h, 14);
  return (
    <svg className="mk-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <g stroke="#1e1e1e" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="0" y1={(h / 4) * i} x2={w} y2={(h / 4) * i} />
        ))}
      </g>
      <path d={`${d} L${w} ${h} L0 ${h} Z`} fill="currentColor" opacity="0.06" />
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className="mk-draw"
      />
      <circle cx={px(values.length - 1)} cy={py(last)} r="4" fill="currentColor" />
    </svg>
  );
}


