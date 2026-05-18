export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import {
  calculateRemainingBalanceCents,
  centsToDollars,
  getPaymentStatus,
} from "@/lib/utils/money";

import { SectionPanel } from "../section-panel";

function InvoiceMetric({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <article className="rounded-[1.75rem] bg-[#26a996] p-6">
      <p className="text-lg text-white/85">{label}</p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
    </article>
  );
}

export default async function ClientInvoicePage() {
  const testLeadId = process.env.CLIENT_PORTAL_TEST_LEAD_ID;

  if (!testLeadId) {
    return (
      <SectionPanel title="Invoice">
        <div className="rounded-[1.75rem] bg-[#26a996] p-6">
          <h3 className="text-2xl font-bold text-white">
            No test invoice connected yet
          </h3>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white">
            Add a temporary lead id to CLIENT_PORTAL_TEST_LEAD_ID to preview
            invoice status in the client portal.
          </p>
        </div>
      </SectionPanel>
    );
  }

  const lead = await prisma.lead.findUnique({
    where: {
      id: testLeadId,
    },
    select: {
      quoteAmountCents: true,
      depositAmountCents: true,
      depositReceivedAt: true,
      finalPaymentReceivedAt: true,
    },
  });

  if (!lead) {
    return (
      <SectionPanel title="Invoice">
        <div className="rounded-[1.75rem] bg-[#26a996] p-6">
          <h3 className="text-2xl font-bold text-white">
            Test invoice not found
          </h3>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white">
            The configured test lead id does not match an existing lead.
          </p>
        </div>
      </SectionPanel>
    );
  }

  const remainingBalanceCents = calculateRemainingBalanceCents(lead);
  const overallPaymentStatus = getPaymentStatus(lead);

  return (
    <SectionPanel title="Invoice">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <InvoiceMetric
          label="Quote Amount"
          value={centsToDollars(lead.quoteAmountCents)}
        />
        <InvoiceMetric
          label="Deposit Amount"
          value={centsToDollars(lead.depositAmountCents)}
        />
        <InvoiceMetric
          label="Remaining Balance"
          value={
            remainingBalanceCents == null
              ? "$0.00"
              : centsToDollars(remainingBalanceCents)
          }
        />
        <InvoiceMetric
          label="Deposit Status"
          value={
            lead.depositReceivedAt ? "Deposit received" : "Deposit pending"
          }
        />
        <InvoiceMetric
          label="Final Payment Status"
          value={
            lead.finalPaymentReceivedAt
              ? "Final payment received"
              : "Final payment pending"
          }
        />
        <InvoiceMetric
          label="Overall Payment Status"
          value={overallPaymentStatus}
        />
      </div>
    </SectionPanel>
  );
}
