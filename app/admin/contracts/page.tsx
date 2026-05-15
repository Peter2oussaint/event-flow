const contractBuckets = [
  {
    title: "Awaiting Client Signature",
    count: 2,
    copy: "Contracts sent to clients but not signed yet.",
  },
  {
    title: "Awaiting Admin Signature",
    count: 1,
    copy: "Client-signed agreements ready for countersignature.",
  },
  {
    title: "Completed Contracts",
    count: 7,
    copy: "Fully signed contracts available for records.",
  },
];

export default function AdminContractsPage() {
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-tight text-white">
        Contracts
      </h2>
      <p className="mt-3 text-slate-300">
        Placeholder workflow for tracking contract status.
      </p>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {contractBuckets.map((bucket) => (
          <article
            key={bucket.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <p className="text-sm font-medium text-orange-300">
              {bucket.count} total
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              {bucket.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {bucket.copy}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
