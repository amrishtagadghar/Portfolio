import Link from "next/link";
import { PlayItem } from "@/lib/types";

type PlayCardProps = {
  item: PlayItem;
};

export function PlayCard({ item }: PlayCardProps) {
  return (
    <article className="surface-card rounded-[32px] p-4 transition duration-300 hover:-translate-y-1">
      <div
        className="mb-4 h-44 overflow-hidden rounded-[24px] bg-cover bg-center"
        style={{ backgroundImage: `url(${item.coverMedia})` }}
      />
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full border border-white/60 bg-white/40 px-3 py-1 text-xs uppercase tracking-[0.08em] text-ink">
          {item.status}
        </span>
        <time className="text-xs text-ink-soft">{new Date(item.date).toLocaleDateString()}</time>
      </div>
      <h3 className="text-2xl font-bold leading-tight tracking-tight text-ink">{item.title}</h3>
      <p className="mt-2 text-sm text-ink-muted">{item.shortDescription}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/60 bg-white/35 px-2 py-1 text-xs text-ink-muted">
            {tag}
          </span>
        ))}
      </div>
      <Link href={`/play/${item.slug}`} className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.08em] text-ink">
        Open experiment
      </Link>
    </article>
  );
}
