type PaymentStatusInput = {
  quoteAmountCents?: number | null;
  depositAmountCents?: number | null;
  depositReceivedAt?: Date | string | null;
  finalPaymentReceivedAt?: Date | string | null;
};

export function dollarsToCents(value: string): number | null {
  const normalized = value.trim().replaceAll(",", "").replace(/^\$/, "");

  if (!normalized) {
    return null;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return null;
  }

  const [dollars, cents = ""] = normalized.split(".");
  const paddedCents = cents.padEnd(2, "0");

  return Number(dollars) * 100 + Number(paddedCents);
}

export function centsToDollars(cents?: number | null): string {
  if (cents == null) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function calculateRemainingBalanceCents(
  input: PaymentStatusInput,
): number | null {
  if (input.quoteAmountCents == null) {
    return null;
  }

  if (input.finalPaymentReceivedAt) {
    return 0;
  }

  const receivedDeposit = input.depositReceivedAt
    ? input.depositAmountCents ?? 0
    : 0;

  return Math.max(input.quoteAmountCents - receivedDeposit, 0);
}

export function getPaymentStatus(input: PaymentStatusInput): string {
  if (input.quoteAmountCents == null) {
    return "No Quote";
  }

  if (input.finalPaymentReceivedAt) {
    return "Paid";
  }

  if (input.depositReceivedAt) {
    return "Partially Paid";
  }

  return "Unpaid";
}
