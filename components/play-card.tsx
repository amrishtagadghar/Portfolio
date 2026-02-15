import Link from "next/link";
import { PlayItem } from "@/lib/types";

type PlayCardProps = {
  item: PlayItem;
};

export function PlayCard({ item }: PlayCardProps) {
  return (
    <article className="rounded-2xl border border-ink/10 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-ink px-3 py-1 text-xs text-paper">{item.status}</span>
        <time className="text-xs text-ink/70">{new Date(item.date).toLocaleDateString()}</time>
      </div>
      <h3 className="font-serif text-xl text-ink">{item.title}</h3>
      <p className="mt-2 text-sm text-ink/80">{item.shortDescription}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-ink/15 px-2 py-1 text-xs text-ink/70">
            {tag}
          </span>
        ))}
      </div>
      <Link href={`/play/${item.slug}`} className="mt-4 inline-block text-sm font-semibold text-rust">
        Open experiment
      </Link>
    </article>
  );
}
