import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleData, getArticlesData } from "@/lib/cms";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getArticlesData();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleData(slug);
  if (!article) {
    return { title: "Article Not Found" };
  }
  return {
    title: article.title,
    description: article.excerpt
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const articles = await getArticlesData();
  const article = await getArticleData(slug);
  if (!article) {
    notFound();
  }

  const related = articles
    .filter((item) => item.slug !== article.slug && item.tags.some((tag) => article.tags.includes(tag)))
    .slice(0, 2);

  return (
    <div className="page-shell space-y-10">
      <article className="surface-card rounded-[32px] p-8">
        <p className="text-xs uppercase tracking-[0.14em] text-ink/60">
          {article.category} {" | "} {new Date(article.publishedAt).toLocaleDateString()} {" | "} {article.readingTime}
        </p>
        <h1 className="mt-4 font-sans text-4xl tracking-tight">{article.title}</h1>
        <p className="mt-4 max-w-3xl text-ink-muted">{article.excerpt}</p>
        <div
          className="mt-6 h-[300px] w-full rounded-2xl bg-cover bg-center md:h-[420px]"
          style={{ backgroundImage: `url(${article.coverImage})` }}
        />
        <div className="mt-8 space-y-5 text-ink-muted">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-sans text-2xl">Related posts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="surface-card rounded-[20px] p-4 text-sm">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-ink-soft">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="glass-panel rounded-[48px] p-6">
        <p className="text-ink-muted">Like this approach to design?</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link
            href="/case-studies"
            className="rounded-full border border-white/70 bg-white/45 px-4 py-2 text-sm font-semibold text-ink"
          >
            View case studies
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/70 bg-white/30 px-4 py-2 text-sm font-semibold text-ink"
          >
            Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
