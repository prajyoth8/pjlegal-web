import nodemailer from "nodemailer";
import { getContactConfirmationEmail } from "@/emails/contact_confirmation_email";
import { getAdminNotificationEmail } from "@/emails/getAdminNotificationEmail";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, subject, message } = body;

  // Set up SMTP transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false, // Use TLS (not SSL) for port 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Admin Notification Email
  const adminNotification = getAdminNotificationEmail(name, email, phone, subject, message);
  const adminMailOptions = {
    from: `"PJ Legal Website" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL, // pjlegal.r@gmail.com
    subject: adminNotification.subject,
    html: adminNotification.html,
  };

  // User Confirmation Email
  const userConfirmation = getContactConfirmationEmail(name, email, phone, subject, message);
  const userMailOptions = {
    from: `"PJ Legal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: userConfirmation.subject,
    html: userConfirmation.html,
  };

  try {
    // Send Admin notification
    await transporter.sendMail(adminMailOptions);

    // Send User confirmation
    await transporter.sendMail(userMailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Email send error:", err);
    return new Response(JSON.stringify({ success: false, error: "Email failed" }), { status: 500 });
  }
}
