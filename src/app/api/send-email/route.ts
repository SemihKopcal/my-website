import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(req: Request) {
  const { fullName, email, subject, message } = await req.json();
  console.log(req)
  // Burada kendi Gmail bilgilerinizi girin
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  console.log("Received data:", { fullName, email, subject, message });
  const mailOptions = {
    from: email,
    to: process.env.MAIL_RECEIVER, 
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
