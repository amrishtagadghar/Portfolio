import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 px-4 pt-4 md:px-6">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border border-white/60 bg-white/35 px-5 py-3 backdrop-blur-2xl">
        <Link href="/" className="text-base font-semibold tracking-tight text-ink md:text-lg">
          Amrish Tagadghar
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-transparent px-3 py-1.5 text-sm font-medium text-ink-muted transition hover:border-white/80 hover:bg-white/45 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="rounded-full border border-white/80 bg-white/55 px-4 py-1.5 text-sm font-semibold text-ink">
          Let&apos;s talk
        </Link>
      </div>
    </header>
  );
}
