import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        eventDate: body.eventDate
          ? new Date(body.eventDate)
          : null,
        venue: body.venue || null,
        message: body.message || null,
        source: body.source || "MANUAL",
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