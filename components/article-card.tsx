import Link from "next/link";
import { Article } from "@/lib/types";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="rounded-2xl border border-ink/10 bg-white p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-ink/60">
        {article.category} • {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <h3 className="mt-2 font-serif text-xl text-ink">{article.title}</h3>
      <p className="mt-2 text-sm text-ink/80">{article.excerpt}</p>
      <p className="mt-4 text-xs text-ink/70">{article.readingTime}</p>
      <Link href={`/blog/${article.slug}`} className="mt-4 inline-block text-sm font-semibold text-rust">
        Read article
      </Link>
    </article>
  );
}
