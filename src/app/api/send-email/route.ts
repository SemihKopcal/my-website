import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { fullName, email, subject, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // Bu, Resend hesabından onaylı olmalı
      to: process.env.MAIL_RECEIVER!,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
      replyTo: email,
    });

    console.log("Resend response:", data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
