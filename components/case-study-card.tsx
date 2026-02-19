import Link from "next/link";
import { CaseStudy } from "@/lib/types";

type CaseStudyCardProps = {
  study: CaseStudy;
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="surface-card group rounded-[32px] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-glass">
      <div
        className="mb-4 h-44 rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${study.thumbnail || study.coverImage})` }}
      />
      <p className="text-xs uppercase tracking-[0.16em] text-ink/60">{study.year}</p>
      <h3 className="mt-2 font-sans text-2xl leading-tight text-ink">{study.title}</h3>
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
        className="mt-5 inline-block text-sm font-semibold uppercase tracking-[0.08em] text-blush transition group-hover:translate-x-1 group-hover:text-ink"
      >
        Read case study
      </Link>
    </article>
  );
}

