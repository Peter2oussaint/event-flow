export const dynamic = "force-dynamic";

import type { Prisma } from "@prisma/client";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

const leadStatuses = [
  "NEW",
  "CONTACTED",
  "CONSULT_SCHEDULED",
  "BOOKED",
  "UNAVAILABLE",
  "DOUBLE_BOOKED",
  "CLOSED",
] as const;

type AdminLeadSearchParams = Promise<{
  eventDate?: string | string[];
  venue?: string | string[];
  eventType?: string | string[];
  status?: string | string[];
}>;

function getSearchParam(
  params: Awaited<AdminLeadSearchParams>,
  key: keyof Awaited<AdminLeadSearchParams>,
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function getEventDateRange(eventDate: string) {
  if (!eventDate) {
    return null;
  }

  const start = new Date(`${eventDate}T00:00:00.000Z`);

  if (Number.isNaN(start.getTime())) {
    return null;
  }

  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 1);

  return { gte: start, lt: end };
}

function getEventDateKey(date: Date | null) {
  return date ? date.toISOString().slice(0, 10) : null;
}

function formatEventDate(date: Date | null) {
  if (!date) {
    return "Not provided";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatSubmittedDate(date: Date) {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

function displayValue(value: string | null | undefined) {
  return value?.trim() || "Not provided";
}

function LeadField({
  label,
  children,
}: Readonly<{
  label: string;
  children: React.ReactNode;
}>) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}:
      </dt>
      <dd className="mt-1 text-sm leading-5 text-slate-100">{children}</dd>
    </div>
  );
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams?: AdminLeadSearchParams;
}) {
  const params = searchParams ? await searchParams : {};
  const eventDateFilter = getSearchParam(params, "eventDate").trim();
  const venueFilter = getSearchParam(params, "venue").trim();
  const eventTypeFilter = getSearchParam(params, "eventType").trim();
  const statusFilter = getSearchParam(params, "status").trim();

  const where: Prisma.LeadWhereInput = {};
  const eventDateRange = getEventDateRange(eventDateFilter);

  if (eventDateRange) {
    where.eventDate = eventDateRange;
  }

  if (venueFilter) {
    where.venue = {
      contains: venueFilter,
      mode: "insensitive",
    };
  }

  if (eventTypeFilter) {
    where.eventType = {
      contains: eventTypeFilter,
      mode: "insensitive",
    };
  }

  if (leadStatuses.includes(statusFilter as (typeof leadStatuses)[number])) {
    where.status = statusFilter;
  }

  const [leads, leadDates] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.lead.findMany({
      where: {
        eventDate: {
          not: null,
        },
      },
      select: {
        eventDate: true,
      },
    }),
  ]);

  const inquiryCountsByDate = new Map<string, number>();

  for (const leadDate of leadDates) {
    const dateKey = getEventDateKey(leadDate.eventDate);

    if (dateKey) {
      inquiryCountsByDate.set(
        dateKey,
        (inquiryCountsByDate.get(dateKey) ?? 0) + 1,
      );
    }
  }

  return (
    <div>
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Leads
        </h2>
        <p className="mt-3 text-slate-300">
          Review incoming inquiries from manual and provider intake sources.
        </p>
      </div>

      <form
        action="/admin/leads"
        method="get"
        className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-300">
              Event date
            </span>
            <input
              type="date"
              name="eventDate"
              defaultValue={eventDateFilter}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-teal-400"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-300">Venue</span>
            <input
              type="text"
              name="venue"
              defaultValue={venueFilter}
              placeholder="Brooklyn"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-300">
              Event type
            </span>
            <input
              type="text"
              name="eventType"
              defaultValue={eventTypeFilter}
              placeholder="wedding"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-300">Status</span>
            <select
              name="status"
              defaultValue={statusFilter}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-teal-400"
            >
              <option value="">All statuses</option>
              {leadStatuses.map((status) => (
                <option key={status} value={status}>
                  {formatStatus(status)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
          >
            Apply Filters
          </button>
          <Link
            href="/admin/leads"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Clear
          </Link>
        </div>
      </form>

      {leads.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
          No leads match the current filters.
        </div>
      ) : (
        <div className="mt-8 grid gap-3 xl:grid-cols-2">
          {leads.map((lead) => {
            const dateKey = getEventDateKey(lead.eventDate);
            const sameDateInquiryCount = dateKey
              ? inquiryCountsByDate.get(dateKey) ?? 0
              : 0;

            return (
              <article
                key={lead.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-sm shadow-slate-950/20"
              >
                <div className="flex flex-col gap-3 border-b border-slate-800 pb-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {lead.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Submitted {formatSubmittedDate(lead.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sameDateInquiryCount > 1 ? (
                      <span className="rounded-full bg-orange-400/15 px-2.5 py-1 text-xs font-semibold text-orange-200">
                        {sameDateInquiryCount} inquiries on this date
                      </span>
                    ) : null}
                    <span className="rounded-full bg-teal-400/15 px-2.5 py-1 text-xs font-semibold text-teal-200">
                      {formatStatus(lead.status)}
                    </span>
                  </div>
                </div>

                <dl className="mt-4 grid gap-x-4 gap-y-3 sm:grid-cols-2">
                  <LeadField label="Name">{lead.name}</LeadField>
                  <LeadField label="Email">{lead.email}</LeadField>
                  <LeadField label="Phone">
                    {displayValue(lead.phone)}
                  </LeadField>
                  <LeadField label="Event Date">
                    {formatEventDate(lead.eventDate)}
                  </LeadField>
                  <LeadField label="Event Type">
                    {displayValue(lead.eventType)}
                  </LeadField>
                  <LeadField label="Venue">
                    {displayValue(lead.venue)}
                  </LeadField>
                  <LeadField label="Source">{lead.source}</LeadField>
                  <LeadField label="Status">
                    {formatStatus(lead.status)}
                  </LeadField>
                  <LeadField label="Submitted">
                    {formatSubmittedDate(lead.createdAt)}
                  </LeadField>
                  <div className="sm:col-span-2">
                    <LeadField label="Message">
                      <span className="block max-h-28 overflow-y-auto rounded-lg bg-slate-950/70 p-3 text-sm leading-6 text-slate-300">
                        {displayValue(lead.message)}
                      </span>
                    </LeadField>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
