import { SectionPanel } from "../section-panel";

export default function ClientContractPage() {
  return (
    <SectionPanel title="Contract">
      <div className="max-w-3xl rounded-[1.75rem] bg-[#26a996] p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-white">Contract</h3>
        <p className="mt-4 text-xl leading-relaxed text-white">
          Your event contract can be reviewed and signed here once it is ready.
          This section will hold the agreement, signature status, and completed
          copy.
        </p>
        <button
          type="button"
          className="mt-8 rounded-full bg-[#f68e58] px-7 py-3 text-lg font-bold text-white transition hover:bg-white hover:text-[#48897f]"
        >
          Review Contract
        </button>
      </div>
    </SectionPanel>
  );
}
