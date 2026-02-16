import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { CaseStudyCard } from "@/components/case-study-card";
import { getArticlesData, getCaseStudiesData } from "@/lib/cms";

export default async function HomePage() {
  const caseStudies = await getCaseStudiesData();
  const articles = await getArticlesData();
  const featuredCaseStudies = caseStudies.filter((item) => item.featured).slice(0, 6);
  const latestArticles = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <div className="page-shell space-y-16">
      <section className="reference-hero">
        <div className="reference-grid" />
        <div className="reference-layer reference-layer-top" />
        <div className="reference-layer reference-layer-bottom" />
        <div className="reference-copy">
          <h1 className="reference-title">This is the best header of portfolio</h1>
          <p className="reference-subtitle">I am a Creative Designer based in London</p>
        </div>
        <Link href="#featured-work" className="reference-arrow" aria-label="Scroll to featured work">
          <span>↓</span>
        </Link>
      </section>

      <section id="featured-work" className="space-y-6">
        <h2 className="section-title">Featured case studies</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCaseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="glass-panel space-y-6 rounded-3xl p-8">
        <h2 className="section-title">Capabilities</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {[
            "Brand and visual design",
            "Editorial and impact reports",
            "Social campaigns and videos",
            "Cross-functional collaboration",
            "Project and client communication",
            "Design leadership"
          ].map((item) => (
            <span key={item} className="rounded-full border border-ink/20 bg-white/45 px-4 py-2">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="glass-panel space-y-6 rounded-3xl p-8">
        <h2 className="section-title">Proof</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="surface-card rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-ink/60">Industries</p>
            <p className="mt-2 text-sm text-ink/80">Finance, Asset Management, Technology</p>
          </article>
          <article className="surface-card rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-ink/60">Outcomes</p>
            <p className="mt-2 text-sm text-ink/80">40% production-time reduction on large campaign systems</p>
          </article>
          <article className="surface-card rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-ink/60">Testimonials</p>
            <p className="mt-2 text-sm text-ink/80">
              Available for new work. Let&apos;s talk about the next big thing.
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
