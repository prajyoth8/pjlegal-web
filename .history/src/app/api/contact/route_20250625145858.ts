// app/api/contact/route.ts
import nodemailer from "nodemailer";

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

  const mailOptions = {
    from: `"PJ Legal" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL,
    subject: `📩 New Contact Message: ${subject || "No Subject"}`,
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Subject:</strong> ${subject || "Not provided"}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Email send error:", err);
    return new Response(JSON.stringify({ success: false, error: "Email failed" }), { status: 500 });
  }
}
