-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "depositAmountCents" INTEGER,
ADD COLUMN     "depositReceivedAt" TIMESTAMP(3),
ADD COLUMN     "finalPaymentReceivedAt" TIMESTAMP(3),
ADD COLUMN     "quoteAmountCents" INTEGER;
