import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/50 bg-white/30 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-12 md:grid-cols-2">
        <div>
          <p className="font-sans text-2xl tracking-tight text-ink">
            I&apos;m currently available for new work, let me know if you need a digital designer. I&apos;d love to
            talk about the next big thing!
          </p>
          <p className="mt-3 text-sm text-ink-muted">Email: amrishst@gmail.com</p>
        </div>
        <div className="text-sm md:text-right">
          <div className="space-x-4 uppercase tracking-[0.1em]">
            <Link href="/about" className="text-ink-muted hover:text-ink">
              About
            </Link>
            <Link href="/privacy" className="text-ink-muted hover:text-ink">
              Privacy
            </Link>
          </div>
          <p className="mt-3 text-ink-soft">LinkedIn / Dribbble / Behance</p>
        </div>
      </div>
    </footer>
  );
}

