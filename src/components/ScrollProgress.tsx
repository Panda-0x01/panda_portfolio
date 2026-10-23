import { useScrollProgress } from "../hooks/useScrollProgress";

/**
 * Minimal top-edge scroll indicator. Scales a hairline bar with progress and
 * exposes the value to assistive tech via a progressbar role.
 */
export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="h-full w-full origin-left bg-white will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
