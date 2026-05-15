type FormspreePayload = {
  name?: string;
  full_name?: string;
  email?: string;
  email_address?: string;
  phone?: string;
  phone_number?: string;
  eventDate?: string;
  event_date?: string;
  eventType?: string;
  event_type?: string;
  venue?: string;
  message?: string;
};

export function adaptFormspreePayload(payload: FormspreePayload) {
  return {
    name: payload.name ?? payload.full_name ?? "",
    email: payload.email ?? payload.email_address ?? "",
    phone: payload.phone ?? payload.phone_number ?? "",
    eventDate: payload.eventDate ?? payload.event_date ?? "",
    eventType: payload.eventType ?? payload.event_type ?? "",
    venue: payload.venue ?? "",
    message: payload.message ?? "",
    source: "FORMSPREE" as const,
  };
}
