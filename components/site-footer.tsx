import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-ink/20 bg-gradient-to-r from-[#131a31] via-[#191c37] to-[#1f1f3e] text-paper">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-12 md:grid-cols-2">
        <div>
          <p className="font-serif text-2xl tracking-tight">
            I&apos;m currently available for new work, let me know if you need a digital designer. I&apos;d love to
            talk about the next big thing!
          </p>
          <p className="mt-3 text-sm text-paper/80">Email: amrishst@gmail.com</p>
        </div>
        <div className="text-sm md:text-right">
          <div className="space-x-4 uppercase tracking-[0.1em]">
            <Link href="/about" className="text-paper/80 hover:text-white">
              About
            </Link>
            <Link href="/privacy" className="text-paper/80 hover:text-white">
              Privacy
            </Link>
          </div>
          <p className="mt-3 text-paper/60">LinkedIn / Dribbble / Behance</p>
        </div>
      </div>
    </footer>
  );
}
