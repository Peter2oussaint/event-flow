const summaryCards = [
  { label: "New Leads", value: "12", accent: "bg-teal-400" },
  { label: "Active Clients", value: "8", accent: "bg-sky-400" },
  { label: "Contracts Pending", value: "3", accent: "bg-orange-400" },
  { label: "Invoices Due", value: "5", accent: "bg-amber-300" },
  { label: "Questionnaires In Progress", value: "6", accent: "bg-violet-300" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Admin Dashboard
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-300">
          Manage leads, clients, contracts, invoices, and event planning
          workflows from one place.
        </p>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <div className={`h-1.5 w-10 rounded-full ${card.accent}`} />
            <p className="mt-5 text-sm font-medium text-slate-400">
              {card.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {card.value}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
