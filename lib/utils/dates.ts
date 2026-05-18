type MusicPlanningReminderStatusInput = {
  eventDate?: Date | string | null;
  musicPlanningReminderSentAt?: Date | string | null;
};

function toValidDate(value?: Date | string | null) {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

export function subtractMonths(date: Date, months: number): Date {
  const result = new Date(date);
  const originalDay = result.getDate();

  result.setMonth(result.getMonth() - months);

  if (result.getDate() !== originalDay) {
    result.setDate(0);
  }

  return result;
}

export function formatDisplayDate(date?: Date | string | null): string {
  const validDate = toValidDate(date);

  if (!validDate) {
    return "Not provided";
  }

  return validDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function getMusicPlanningReminderDueDate(
  eventDate?: Date | string | null,
): Date | null {
  const validEventDate = toValidDate(eventDate);

  if (!validEventDate) {
    return null;
  }

  return subtractMonths(validEventDate, 3);
}

export function getMusicPlanningReminderStatus(
  input: MusicPlanningReminderStatusInput,
): string {
  if (!toValidDate(input.eventDate)) {
    return "No Event Date";
  }

  if (toValidDate(input.musicPlanningReminderSentAt)) {
    return "Sent";
  }

  const dueDate = getMusicPlanningReminderDueDate(input.eventDate);

  if (!dueDate) {
    return "No Event Date";
  }

  return new Date() >= dueDate ? "Due" : "Not Due Yet";
}
