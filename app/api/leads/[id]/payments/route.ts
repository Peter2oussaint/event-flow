import { prisma } from "@/lib/prisma";
import { dollarsToCents } from "@/lib/utils/money";

type PaymentAction =
  | "update_payment_terms"
  | "mark_deposit_received"
  | "mark_final_payment_received"
  | "clear_deposit_received"
  | "clear_final_payment_received";

const paymentActions: PaymentAction[] = [
  "update_payment_terms",
  "mark_deposit_received",
  "mark_final_payment_received",
  "clear_deposit_received",
  "clear_final_payment_received",
];

function parseDollarInput(value: unknown, fieldName: string) {
  if (typeof value !== "string") {
    return null;
  }

  if (!value.trim()) {
    return null;
  }

  const cents = dollarsToCents(value);

  if (cents == null) {
    throw new Error(`${fieldName} must be a valid dollar amount`);
  }

  return cents;
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const action = body.action as PaymentAction | undefined;

    if (!action || !paymentActions.includes(action)) {
      return Response.json({ error: "Invalid action" }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return Response.json({ error: "Lead not found" }, { status: 404 });
    }

    if (action === "update_payment_terms") {
      let quoteAmountCents: number | null;
      let depositAmountCents: number | null;

      try {
        quoteAmountCents = parseDollarInput(
          body.quoteAmountDollars,
          "Quote amount",
        );
        depositAmountCents = parseDollarInput(
          body.depositAmountDollars,
          "Deposit amount",
        );
      } catch (error) {
        return Response.json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Invalid payment terms",
          },
          { status: 400 },
        );
      }

      const updatedLead = await prisma.lead.update({
        where: { id },
        data: {
          quoteAmountCents,
          depositAmountCents,
        },
      });

      return Response.json({ success: true, lead: updatedLead });
    }

    const updates: Record<string, Date | null> = {};

    if (action === "mark_deposit_received") {
      updates.depositReceivedAt = new Date();
    } else if (action === "mark_final_payment_received") {
      updates.finalPaymentReceivedAt = new Date();
    } else if (action === "clear_deposit_received") {
      updates.depositReceivedAt = null;
    } else if (action === "clear_final_payment_received") {
      updates.finalPaymentReceivedAt = null;
    } else {
      return Response.json({ error: "Invalid action" }, { status: 400 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: updates,
    });

    return Response.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to update payment tracking" },
      { status: 500 },
    );
  }
}
