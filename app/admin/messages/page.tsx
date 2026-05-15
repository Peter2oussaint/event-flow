export default function AdminMessagesPage() {
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-tight text-white">
        Messages
      </h2>
      <p className="mt-3 text-slate-300">
        Placeholder inbox for future client communication.
      </p>

      <section className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/15 text-teal-200">
          0
        </div>
        <h3 className="mt-5 text-xl font-semibold text-white">
          No messages yet
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
          Client message threads will appear here once messaging is connected.
        </p>
      </section>
    </div>
  );
}
