import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-paper">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 md:grid-cols-2">
        <div>
          <p className="font-serif text-xl">Let&apos;s build something clear, bold, and effective.</p>
          <p className="mt-2 text-sm text-paper/80">Email: hello@balance.design</p>
        </div>
        <div className="text-sm md:text-right">
          <div className="space-x-4">
            <Link href="/about" className="text-paper/90 hover:text-white">
              About
            </Link>
            <Link href="/privacy" className="text-paper/90 hover:text-white">
              Privacy
            </Link>
          </div>
          <p className="mt-3 text-paper/60">LinkedIn / Dribbble / Behance</p>
        </div>
      </div>
    </footer>
  );
}
