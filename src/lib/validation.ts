import { z } from "zod";

/**
 * Shared contact-form schema. Used on the client (zodResolver) and in the
 * server route handler so both sides always agree.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(120),
  phone: z.string().trim().max(24).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more about your project — at least 10 characters.")
    .max(4000),
  // Honeypot field — legitimate humans never fill this.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const SERVICE_OPTIONS = [
  "Web Development",
  "Mobile App Development",
  "AI Solutions & Automation",
  "Digital Marketing & Ads",
  "Video & Multimedia",
  "Brand Management",
  "Something else",
  "Not sure yet",
];