import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { getArticleCategoryOptions, getArticlesData } from "@/lib/cms";

type BlogPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const articles = await getArticlesData();
  const articleCategories = getArticleCategoryOptions();
  const params = await searchParams;
  const selectedCategory = params.category;

  const filtered = articles
    .filter((article) => (selectedCategory ? article.category === selectedCategory : true))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="page-shell space-y-12">
      <section className="glass-panel rounded-[48px] p-8 md:p-10">
        <span className="section-kicker">Blog</span>
        <h1 className="section-title mt-3">Notes on craft and systems</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">Writing on brand systems, visual craft, and practical design process.</p>
      </section>

      <section className="surface-card rounded-[32px] p-6">
        <div className="flex flex-wrap gap-2">
          <Link href="/blog" className="rounded-full border border-white/70 bg-white/35 px-3 py-1 text-sm">
            All
          </Link>
          {articleCategories.map((category) => (
            <Link
              key={category}
              href={`/blog?category=${encodeURIComponent(category)}`}
              className="rounded-full border border-white/70 bg-white/35 px-3 py-1 text-sm"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="stagger-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </section>
    </div>
  );
}
