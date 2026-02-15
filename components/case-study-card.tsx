import Link from "next/link";
import { CaseStudy } from "@/lib/types";

type CaseStudyCardProps = {
  study: CaseStudy;
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="glass-panel group rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,18,38,0.14)]">
      <div className="mb-4 h-44 rounded-2xl bg-gradient-to-br from-[#ffd0d9] via-[#d6e6ff] to-[#cfefd8]" />
      <p className="text-xs uppercase tracking-[0.16em] text-ink/60">{study.year}</p>
      <h3 className="mt-2 font-serif text-2xl leading-tight text-ink">{study.title}</h3>
      <p className="mt-2 text-sm text-ink/80">{study.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {study.disciplines.map((discipline) => (
          <span key={discipline} className="rounded-full border border-ink/20 bg-white/50 px-3 py-1 text-xs text-ink/75">
            {discipline}
          </span>
        ))}
      </div>
      <Link
        href={`/case-studies/${study.slug}`}
        className="mt-5 inline-block text-sm font-semibold uppercase tracking-[0.08em] text-[#b73354] transition group-hover:translate-x-1"
      >
        Read case study
      </Link>
    </article>
  );
}
