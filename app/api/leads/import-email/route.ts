import { prisma } from "@/lib/prisma";
import { parseFormspreeEmailBody } from "@/lib/imports/formspreeEmailParser";
import { leadSchema } from "@/lib/validation/lead";

export async function POST(request: Request) {
  try {
    let body;

    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "Request body must be valid JSON" },
        { status: 400 },
      );
    }

    if (!body || typeof body.emailBody !== "string") {
      return Response.json(
        { error: "emailBody must be provided as a string" },
        { status: 400 },
      );
    }

    let parsedLead;

    try {
      parsedLead = parseFormspreeEmailBody(body.emailBody);
    } catch (error) {
      return Response.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Failed to parse Formspree email body",
        },
        { status: 400 },
      );
    }

    const result = leadSchema.safeParse(parsedLead);

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
        source: data.source ?? "FORMSPREE",
        status: "NEW",
      },
    });

    return Response.json({ success: true, lead });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to import lead email" },
      { status: 500 },
    );
  }
}
