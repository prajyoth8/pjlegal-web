import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import getConsultationConfirmationEmail from "@/emails/consultation_confirmation_email";
import  getAdminConsultationAlertEmail from "@/emails/consultation_admin_alert";

import nodemailer from "nodemailer";

// Supabase Admin Client (server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { full_name, email, phone, preferred_date, preferred_time, purpose, calendly_event_id } =
    body;

  // 1. Insert into Supabase
  const { data, error } = await supabase.from("consultation_bookings").insert([
    {
      full_name,
      email,
      phone,
      preferred_date,
      preferred_time,
      purpose,
      calendly_event_id,
    },
  ]);

  if (error) {
    console.error("❌ Supabase error:", error);
    return NextResponse.json({ success: false, error: "Database insert failed" }, { status: 500 });
  }

  // 2. Setup Nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // 3. Send confirmation email to user
    const userMail = getConsultationConfirmationEmail({
      full_name,
      email,
      preferred_date,
      preferred_time,
      purpose,
    });

    await transporter.sendMail({
      from: `"PJ Legal" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: userMail.subject,
      html: userMail.html,
    });

    // 4. Send alert to admin
    const adminMail = getAdminConsultationAlertEmail({
      full_name,
      email,
      phone,
      preferred_date,
      preferred_time,
      purpose,
    });

    await transporter.sendMail({
      from: `"PJ Legal Website" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL!,
      subject: adminMail.subject,
      html: adminMail.html,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("❌ Email sending error:", err);
    return NextResponse.json({ success: false, error: "Email failed" }, { status: 500 });
  }
}
