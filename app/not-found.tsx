import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell space-y-4 text-center">
      <h1 className="font-sans text-5xl">404</h1>
      <p className="text-ink-muted">The page you requested does not exist.</p>
      <Link href="/" className="inline-block rounded-full border border-white/70 bg-white/45 px-5 py-2 text-sm font-semibold text-ink">
        Back home
      </Link>
    </div>
  );
}

