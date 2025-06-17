// ✅ src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json();

  if (!name || !email || !phone || !message)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CONTACT_EMAIL,
      pass: process.env.CONTACT_APP_PASSWORD, // use App Password from Gmail
    },
  });

  const mailOptions = {
    from: process.env.CONTACT_EMAIL,
    to: process.env.CONTACT_EMAIL,
    subject: `📩 New Contact Message from ${name}`,
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Mail send failed", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
