const invoiceBuckets = [
  { title: "Deposits Due", count: 4, accent: "text-orange-300" },
  { title: "Balances Due", count: 3, accent: "text-amber-200" },
  { title: "Paid Invoices", count: 9, accent: "text-teal-200" },
];

export default function AdminInvoicesPage() {
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-tight text-white">
        Invoices
      </h2>
      <p className="mt-3 text-slate-300">
        Placeholder view for deposit, balance, and paid invoice tracking.
      </p>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {invoiceBuckets.map((bucket) => (
          <article
            key={bucket.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <p className={`text-4xl font-semibold ${bucket.accent}`}>
              {bucket.count}
            </p>
            <h3 className="mt-4 text-xl font-semibold text-white">
              {bucket.title}
            </h3>
          </article>
        ))}
      </section>
    </div>
  );
}
