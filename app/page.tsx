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
      <section className="glass-panel relative overflow-hidden rounded-[2rem] p-8 md:p-12">
        <div className="absolute right-4 top-4 h-24 w-24 rounded-full bg-gradient-to-br from-[#ff7f96] to-[#f6bea8] opacity-45 blur-2xl" />
        <div className="absolute bottom-0 right-1/4 h-24 w-24 rounded-full bg-gradient-to-br from-[#5ca8ff] to-[#5dd3ad] opacity-45 blur-2xl" />
        <p className="hero-kicker">Amrish Tagadghar | London</p>
        <h1 className="hero-title mt-4 max-w-4xl font-serif">
          A curated collection of branding, motion, and editorial design.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink/80">
          Crafted to connect, communicate, and leave a lasting impression.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/case-studies"
            className="rounded-full bg-gradient-to-r from-[#18233f] to-[#2b2f58] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-paper transition hover:-translate-y-0.5"
          >
            View case studies
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-ink/25 bg-white/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition hover:-translate-y-0.5"
          >
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
