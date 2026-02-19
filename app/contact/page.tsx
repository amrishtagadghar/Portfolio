export default function ContactPage() {
  return (
    <div className="page-shell space-y-12">
      <section className="glass-panel rounded-[48px] p-8 md:p-10">
        <span className="section-kicker">Contact</span>
        <h1 className="section-title mt-3">Let&apos;s build something clear and ambitious</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          If you prefer not to fill out forms, email directly and we can talk through scope, timeline, and next steps.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <article className="surface-card rounded-[32px] p-6">
          <h2 className="text-2xl font-bold">Direct links</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li>Email: amrishst@gmail.com</li>
            <li>LinkedIn: linkedin.com/in/amrish-tagadghar</li>
            <li>Dribbble and Behance profiles available</li>
          </ul>
        </article>

        <form action="/api/contact" method="post" className="surface-card space-y-4 rounded-[32px] p-6">
          <h2 className="text-2xl font-bold">Contact form</h2>
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <label className="block">
            <span className="mb-1 block text-sm">Name</span>
            <input
              name="name"
              required
              className="w-full rounded-xl border border-white/70 bg-white/50 px-3 py-2 text-ink"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm">Email</span>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-xl border border-white/70 bg-white/50 px-3 py-2 text-ink"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm">Message</span>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full rounded-xl border border-white/70 bg-white/50 px-3 py-2 text-ink"
            />
          </label>
          <button type="submit" className="rounded-full border border-white/70 bg-white/45 px-5 py-2 text-sm font-semibold text-ink">
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
