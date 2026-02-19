import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/50 bg-white/35 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-sans text-lg font-semibold tracking-tight text-ink md:text-xl">
          Amrish Tagadghar
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.12em] md:gap-4 md:text-sm md:normal-case md:tracking-normal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-transparent px-3 py-1 text-ink-muted transition hover:border-white/70 hover:bg-white/35 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

