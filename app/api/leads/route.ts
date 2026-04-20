import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validation/lead";
import { adaptFormspree } from "@/lib/adapters/formspree";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Detect source
    const isFormspree = "full_name" in body;

    const normalized = isFormspree
      ? adaptFormspree(body)
      : body;

    const result = leadSchema.safeParse(normalized);

    if (!result.success) {
      return Response.json(
        { error: result.error.flatten() },
        { status: 400 }
      );
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
      },
    });

    return Response.json({ success: true, lead });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}