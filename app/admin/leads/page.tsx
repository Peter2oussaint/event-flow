export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-tight text-white">
        Leads
      </h2>
      <p className="mt-3 text-slate-300">
        Review incoming inquiries from manual and provider intake sources.
      </p>

      {leads.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
          No leads yet.
        </div>
      ) : (
        <div className="mt-8 grid gap-4 xl:grid-cols-2">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {lead.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">{lead.email}</p>
                </div>
                <span className="rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-200">
                  {lead.status}
                </span>
              </div>

              <div className="mt-5 space-y-2 text-sm text-slate-300">
                <p>{lead.phone ?? "No phone provided"}</p>
                <p>{lead.venue ?? "No venue provided"}</p>
                <p>{lead.message ?? "No message provided"}</p>
              </div>

              <p className="mt-5 text-xs font-medium uppercase tracking-wide text-orange-300">
                Source: {lead.source}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
