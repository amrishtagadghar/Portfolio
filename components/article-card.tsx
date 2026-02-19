import Link from "next/link";
import { Article } from "@/lib/types";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="surface-card rounded-[32px] p-4 transition duration-300 hover:-translate-y-1">
      <div
        className="mb-4 h-44 overflow-hidden rounded-[24px] bg-cover bg-center"
        style={{ backgroundImage: `url(${article.coverImage})` }}
      />
      <p className="text-xs uppercase tracking-[0.16em] text-ink/60">
        {article.category} | {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-ink">{article.title}</h3>
      <p className="mt-2 text-sm text-ink-muted">{article.excerpt}</p>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-ink-soft">{article.readingTime}</p>
        <Link href={`/blog/${article.slug}`} className="text-sm font-semibold uppercase tracking-[0.08em] text-ink">
          Read
        </Link>
      </div>
    </article>
  );
}
