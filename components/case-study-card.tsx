import Link from "next/link";
import { CaseStudy } from "@/lib/types";

type CaseStudyCardProps = {
  study: CaseStudy;
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="surface-card group rounded-[32px] p-4 transition duration-300 hover:-translate-y-1">
      <div
        className="relative mb-4 h-48 overflow-hidden rounded-[24px] bg-cover bg-center"
        style={{ backgroundImage: `url(${study.thumbnail || study.coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <p className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/45 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
          {study.year}
        </p>
      </div>

      <h3 className="text-2xl font-bold leading-tight tracking-tight text-ink">{study.title}</h3>
      <p className="mt-2 text-sm text-ink-muted">{study.excerpt}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {study.disciplines.map((discipline) => (
          <span key={discipline} className="rounded-full border border-white/60 bg-white/35 px-3 py-1 text-xs text-ink-muted">
            {discipline}
          </span>
        ))}
      </div>

      <Link
        href={`/case-studies/${study.slug}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.08em] text-ink transition group-hover:gap-2"
      >
        Read case study
      </Link>
    </article>
  );
}
