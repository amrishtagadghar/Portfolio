import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCaseStudiesData, getCaseStudyData } from "@/lib/cms";

type CaseStudyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const caseStudies = await getCaseStudiesData();
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyData(slug);
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
  const caseStudies = await getCaseStudiesData();
  const study = await getCaseStudyData(slug);
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
        <p className="max-w-3xl text-ink-muted">{study.excerpt}</p>
        <div
          className="h-[320px] w-full rounded-[48px] bg-cover bg-center md:h-[440px]"
          style={{ backgroundImage: `url(${study.coverImage})` }}
        />
        <div className="flex flex-wrap gap-2">
          {study.disciplines.map((discipline) => (
            <span key={discipline} className="rounded-full border border-white/70 bg-white/30 px-3 py-1 text-xs text-ink-muted">
              {discipline}
            </span>
          ))}
        </div>
      </header>

      <section className="surface-card grid gap-4 rounded-[32px] p-6 md:grid-cols-3">
        {study.metrics.map((metric) => (
          <div key={metric.label}>
            <p className="text-xs uppercase tracking-[0.12em] text-ink/60">{metric.label}</p>
            <p className="mt-2 font-sans text-3xl">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <article className="surface-card space-y-3 rounded-[32px] p-6">
          <h2 className="font-sans text-2xl">Problem</h2>
          <p className="text-ink-muted">{study.problem}</p>
        </article>
        <article className="surface-card space-y-3 rounded-[32px] p-6">
          <h2 className="font-sans text-2xl">Goals</h2>
          <ul className="list-disc space-y-2 pl-5 text-ink-muted">
            {study.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="surface-card rounded-[32px] p-6">
        <h2 className="font-sans text-2xl">Process</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
          {study.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <article className="surface-card rounded-[32px] p-6">
          <h2 className="font-sans text-2xl">Highlights</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
            {study.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="surface-card rounded-[32px] p-6">
          <h2 className="font-sans text-2xl">Deliverables</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
            {study.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <article className="surface-card rounded-[32px] p-6">
          <h2 className="font-sans text-2xl">Results</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
            {study.results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="surface-card rounded-[32px] p-6">
          <h2 className="font-sans text-2xl">Learnings</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
            {study.learnings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      {study.galleryImages && study.galleryImages.length > 0 && (
        <section className="grid gap-6 md:grid-cols-2">
          {study.galleryImages.map((image) => (
            <div
              key={image}
              className="h-[260px] w-full rounded-[32px] border border-white/60 bg-cover bg-center md:h-[360px]"
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </section>
      )}

      <section className="glass-panel rounded-[48px] p-8">
        <p className="text-sm uppercase tracking-[0.14em] text-ink-soft">Next case study</p>
        <h2 className="mt-2 font-sans text-2xl">{nextStudy.title}</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/case-studies/${nextStudy.slug}`}
            className="rounded-full border border-white/70 bg-white/45 px-5 py-2 text-sm font-semibold text-ink"
          >
            Continue
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/70 bg-white/30 px-5 py-2 text-sm font-semibold text-ink"
          >
            Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
