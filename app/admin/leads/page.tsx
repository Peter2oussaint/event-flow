import { prisma } from "@/lib/prisma";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Leads</h1>

      {leads.length === 0 ? (
        <p>No leads yet.</p>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold">{lead.name}</h2>
              <p>{lead.email}</p>
              <p>{lead.phone ?? "No phone provided"}</p>
              <p>{lead.venue ?? "No venue provided"}</p>
              <p>{lead.message ?? "No message provided"}</p>
              <p className="text-sm text-gray-500">
                Source: {lead.source}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}