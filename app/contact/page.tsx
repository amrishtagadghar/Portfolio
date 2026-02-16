export default function ContactPage() {
  return (
    <div className="page-shell space-y-8">
      <section>
        <h1 className="section-title">Contact</h1>
        <p className="mt-3 max-w-2xl text-ink/80">
          I&apos;m looking forward to hearing from you! If you prefer not to fill out forms, feel free to email me
          directly and let&apos;s talk about the next big thing!
        </p>
        <p className="mt-4 text-sm text-ink/70">Availability: Currently available for new work.</p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <article className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-serif text-2xl">Direct links</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink/80">
            <li>Email: amrishst@gmail.com</li>
            <li>LinkedIn: linkedin.com/in/amrish-tagadghar</li>
            <li>Dribbble and Behance profiles available</li>
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
