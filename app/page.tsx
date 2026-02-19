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
    <div className="page-shell space-y-20">
      <section className="hero-shell">
        <div className="hero-grid-lines" />
        <div className="hero-corner" />

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="section-kicker">Modern Pastel Glass</span>
            <h1>Modern brand design, made practical</h1>
            <p>
              I build brand and marketing experiences that stay consistent across teams, channels, and timelines,
              with systems that are easy to scale in real production.
            </p>
            <div className="hero-actions">
              <Link href="#featured-work" className="hero-button">
                View featured work
              </Link>
              <Link href="/contact" className="hero-button secondary">
                Start a project
              </Link>
            </div>
          </div>

          <aside className="hero-visual surface-card">
            <div className="hero-glow" aria-hidden="true" />
            <div className="hero-stack stagger-grid">
              <article className="hero-stack-card glass-panel">
                <h3>Focus</h3>
                <p>Design systems that scale fast across content and campaign teams.</p>
              </article>
              <article className="hero-stack-card glass-panel">
                <h3>Approach</h3>
                <p>Clear hierarchy, rounded confidence, and lightweight depth for readability.</p>
              </article>
              <article className="hero-stack-card glass-panel">
                <h3>Outcome</h3>
                <p>Faster production cycles with stronger consistency and less handoff friction.</p>
              </article>
            </div>
          </aside>
        </div>

        <Link href="#featured-work" className="hero-arrow" aria-label="Scroll to featured work">
          <span>&darr;</span>
        </Link>
      </section>

      <section id="featured-work" className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-kicker">Case Studies</span>
            <h2 className="section-title mt-3">Featured work</h2>
          </div>
          <Link href="/case-studies" className="hero-button">
            Browse all
          </Link>
        </div>
        <div className="stagger-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCaseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="glass-panel rounded-[48px] p-8">
          <span className="section-kicker">Capabilities</span>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight">Systems-first design support</h2>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {[
              "Brand and visual design",
              "Editorial and impact reports",
              "Social campaigns and videos",
              "Cross-functional collaboration",
              "Project and client communication",
              "Design leadership"
            ].map((item) => (
              <span key={item} className="rounded-full border border-white/60 bg-white/35 px-4 py-2 text-ink-muted">
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="glass-panel rounded-[48px] p-8">
          <span className="section-kicker">Proof</span>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight">Measured outcomes, not only visuals</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="surface-card rounded-[20px] p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-ink/60">Industries</p>
              <p className="mt-2 text-sm text-ink-muted">Finance, Asset Management, Technology</p>
            </div>
            <div className="surface-card rounded-[20px] p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-ink/60">Efficiency</p>
              <p className="mt-2 text-sm text-ink-muted">40% production-time reduction on campaign systems</p>
            </div>
            <div className="surface-card rounded-[20px] p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-ink/60">Availability</p>
              <p className="mt-2 text-sm text-ink-muted">Open for new projects in 2026</p>
            </div>
          </div>
        </article>
      </section>

      <section className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-kicker">Writing</span>
            <h2 className="section-title mt-3">Latest insights</h2>
          </div>
          <Link href="/blog" className="hero-button secondary">
            View all posts
          </Link>
        </div>
        <div className="stagger-grid grid gap-6 md:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
