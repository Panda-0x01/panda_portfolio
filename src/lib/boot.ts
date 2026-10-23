/**
 * Tiny boot gate.
 *
 * The loader calls `markBooted()` the moment its curtain starts to lift.
 * Anything that should wait for that moment (e.g. the hero entrance) subscribes
 * with `whenBooted`. A safety timeout guarantees the page is never left gated
 * if the loader fails for any reason.
 */

/** Fallback: never hold the page hostage for longer than this. */
const SAFETY_MS = 6000;

let booted = false;
let safetyId: number | undefined;
const subscribers = new Set<() => void>();

function flush(): void {
  if (booted) return;
  booted = true;
  if (safetyId !== undefined) {
    window.clearTimeout(safetyId);
    safetyId = undefined;
  }
  const pending = [...subscribers];
  subscribers.clear();
  pending.forEach((cb) => cb());
}

/** Called by the loader when the first-load curtain begins to lift. */
export function markBooted(): void {
  flush();
}

export function isBooted(): boolean {
  return booted;
}

/** Runs `cb` immediately if already booted, otherwise as soon as the app boots. */
export function whenBooted(cb: () => void): () => void {
  if (booted) {
    cb();
    return () => {};
  }
  subscribers.add(cb);
  if (safetyId === undefined) {
    safetyId = window.setTimeout(flush, SAFETY_MS);
  }
  return () => {
    subscribers.delete(cb);
  };
}
