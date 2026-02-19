import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlayItemData, getPlayItemsData } from "@/lib/cms";

type PlayDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const playItems = await getPlayItemsData();
  return playItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PlayDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPlayItemData(slug);
  if (!item) {
    return { title: "Play Item Not Found" };
  }
  return {
    title: item.title,
    description: item.shortDescription
  };
}

export default async function PlayDetailPage({ params }: PlayDetailPageProps) {
  const { slug } = await params;
  const item = await getPlayItemData(slug);
  if (!item) {
    notFound();
  }

  return (
    <div className="page-shell space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-ink/60">
          {item.status} {" | "} {new Date(item.date).toLocaleDateString()}
        </p>
        <h1 className="section-title">{item.title}</h1>
        <p className="max-w-2xl text-ink-muted">{item.shortDescription}</p>
      </header>

      <section className="surface-card rounded-[32px] p-6">
        <h2 className="font-sans text-2xl">Notes</h2>
        <div
          className="mt-4 h-[280px] w-full rounded-2xl bg-cover bg-center md:h-[400px]"
          style={{ backgroundImage: `url(${item.coverMedia})` }}
        />
        <div className="mt-4 space-y-3 text-ink-muted">
          {(item.content ?? ["Detailed write-up coming soon."]).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
