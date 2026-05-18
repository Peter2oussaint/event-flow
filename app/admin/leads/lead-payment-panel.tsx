"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  calculateRemainingBalanceCents,
  centsToDollars,
  dollarsToCents,
  getPaymentStatus,
} from "@/lib/utils/money";

type LeadPaymentPanelProps = {
  leadId: string;
  quoteAmountCents?: number | null;
  depositAmountCents?: number | null;
  depositReceivedAt?: string | null;
  finalPaymentReceivedAt?: string | null;
};

function centsToInputValue(cents?: number | null) {
  return cents == null ? "" : (cents / 100).toFixed(2);
}

export function LeadPaymentPanel({
  leadId,
  quoteAmountCents,
  depositAmountCents,
  depositReceivedAt,
  finalPaymentReceivedAt,
}: LeadPaymentPanelProps) {
  const router = useRouter();
  const [quoteAmountDollars, setQuoteAmountDollars] = useState(
    centsToInputValue(quoteAmountCents),
  );
  const [depositAmountDollars, setDepositAmountDollars] = useState(
    centsToInputValue(depositAmountCents),
  );
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const remainingBalanceCents = calculateRemainingBalanceCents({
    quoteAmountCents,
    depositAmountCents,
    depositReceivedAt,
    finalPaymentReceivedAt,
  });
  const paymentStatus = getPaymentStatus({
    quoteAmountCents,
    depositAmountCents,
    depositReceivedAt,
    finalPaymentReceivedAt,
  });

  async function patchPayment(action: string) {
    setIsSubmitting(true);
    setFeedback(null);
    setError(null);

    try {
      const response = await fetch(`/api/leads/${leadId}/payments`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          quoteAmountDollars,
          depositAmountDollars,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "Failed to update payment tracking",
        );
      }

      setFeedback("Payment tracking updated.");
      router.refresh();
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Failed to update payment tracking",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function setDepositToHalf() {
    setFeedback(null);
    setError(null);

    const quoteCents = dollarsToCents(quoteAmountDollars);

    if (quoteCents == null) {
      setError("Enter a valid quote amount first.");
      return;
    }

    setDepositAmountDollars((Math.round(quoteCents / 2) / 100).toFixed(2));
  }

  return (
    <section className="mt-4 rounded-lg border border-slate-700 bg-slate-100 p-3 text-slate-950">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-sm font-semibold text-slate-950">
            Payment Tracking
          </h4>
          <div className="mt-3 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
            <p>
              <span className="font-medium text-slate-600">Quote Amount:</span>{" "}
              {centsToDollars(quoteAmountCents)}
            </p>
            <p>
              <span className="font-medium text-slate-600">
                Deposit Amount:
              </span>{" "}
              {centsToDollars(depositAmountCents)}
            </p>
            <p>
              <span className="font-medium text-slate-600">
                Remaining Balance:
              </span>{" "}
              {remainingBalanceCents == null
                ? "$0.00"
                : centsToDollars(remainingBalanceCents)}
            </p>
            <p>
              <span className="font-medium text-slate-600">
                Payment Status:
              </span>{" "}
              {paymentStatus}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Quote amount in dollars
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={quoteAmountDollars}
            onChange={(event) => setQuoteAmountDollars(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500"
            placeholder="4000"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Deposit amount in dollars
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={depositAmountDollars}
            onChange={(event) => setDepositAmountDollars(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500"
            placeholder="2000"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={setDepositToHalf}
          disabled={isSubmitting}
          className="rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white disabled:opacity-60"
        >
          Set Deposit to 50%
        </button>
        <button
          type="button"
          onClick={() => patchPayment("update_payment_terms")}
          disabled={isSubmitting}
          className="rounded-md bg-teal-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-500 disabled:opacity-60"
        >
          Save Payment Terms
        </button>
        <button
          type="button"
          onClick={() => patchPayment("mark_deposit_received")}
          disabled={isSubmitting}
          className="rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white disabled:opacity-60"
        >
          Mark Deposit Received
        </button>
        <button
          type="button"
          onClick={() => patchPayment("clear_deposit_received")}
          disabled={isSubmitting}
          className="rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white disabled:opacity-60"
        >
          Clear Deposit
        </button>
        <button
          type="button"
          onClick={() => patchPayment("mark_final_payment_received")}
          disabled={isSubmitting}
          className="rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white disabled:opacity-60"
        >
          Mark Final Payment Received
        </button>
        <button
          type="button"
          onClick={() => patchPayment("clear_final_payment_received")}
          disabled={isSubmitting}
          className="rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white disabled:opacity-60"
        >
          Clear Final Payment
        </button>
      </div>

      {feedback ? (
        <p className="mt-3 text-xs font-medium text-teal-700">{feedback}</p>
      ) : null}
      {error ? (
        <p className="mt-3 text-xs font-medium text-orange-700">{error}</p>
      ) : null}
    </section>
  );
}
