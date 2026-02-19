import Link from "next/link";
import { Article } from "@/lib/types";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="surface-card rounded-[32px] p-5 transition duration-300 hover:-translate-y-1">
      <div className="mb-4 h-40 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${article.coverImage})` }} />
      <p className="text-xs uppercase tracking-[0.16em] text-ink/60">
        {article.category} | {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <h3 className="mt-2 font-sans text-2xl leading-tight text-ink">{article.title}</h3>
      <p className="mt-2 text-sm text-ink-muted">{article.excerpt}</p>
      <p className="mt-4 text-xs text-ink/70">{article.readingTime}</p>
      <Link
        href={`/blog/${article.slug}`}
        className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.08em] text-sky transition hover:text-ink"
      >
        Read article
      </Link>
    </article>
  );
}

