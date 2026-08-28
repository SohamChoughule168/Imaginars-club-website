import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 30;

/** Simple in-memory throttle: max 5 submissions per IP per hour. */
const ipLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const hits = (ipLog.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= 5) {
    ipLog.set(ip, hits);
    return true;
  }
  hits.push(now);
  ipLog.set(ip, hits);
  return false;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  // 1. Parse + validate the payload.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue?.message ?? "Please check your details and try again." },
      { status: 400 }
    );
  }

  const { name, email, phone, company, service, message, website } = parsed.data;

  // 2. Honeypot: silently accept so bots think they succeeded.
  if (website) {
    return NextResponse.json({ success: true, message: "Email sent successfully" });
  }

  // 3. Basic abuse protection.
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later or email us directly." },
      { status: 429 }
    );
  }

  // 4. Email configuration guard.
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    console.error("[contact] EMAIL_USER / EMAIL_PASS are not configured.");
    return NextResponse.json(
      { error: "The contact form is not configured yet. Please email us directly." },
      { status: 500 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: user,
      to: user,
      replyTo: email,
      subject: `New lead from ${name} — ${service || "Website enquiry"}`,
      text: [
        "You have received a new enquiry from the ImaginarsClubServices website.",
        "",
        "--- Client details ---",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Company: ${company || "Not provided"}`,
        `Service: ${service || "Not selected"}`,
        "",
        "--- Message ---",
        message,
        "",
        `--- Meta ---`,
        `IP: ${ip}`,
        `Sent: ${new Date().toISOString()}`,
      ].join("\n"),
    });

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("[contact] Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please email us directly." },
      { status: 500 }
    );
  }
}
