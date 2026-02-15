import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell space-y-4 text-center">
      <h1 className="font-serif text-5xl">404</h1>
      <p className="text-ink/80">The page you requested does not exist.</p>
      <Link href="/" className="inline-block rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper">
        Back home
      </Link>
    </div>
  );
}
