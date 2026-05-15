import { SectionPanel } from "../section-panel";

const invoiceItems = [
  { label: "Deposit due", value: "$500" },
  { label: "Remaining balance", value: "$1,500" },
  { label: "Payment status", value: "Pending" },
];

export default function ClientInvoicePage() {
  return (
    <SectionPanel title="Invoice">
      <div className="grid gap-4 md:grid-cols-3">
        {invoiceItems.map((item) => (
          <article key={item.label} className="rounded-[1.75rem] bg-[#26a996] p-6">
            <p className="text-lg text-white/85">{item.label}</p>
            <p className="mt-3 text-3xl font-bold text-white">{item.value}</p>
          </article>
        ))}
      </div>
    </SectionPanel>
  );
}
