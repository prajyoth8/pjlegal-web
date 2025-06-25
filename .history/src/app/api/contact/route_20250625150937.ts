// app/api/contact/route.ts
import nodemailer from "nodemailer";
import { getContactConfirmationEmail } from "@/emails/contact_confirmation_email";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, phone, subject, message } = body;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { html, subject } = getContactConfirmationEmail(name); // name from request.body

  await transporter.sendMail({
    from: `"PJ Legal" <${process.env.EMAIL_USER}>`,
    to: email, // recipient's email from form
    subject,
    html,
  });
}
