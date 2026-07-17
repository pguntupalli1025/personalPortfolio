import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/db";

export interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(body: unknown):
  | { ok: true; data: ContactRequestBody }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 1 || name.length > 100) {
    return { ok: false, error: "Name is required (max 100 characters)." };
  }

  if (typeof email !== "string" || !isValidEmail(email) || email.length > 200) {
    return { ok: false, error: "A valid email is required." };
  }

  if (
    typeof message !== "string" ||
    message.trim().length < 1 ||
    message.length > 2000
  ) {
    return { ok: false, error: "Message is required (max 2000 characters)." };
  }

  return {
    ok: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    },
  };
}

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = validate(json);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { name, email, message } = result.data;

  try {
    await prisma.contactSubmission.create({
      data: { name, email, message },
    });
  } catch (error) {
    console.error("Failed to save contact submission:", error);
    return NextResponse.json(
      { error: "Could not save your message. Try again later." },
      { status: 500 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? process.env.RESEND_TO_EMAIL;

  if (apiKey && toEmail) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: toEmail,
        replyTo: email,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
    } catch (error) {
      console.error("Failed to send email via Resend:", error);
      return NextResponse.json(
        {
          error:
            "Message was saved, but email delivery failed. Try again later.",
        },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
