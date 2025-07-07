export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is missing");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { to, subject, text } = await request.json();

    if (!to || !subject || !text) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject or text" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "info@semihkopcal.com",
      to,
      subject,
      text,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Send email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
