interface SketchStarProps {
  size?: number;
  rotate?: number;
  className?: string;
}

export function SketchArrow({ className = "text-sky-400 opacity-60" }: { className?: string }) {
  return (
    <svg width="48" height="28" viewBox="0 0 48 28" fill="none" className={className}>
      <path d="M2 14 C10 8, 22 18, 36 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 7 L38 13 L29 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SketchStar({ size = 20, rotate = 0, className = "text-sky-400" }: SketchStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M12 2 L13.5 9 L20 8 L15 13 L17 20 L12 16 L7 20 L9 13 L4 8 L10.5 9 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function SketchSpiral({ className = "text-sky-300 opacity-50" }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={className}>
      <path
        d="M16 16 C18 12, 22 11, 24 14 C26 17, 24 22, 20 23 C15 24, 10 21, 9 16 C8 10, 12 5, 18 5 C25 5, 30 10, 30 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SketchBracket({ className = "text-sky-300 opacity-40" }: { className?: string }) {
  return (
    <svg width="16" height="40" viewBox="0 0 16 40" fill="none" className={className}>
      <path
        d="M12 2 C6 2, 4 6, 4 12 L4 20 C4 23, 2 24, 2 24 C2 24, 4 25, 4 28 L4 30 C4 36, 6 38, 12 38"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SketchSquiggle({ className }: { className?: string }) {
  return (
    <svg width="120" height="10" viewBox="0 0 120 10" fill="none" className={className}>
      <path
        d="M2 7 C20 2, 40 9, 60 5 C80 1, 100 8, 118 4"
        stroke="#0ea5e9"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SketchCorner({ className = "opacity-20" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M2 2 L8 2 L2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

