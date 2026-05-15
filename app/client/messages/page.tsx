import { SectionPanel } from "../section-panel";

export default function ClientMessagesPage() {
  return (
    <SectionPanel title="Messages">
      <div className="rounded-[1.75rem] bg-[#26a996] p-8 text-center">
        <h3 className="text-2xl font-bold text-white">No messages yet</h3>
        <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-white">
          Planning messages will appear here once conversation history is
          connected.
        </p>
      </div>
    </SectionPanel>
  );
}
