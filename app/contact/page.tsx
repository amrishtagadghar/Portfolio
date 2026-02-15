export default function ContactPage() {
  return (
    <div className="page-shell space-y-8">
      <section>
        <h1 className="section-title">Let&apos;s build something clear, bold, and effective.</h1>
        <p className="mt-3 max-w-2xl text-ink/80">
          Share your goal, timeline, and what you need designed. I&apos;ll reply with next steps and a practical plan.
        </p>
        <p className="mt-4 text-sm text-ink/70">Availability: Open for full-time and freelance work.</p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <article className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-serif text-2xl">Direct links</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink/80">
            <li>Email: hello@balance.design</li>
            <li>LinkedIn: linkedin.com/in/your-profile</li>
            <li>Resume: /resume.pdf</li>
          </ul>
        </article>

        <form action="/api/contact" method="post" className="space-y-4 rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-serif text-2xl">Contact form</h2>
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
            <input name="name" required className="w-full rounded-lg border border-ink/20 px-3 py-2" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm">Email</span>
            <input type="email" name="email" required className="w-full rounded-lg border border-ink/20 px-3 py-2" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm">Message</span>
            <textarea name="message" required rows={5} className="w-full rounded-lg border border-ink/20 px-3 py-2" />
          </label>
          <button type="submit" className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper">
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
