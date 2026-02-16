import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amrish Tagadghar Portfolio",
    template: "%s | Amrish Tagadghar Portfolio"
  },
  description:
    "A curated collection of branding, motion, and editorial design crafted to connect, communicate, and leave a lasting impression.",
  openGraph: {
    title: "Amrish Tagadghar Portfolio",
    description:
      "A curated collection of branding, motion, and editorial design crafted to connect, communicate, and leave a lasting impression.",
    url: siteUrl,
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-ink">
        <div className="ambient-root" aria-hidden="true">
          <div className="blob blob-one" />
          <div className="blob blob-two" />
          <div className="blob blob-three" />
          <div className="blob blob-four" />
          <div className="ambient-grid" />
        </div>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
