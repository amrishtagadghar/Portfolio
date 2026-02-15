import Link from "next/link";
import { CaseStudy } from "@/lib/types";

type CaseStudyCardProps = {
  study: CaseStudy;
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="group rounded-2xl border border-ink/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 h-44 rounded-xl bg-gradient-to-br from-sand to-paper" />
      <p className="text-xs uppercase tracking-[0.16em] text-ink/60">{study.year}</p>
      <h3 className="mt-2 font-serif text-xl text-ink">{study.title}</h3>
      <p className="mt-2 text-sm text-ink/80">{study.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {study.disciplines.map((discipline) => (
          <span key={discipline} className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/70">
            {discipline}
          </span>
        ))}
      </div>
      <Link
        href={`/case-studies/${study.slug}`}
        className="mt-5 inline-block text-sm font-semibold text-rust transition group-hover:translate-x-1"
      >
        Read case study
      </Link>
    </article>
  );
}
