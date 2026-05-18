import { prisma } from "@/lib/prisma";

type ReminderAction = "mark_sent" | "clear_sent";

const reminderActions: ReminderAction[] = ["mark_sent", "clear_sent"];

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const action = body.action as ReminderAction | undefined;

    if (!action || !reminderActions.includes(action)) {
      return Response.json({ error: "Invalid action" }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return Response.json({ error: "Lead not found" }, { status: 404 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        musicPlanningReminderSentAt:
          action === "mark_sent" ? new Date() : null,
      },
    });

    return Response.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to update music planning reminder" },
      { status: 500 },
    );
  }
}
