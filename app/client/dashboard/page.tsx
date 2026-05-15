const summaries = [
  {
    title: "Contract",
    text: "Review, sign, and download once complete.",
    label: "Sign",
  },
  {
    title: "Invoice",
    text: "Track deposit, balance, and payment status.",
    label: "Pay",
  },
  {
    title: "Questionnaire",
    text: "Share event details, formalities, and notes.",
    label: "Plan",
  },
  {
    title: "Music Planning",
    text: "Build playlists for each part of the night.",
    label: "Music",
  },
  {
    title: "Messages",
    text: "Keep planning conversations in one place.",
    label: "Chat",
  },
];

export default function ClientDashboardPage() {
  return (
    <div className="mt-8 rounded-[2.4rem] bg-[#48897f] p-6 sm:p-10 lg:p-12 xl:p-16">
      <p className="max-w-5xl text-xl font-normal leading-relaxed text-white sm:text-2xl xl:text-3xl">
        This client portal is where we&apos;ll handle the key planning details
        for your wedding. Everything is organized by section so you can move
        through it at your own pace and always know what&apos;s complete and
        what&apos;s next.
      </p>

      <section className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 xl:mt-12 xl:grid-cols-3">
        {summaries.map((summary) => (
          <article
            key={summary.title}
            className="min-h-44 rounded-[1.75rem] bg-[#26a996] p-5 shadow-lg shadow-[#397369]/20 sm:min-h-52 sm:p-6"
          >
            <div className="mb-5 inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-[#f68e58] px-4 py-3 text-base font-bold text-white">
              {summary.label}
            </div>
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
              {summary.title}
            </h2>
            <p className="mt-3 text-lg font-normal leading-relaxed text-white sm:text-xl">
              {summary.text}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
