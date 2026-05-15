const clients = [
  {
    name: "Emma & Pete",
    eventDate: "Jan 27, 2026",
    status: "Planning",
    nextAction: "Review questionnaire",
  },
  {
    name: "Avery & Jordan",
    eventDate: "Mar 14, 2026",
    status: "Booked",
    nextAction: "Send invoice",
  },
  {
    name: "Sam & Riley",
    eventDate: "Jun 6, 2026",
    status: "Inquiry",
    nextAction: "Schedule consult",
  },
];

export default function AdminClientsPage() {
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-tight text-white">
        Clients
      </h2>
      <p className="mt-3 text-slate-300">
        Placeholder view for future booked client records.
      </p>

      <section className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="grid grid-cols-4 gap-4 border-b border-slate-800 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <span>Client Name</span>
          <span>Event Date</span>
          <span>Status</span>
          <span>Next Action</span>
        </div>
        {clients.map((client) => (
          <div
            key={client.name}
            className="grid grid-cols-1 gap-3 border-b border-slate-800 px-5 py-4 last:border-b-0 md:grid-cols-4 md:gap-4"
          >
            <span className="font-medium text-white">{client.name}</span>
            <span className="text-slate-300">{client.eventDate}</span>
            <span className="text-teal-200">{client.status}</span>
            <span className="text-slate-300">{client.nextAction}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
