"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createMusicPlanningReminderEmail } from "@/lib/templates/musicPlanningReminder";
import {
  formatDisplayDate,
  getMusicPlanningReminderDueDate,
  getMusicPlanningReminderStatus,
} from "@/lib/utils/dates";

type MusicPlanningReminderPanelProps = {
  leadId: string;
  clientName: string;
  eventDate?: string | null;
  musicPlanningReminderSentAt?: string | null;
};

export function MusicPlanningReminderPanel({
  leadId,
  clientName,
  eventDate,
  musicPlanningReminderSentAt,
}: MusicPlanningReminderPanelProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dueDate = getMusicPlanningReminderDueDate(eventDate);
  const status = getMusicPlanningReminderStatus({
    eventDate,
    musicPlanningReminderSentAt,
  });
  const emailPreview = createMusicPlanningReminderEmail({
    clientName,
  });

  async function updateReminder(action: "mark_sent" | "clear_sent") {
    setIsSubmitting(true);
    setFeedback(null);
    setError(null);

    try {
      const response = await fetch(
        `/api/leads/${leadId}/music-planning-reminder`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "Failed to update music planning reminder",
        );
      }

      setFeedback("Music planning reminder updated.");
      router.refresh();
    } catch (reminderError) {
      setError(
        reminderError instanceof Error
          ? reminderError.message
          : "Failed to update music planning reminder",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-4 rounded-lg border border-slate-700 bg-slate-950/70 p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-sm font-semibold text-white">Music Planning</h4>
          <div className="mt-3 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
            <p className="text-slate-300">
              <span className="font-medium text-slate-500">Due Date:</span>{" "}
              {formatDisplayDate(dueDate)}
            </p>
            <p className="text-slate-300">
              <span className="font-medium text-slate-500">Status:</span>{" "}
              {status}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => updateReminder("mark_sent")}
            disabled={isSubmitting}
            className="rounded-md bg-teal-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-teal-300 disabled:opacity-60"
          >
            Mark Sent
          </button>
          <button
            type="button"
            onClick={() => updateReminder("clear_sent")}
            disabled={isSubmitting}
            className="rounded-md border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 disabled:opacity-60"
          >
            Clear Sent
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-slate-800 bg-slate-900 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Stock email preview
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-100">
          Subject: {emailPreview.subject}
        </p>
        <p className="mt-2 max-h-36 overflow-y-auto whitespace-pre-wrap text-sm leading-6 text-slate-300">
          {emailPreview.body}
        </p>
      </div>

      {feedback ? (
        <p className="mt-3 text-xs font-medium text-teal-300">{feedback}</p>
      ) : null}
      {error ? (
        <p className="mt-3 text-xs font-medium text-orange-300">{error}</p>
      ) : null}
    </section>
  );
}
