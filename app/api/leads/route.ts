import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validation/lead";
import { adaptFormspreePayload } from "@/lib/adapters/formspree";

const formspreeFields = [
  "full_name",
  "email_address",
  "phone_number",
  "event_date",
];

function looksLikeFormspreePayload(body: unknown) {
  if (!body || typeof body !== "object") {
    return false;
  }

  return formspreeFields.some((field) => field in body);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Provider payloads are normalized into the internal lead shape before validation.
    const normalized = looksLikeFormspreePayload(body)
      ? adaptFormspreePayload(body)
      : body;

    const result = leadSchema.safeParse(normalized);

    if (!result.success) {
      return Response.json({ error: result.error.flatten() }, { status: 400 });
    }

    const data = result.data;

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        eventDate: new Date(data.eventDate),
        venue: data.venue,
        message: data.message,
        source: data.source ?? "MANUAL",
        status: "NEW",
      },
    });

    return Response.json({ success: true, lead });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
