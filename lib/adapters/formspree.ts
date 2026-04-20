type FormspreePayload = {
  full_name: string;
  email_address: string;
  phone_number: string;
  event_date: string;
  venue: string;
  message: string;
};

export function adaptFormspree(payload: FormspreePayload) {
  return {
    name: payload.full_name,
    email: payload.email_address,
    phone: payload.phone_number,
    eventDate: payload.event_date,
    venue: payload.venue,
    message: payload.message,
    source: "FORMSPREE" as const,
  };
}