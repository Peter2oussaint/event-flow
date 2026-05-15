const questionnaireBuckets = [
  { title: "Not Started", count: 5 },
  { title: "In Progress", count: 6 },
  { title: "Completed", count: 11 },
];

export default function AdminQuestionnairesPage() {
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-tight text-white">
        Questionnaires
      </h2>
      <p className="mt-3 text-slate-300">
        Placeholder status overview for planning questionnaires.
      </p>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {questionnaireBuckets.map((bucket) => (
          <article
            key={bucket.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <h3 className="text-xl font-semibold text-white">{bucket.title}</h3>
            <p className="mt-4 text-4xl font-semibold text-teal-200">
              {bucket.count}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
