import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center pt-14 md:pt-16">
      <p className="label text-muted-foreground mb-8">404</p>
      <h1 className="serif font-black leading-none mb-8" style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}>
        Not Found
      </h1>
      <p className="text-sm text-muted-foreground mb-12 max-w-xs">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="label text-muted-foreground hover:text-foreground transition-colors border-b border-border pb-0.5"
      >
        ← Back home
      </Link>
    </div>
  );
}
