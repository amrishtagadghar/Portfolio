import { PlayCard } from "@/components/play-card";
import { getPlayItemsData } from "@/lib/cms";

export default async function PlayPage() {
  const playItems = await getPlayItemsData();
  return (
    <div className="page-shell space-y-10">
      <section>
        <h1 className="section-title">Play</h1>
        <p className="mt-3 max-w-2xl text-ink/80">
          Experiments in motion, type, and generative systems. A live archive of sketches and shipped ideas.
        </p>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        {playItems.map((item) => (
          <PlayCard key={item.slug} item={item} />
        ))}
      </section>
    </div>
  );
}
