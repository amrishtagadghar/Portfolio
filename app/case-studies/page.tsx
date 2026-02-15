import Link from "next/link";
import { CaseStudyCard } from "@/components/case-study-card";
import { caseStudies, disciplines } from "@/lib/content";
import { Discipline } from "@/lib/types";

type CaseStudiesPageProps = {
  searchParams: Promise<{
    discipline?: string;
    year?: string;
    sort?: "featured" | "newest";
  }>;
};

export default async function CaseStudiesPage({ searchParams }: CaseStudiesPageProps) {
  const params = await searchParams;
  const selectedDiscipline = disciplines.includes(params.discipline as Discipline)
    ? (params.discipline as Discipline)
    : undefined;
  const selectedYear = params.year;
  const sort = params.sort ?? "featured";

  let filtered = caseStudies.filter((item) => {
    const matchesDiscipline = selectedDiscipline ? item.disciplines.includes(selectedDiscipline) : true;
    const matchesYear = selectedYear ? item.year.toString() === selectedYear : true;
    return matchesDiscipline && matchesYear;
  });

  filtered = filtered.sort((a, b) => {
    if (sort === "newest") {
      return b.year - a.year;
    }
    return Number(b.featured) - Number(a.featured) || b.year - a.year;
  });

  const years = Array.from(new Set(caseStudies.map((item) => item.year))).sort((a, b) => b - a);

  return (
    <div className="page-shell space-y-10">
      <section>
        <h1 className="section-title">Case Studies</h1>
        <p className="mt-3 max-w-2xl text-ink/80">
          Browse work by discipline, year, and outcomes. Each story highlights context, decisions, and measurable
          impact.
        </p>
      </section>

      <section className="rounded-2xl border border-ink/10 bg-white p-6">
        <div className="flex flex-wrap gap-2">
          <Link href="/case-studies" className="rounded-full border border-ink/20 px-3 py-1 text-sm">
            All
          </Link>
          {disciplines.map((discipline) => (
            <Link
              key={discipline}
              href={`/case-studies?discipline=${encodeURIComponent(discipline)}`}
              className="rounded-full border border-ink/20 px-3 py-1 text-sm"
            >
              {discipline}
            </Link>
          ))}
          {years.map((year) => (
            <Link key={year} href={`/case-studies?year=${year}`} className="rounded-full border border-ink/20 px-3 py-1 text-sm">
              {year}
            </Link>
          ))}
          <Link href="/case-studies?sort=featured" className="rounded-full border border-ink/20 px-3 py-1 text-sm">
            Featured
          </Link>
          <Link href="/case-studies?sort=newest" className="rounded-full border border-ink/20 px-3 py-1 text-sm">
            Newest
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </section>

      <section className="rounded-2xl border border-rust/40 bg-rust/10 p-8">
        <h2 className="font-serif text-2xl text-ink">Want results like this?</h2>
        <p className="mt-2 text-ink/80">Share your goal and timeline. I&apos;ll reply with a practical plan.</p>
        <Link href="/contact" className="mt-4 inline-block rounded-full bg-rust px-5 py-2 text-sm font-semibold text-white">
          Contact
        </Link>
      </section>
    </div>
  );
}
