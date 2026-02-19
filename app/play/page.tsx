import { PlayCard } from "@/components/play-card";
import { getPlayItemsData } from "@/lib/cms";

export default async function PlayPage() {
  const playItems = await getPlayItemsData();
  return (
    <div className="page-shell space-y-12">
      <section className="glass-panel rounded-[48px] p-8 md:p-10">
        <span className="section-kicker">Play</span>
        <h1 className="section-title mt-3">A live archive of experiments</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Experiments in motion, type, and generative systems. Rapid tests that later shape production work.
        </p>
      </section>
      <section className="stagger-grid grid gap-6 md:grid-cols-2">
        {playItems.map((item) => (
          <PlayCard key={item.slug} item={item} />
        ))}
      </section>
    </div>
  );
}
