import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for insert access
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, date, time } = body;

  // Save to Supabase
  const { error } = await supabase.from("consultations").insert([
    { name, email, phone, date, time },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }

  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const adminMail = {
    from: `"PJ Legal Website" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL,
    subject: "📅 New Consultation Booking",
    html: `
      <h2>New Consultation Requested</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
    `,
  };

  const userMail = {
    from: `"PJ Legal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Your Consultation Booking is Confirmed`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 24px;">
        <h2 style="color:#111827;">Dear ${name},</h2>
        <p>Thank you for scheduling a consultation with <strong>PJ Legal</strong>.</p>
        <p>📅 <strong>Date:</strong> ${date}<br/>⏰ <strong>Time:</strong> ${time}</p>
        <p>We will contact you soon to confirm the meeting details.</p>
        <br/>
        <p>Warm regards,<br/><strong>PJ Legal Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Email send error:", err);
    return new Response(JSON.stringify({ success: false, error: "Email failed" }), { status: 500 });
  }
}
