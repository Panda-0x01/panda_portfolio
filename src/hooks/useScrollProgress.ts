import { useEffect, useRef, useState } from "react";

/**
 * Returns normalized page scroll progress in the range [0, 1].
 *
 * Uses a single rAF-throttled scroll listener (passive) and only commits a
 * state update when the value actually changes enough to matter, so it won't
 * cause a re-render storm during scrolling.
 */
export function useScrollProgress(precision = 0.002): number {
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);
  const last = useRef(0);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (Math.abs(value - last.current) >= precision || value === 0 || value === 1) {
        last.current = value;
        setProgress(value);
      }
    };

    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        compute();
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [precision]);

  return progress;
}
