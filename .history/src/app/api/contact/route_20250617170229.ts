// ✅ /app/api/contact/route.ts (server-only)
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    // ✅ Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_APP_PASSWORD,
      },
    });

    // ✅ Email to PJ Legal
    await transporter.sendMail({
      from: `"PJ LEGAL Form" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: "📬 New Contact Form Submission - PJ LEGAL",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // ✅ Auto-Reply to user
    await transporter.sendMail({
      from: `"PJ LEGAL" <${process.env.CONTACT_EMAIL}>`,
      to: email,
      subject: "📩 We received your message - PJ LEGAL",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to <strong>PJ LEGAL</strong>.</p>
        <p>We have received your message and will get back to you shortly.</p>
        <br/>
        <p>Best Regards,<br/>Team PJ LEGAL</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
