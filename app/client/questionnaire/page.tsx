import { SectionPanel } from "../section-panel";

const sections = [
  "Event details",
  "Formalities",
  "Must-play songs",
  "Do-not-play songs",
];

export default function ClientQuestionnairePage() {
  return (
    <SectionPanel title="Questionnaire">
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section} className="rounded-[1.75rem] bg-[#26a996] p-6">
            <h3 className="text-2xl font-bold text-white">{section}</h3>
            <p className="mt-3 text-lg leading-relaxed text-white">
              This section will collect the details needed for the event plan.
            </p>
          </article>
        ))}
      </div>
    </SectionPanel>
  );
}
