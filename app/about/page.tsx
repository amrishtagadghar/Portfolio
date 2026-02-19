export default function AboutPage() {
  return (
    <div className="page-shell space-y-12">
      <section className="glass-panel rounded-[48px] p-8 md:p-10">
        <span className="section-kicker">About</span>
        <h1 className="section-title mt-3">Design leadership with production depth</h1>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="surface-card rounded-[32px] p-6 text-ink-muted">
          <p>
            I&apos;m Amrish a.k.a Tashya, a graphic designer with over 7 years of experience transforming complex ideas
            into clear, impactful visuals. My work spans branding, editorial, motion, and digital campaigns.
          </p>
        </article>
        <article className="surface-card rounded-[32px] p-6 text-ink-muted">
          <p>
            I lead multidisciplinary teams and guide projects from concept through execution, building systems that
            stay consistent across channels and timelines.
          </p>
        </article>
      </section>
    </div>
  );
}
