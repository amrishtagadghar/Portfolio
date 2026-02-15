import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { CaseStudyCard } from "@/components/case-study-card";
import { articles, caseStudies } from "@/lib/content";

export default function HomePage() {
  const featuredCaseStudies = caseStudies.filter((item) => item.featured).slice(0, 3);
  const latestArticles = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <div className="page-shell space-y-16">
      <section className="rounded-3xl border border-ink/10 bg-white/80 p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.16em] text-ink/70">Open to full-time and freelance</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight md:text-6xl">
          Design that turns complex stories into clear, high-impact visuals.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/80">
          Brand systems, investor communications, and digital assets built for clarity, consistency, and speed.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/case-studies" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper">
            View case studies
          </Link>
          <Link href="/contact" className="rounded-full border border-ink/25 px-6 py-3 text-sm font-semibold">
            Contact
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="section-title">Featured case studies</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCaseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-ink/10 bg-white p-8">
        <h2 className="section-title">Capabilities</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {[
            "Brand systems",
            "Campaign key visuals",
            "Presentation design",
            "Editorial layouts",
            "Web landing pages",
            "Motion and micro-interactions"
          ].map((item) => (
            <span key={item} className="rounded-full border border-ink/15 px-4 py-2">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-ink/10 bg-white p-8">
        <h2 className="section-title">Proof</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-ink/10 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-ink/60">Industries</p>
            <p className="mt-2 text-sm text-ink/80">SaaS, Fintech, Healthcare, B2B Services</p>
          </article>
          <article className="rounded-xl border border-ink/10 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-ink/60">Outcomes</p>
            <p className="mt-2 text-sm text-ink/80">Faster launches, clearer narratives, stronger design governance</p>
          </article>
          <article className="rounded-xl border border-ink/10 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-ink/60">Testimonials</p>
            <p className="mt-2 text-sm text-ink/80">
              &quot;Clear thinking, premium execution, and consistently reliable delivery.&quot;
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="section-title">Latest writing</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
