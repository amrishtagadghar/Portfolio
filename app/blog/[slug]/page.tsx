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
      <article className="rounded-2xl border border-ink/10 bg-white p-8">
        <p className="text-xs uppercase tracking-[0.14em] text-ink/60">
          {article.category} • {new Date(article.publishedAt).toLocaleDateString()} • {article.readingTime}
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight">{article.title}</h1>
        <p className="mt-4 max-w-3xl text-ink/80">{article.excerpt}</p>
        <div className="mt-6 h-[300px] w-full rounded-2xl bg-cover bg-center md:h-[420px]" style={{ backgroundImage: `url(${article.coverImage})` }} />
        <div className="mt-8 space-y-5 text-ink/90">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-serif text-2xl">Related posts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="rounded-xl border border-ink/10 bg-white p-4 text-sm hover:border-rust"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-ink/70">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-rust/40 bg-rust/10 p-6">
        <p className="text-ink/80">Like this approach to design?</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/case-studies" className="rounded-full bg-rust px-4 py-2 text-sm font-semibold text-white">
            View case studies
          </Link>
          <Link href="/contact" className="rounded-full border border-rust px-4 py-2 text-sm font-semibold text-rust">
            Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
