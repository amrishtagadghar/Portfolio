import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/lib/content";

type CaseStudyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    return { title: "Case Study Not Found" };
  }
  return {
    title: study.title,
    description: study.excerpt
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    notFound();
  }

  const currentIndex = caseStudies.findIndex((item) => item.slug === study.slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <div className="page-shell space-y-12">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.16em] text-ink/60">{study.year}</p>
        <h1 className="section-title">{study.title}</h1>
        <p className="max-w-3xl text-ink/80">{study.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {study.disciplines.map((discipline) => (
            <span key={discipline} className="rounded-full border border-ink/20 px-3 py-1 text-xs">
              {discipline}
            </span>
          ))}
        </div>
      </header>

      <section className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 md:grid-cols-3">
        {study.metrics.map((metric) => (
          <div key={metric.label}>
            <p className="text-xs uppercase tracking-[0.12em] text-ink/60">{metric.label}</p>
            <p className="mt-2 font-serif text-3xl">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <article className="space-y-3 rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-serif text-2xl">Problem</h2>
          <p className="text-ink/80">{study.problem}</p>
        </article>
        <article className="space-y-3 rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-serif text-2xl">Goals</h2>
          <ul className="list-disc space-y-2 pl-5 text-ink/80">
            {study.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="font-serif text-2xl">Process</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/80">
          {study.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <article className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-serif text-2xl">Highlights</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/80">
            {study.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-serif text-2xl">Deliverables</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/80">
            {study.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <article className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-serif text-2xl">Results</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/80">
            {study.results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-serif text-2xl">Learnings</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/80">
            {study.learnings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-rust/40 bg-rust/10 p-8">
        <p className="text-sm uppercase tracking-[0.14em] text-rust">Next case study</p>
        <h2 className="mt-2 font-serif text-2xl">{nextStudy.title}</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={`/case-studies/${nextStudy.slug}`} className="rounded-full bg-rust px-5 py-2 text-sm font-semibold text-white">
            Continue
          </Link>
          <Link href="/contact" className="rounded-full border border-rust px-5 py-2 text-sm font-semibold text-rust">
            Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
