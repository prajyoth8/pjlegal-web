import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json();

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"PJ Legal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "PJ Legal – Thank you for contacting us",
    html: `
      <h3>Hello ${name},</h3>
      <p>Thank you for reaching out to PJ Legal. We have received your message and will get back to you shortly.</p>
      <hr/>
      <p><strong>Your Details:</strong></p>
      <p>Email: ${email}<br/>Phone: ${phone}</p>
      <p><strong>Your Message:</strong><br/>${message}</p>
      <hr/>
      <p>Regards,<br/>PJ Legal Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
