import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 px-6 pb-10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 rounded-[48px] border border-white/60 bg-white/30 p-8 backdrop-blur-xl md:grid-cols-2 md:p-10">
        <div>
          <p className="max-w-xl text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl">
            Available for design partnerships that need speed, craft, and production-ready systems.
          </p>
          <p className="mt-4 text-sm text-ink-muted">Email: amrishst@gmail.com</p>
        </div>

        <div className="space-y-4 text-sm md:text-right">
          <div className="space-x-4 uppercase tracking-[0.1em] text-ink-soft">
            <Link href="/about" className="hover:text-ink">
              About
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
          </div>
          <p className="text-ink-muted">LinkedIn / Dribbble / Behance</p>
          <Link href="/contact" className="inline-block rounded-full border border-white/80 bg-white/55 px-4 py-2 font-semibold text-ink">
            Start a conversation
          </Link>
        </div>
      </div>
    </footer>
  );
}
