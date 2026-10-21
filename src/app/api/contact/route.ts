import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RATE_LIMIT_MAP = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000; // 1 min

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = RATE_LIMIT_MAP.get(ip);
  if (last && now - last < RATE_LIMIT_WINDOW) return true;
  RATE_LIMIT_MAP.set(ip, now);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured. Please contact us directly at info@dulscoplus.com." },
        { status: 503 }
      );
    }

    // Basic rate limiting by IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, company, email, phone, service, message, _honeypot } = body;

    // Honeypot spam check
    if (_honeypot) {
      // Silently accept to fool bots
      return NextResponse.json({ success: true });
    }

    // Server-side validation
    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: "Please describe your requirements." }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Dulsco Plus <onboarding@resend.dev>",
      to: "thahathafani619@gmail.com",
      replyTo: email.trim(),
      subject: `New Enquiry from ${name.trim()}${company ? ` (${company.trim()})` : ""}`,
      text: [
        `Name: ${name.trim()}`,
        company ? `Company: ${company.trim()}` : null,
        `Email: ${email.trim()}`,
        phone ? `Phone: ${phone.trim()}` : null,
        service ? `Service: ${service}` : null,
        "",
        `Message:`,
        message.trim(),
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send your enquiry. Please try again or email us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
