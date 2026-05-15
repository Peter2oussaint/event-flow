"use client";

import { type FormEvent, useState } from "react";

export default function ImportFormspreeInquiryPage() {
  const [emailBody, setEmailBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/leads/import-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailBody }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "Failed to import lead",
        );
      }

      setEmailBody("");
      setMessage("Lead imported successfully.");
    } catch (importError) {
      setError(
        importError instanceof Error
          ? importError.message
          : "Failed to import lead",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Import Formspree Inquiry
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-300">
          Paste the body of a Formspree notification email to parse the inquiry
          and create a new lead.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5"
      >
        <label className="block">
          <span className="text-sm font-medium text-slate-200">
            Formspree email body
          </span>
          <textarea
            value={emailBody}
            onChange={(event) => setEmailBody(event.target.value)}
            rows={18}
            className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400"
            placeholder="Paste the full Formspree notification email body here..."
          />
        </label>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Importing..." : "Import Lead"}
          </button>

          {message ? (
            <p className="text-sm font-medium text-teal-200">{message}</p>
          ) : null}

          {error ? (
            <p className="text-sm font-medium text-orange-300">{error}</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
