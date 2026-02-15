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
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight text-ink">
          Balance Portfolio
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink/80 transition hover:text-rust">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
