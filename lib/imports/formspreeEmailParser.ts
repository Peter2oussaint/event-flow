type ImportedFormspreeLead = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  venue: string;
  message: string;
  source: "FORMSPREE";
};

function getLineAfterLabel(lines: string[], label: string) {
  const labelIndex = lines.findIndex((line) => line.trim() === label);

  if (labelIndex === -1) {
    throw new Error(`Missing required Formspree email field: ${label}`);
  }

  const value = lines[labelIndex + 1]?.trim();

  if (!value) {
    throw new Error(`Missing value for Formspree email field: ${label}`);
  }

  return value;
}

export function parseFormspreeEmailBody(
  emailBody: string,
): ImportedFormspreeLead {
  if (!emailBody.trim()) {
    throw new Error("Formspree email body is required");
  }

  const lines = emailBody.replace(/\r\n/g, "\n").split("\n");
  const messageLabelIndex = lines.findIndex((line) => line.trim() === "message");

  if (messageLabelIndex === -1) {
    throw new Error("Missing required Formspree email field: message");
  }

  const submittedIndex = lines.findIndex(
    (line, index) =>
      index > messageLabelIndex && line.trim().startsWith("Submitted"),
  );

  if (submittedIndex === -1) {
    throw new Error("Missing Submitted line after Formspree message");
  }

  const message = lines
    .slice(messageLabelIndex + 1, submittedIndex)
    .join("\n")
    .trim();

  if (!message) {
    throw new Error("Missing value for Formspree email field: message");
  }

  return {
    name: getLineAfterLabel(lines, "name"),
    email: getLineAfterLabel(lines, "email"),
    phone: getLineAfterLabel(lines, "phone"),
    eventDate: getLineAfterLabel(lines, "event_date"),
    venue: getLineAfterLabel(lines, "venue"),
    message,
    source: "FORMSPREE",
  };
}
