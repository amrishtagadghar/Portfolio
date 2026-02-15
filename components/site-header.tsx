import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/play", label: "Play" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight text-ink md:text-xl">
          Balance Portfolio
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.12em] md:gap-4 md:text-sm md:normal-case md:tracking-normal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-transparent px-3 py-1 text-ink/80 transition hover:border-ink/20 hover:bg-white/60 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
