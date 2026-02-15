import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Balance Portfolio",
    template: "%s | Balance Portfolio"
  },
  description: "Design portfolio focused on premium editorial storytelling and measurable outcomes.",
  openGraph: {
    title: "Balance Portfolio",
    description: "Design portfolio focused on premium editorial storytelling and measurable outcomes.",
    url: siteUrl,
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-ink">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
