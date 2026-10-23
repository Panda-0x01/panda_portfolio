import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Desktop-only bespoke cursor.
 *
 * A small white dot that trails the pointer via gsap.quickTo. It grows over
 * links and expands into a "VIEW ↗" disc over project media. Completely
 * disabled on touch devices and for reduced-motion users, where the native
 * pointer is left untouched.
 */
export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    if (!fine || reducedMotion) return;

    const root = rootRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!root || !dot || !label) return;

    const html = document.documentElement;
    html.classList.add("has-custom-cursor");

    const xTo = gsap.quickTo(root, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(root, "y", { duration: 0.4, ease: "power3" });

    let visible = false;

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to(root, { autoAlpha: 1, duration: 0.25 });
    };
    const hide = () => {
      visible = false;
      gsap.to(root, { autoAlpha: 0, duration: 0.2 });
    };

    const onMove = (e: PointerEvent) => {
      show();
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const setState = (state: "default" | "link" | "view") => {
      if (state === "view") {
        gsap.to(dot, { scale: 8.5, duration: 0.45, ease: "power3.out" });
        gsap.to(label, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
        return;
      }
      gsap.to(dot, {
        scale: state === "link" ? 2.4 : 1,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(label, { autoAlpha: 0, duration: 0.2 });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const view = target.closest('[data-cursor="view"]');
      if (view) return setState("view");
      const link = target.closest('a, button, [data-cursor="link"]');
      if (link) return setState("link");
      setState("default");
    };

    const onDown = () => gsap.to(dot, { scale: 0.75, duration: 0.2 });
    const onUp = (e: MouseEvent) => onOver(e);
    const onLeave = () => hide();
    const onEnter = () => show();

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      html.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      gsap.killTweensOf([root, dot, label]);
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden="true" style={{ opacity: 0 }}>
      <div ref={dotRef} className="cursor-dot" />
      <span ref={labelRef} className="cursor-label">
        VIEW ↗
      </span>
    </div>
  );
}
