import { SectionPanel } from "../section-panel";

export default function ClientProfilePage() {
  return (
    <SectionPanel title="Profile">
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-[1.75rem] bg-[#26a996] p-6">
          <p className="text-lg text-white/85">Names</p>
          <p className="mt-3 text-3xl font-bold text-white">Emma & Pete</p>
        </article>
        <article className="rounded-[1.75rem] bg-[#26a996] p-6">
          <p className="text-lg text-white/85">Event date</p>
          <p className="mt-3 text-3xl font-bold text-white">
            January, 27th 2026
          </p>
        </article>
      </div>
    </SectionPanel>
  );
}
