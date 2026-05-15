import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  eventDate: z.string().min(1, "Event date is required"),
  eventType: z.string().min(1, "Event type is required"),
  venue: z.string().min(1, "Venue is required"),
  message: z.string().min(1, "Message is required"),
  source: z.enum(["FORMSPREE", "MANUAL", "CUSTOM_WEBHOOK"]).optional(),
});
