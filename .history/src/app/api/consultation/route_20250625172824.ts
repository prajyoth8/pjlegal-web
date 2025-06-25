import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { getContactConfirmationEmail } from "@/emails/contact_confirmation_email";
import { getAdminNotificationEmail } from "@/emails/getAdminNotificationEmail";

// ✅ Handles consultation booking emails (admin + user)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, date, time } = body;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const userMail = getContactConfirmationEmail(name);
  const adminMail = getAdminNotificationEmail({ name, email, phone, date, time });

  try {
    // ✅ Send to Admin
    await transporter.sendMail({
      from: `"PJ Legal Website" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: adminMail.subject,
      html: adminMail.html,
    });

    // ✅ Send to User
    await transporter.sendMail({
      from: `"PJ Legal" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: userMail.subject,
      html: userMail.html,
    });

    console.log(`[📊 LOG] Consultation booked: ${name}, ${date} @ ${time}`);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Email send error:", err);
    return new Response(JSON.stringify({ success: false, error: "Email failed" }), { status: 500 });
  }
}
