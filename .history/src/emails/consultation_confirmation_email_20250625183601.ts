export function getConsultationConfirmationEmail({
  full_name,
  email,
  preferred_date,
  preferred_time,
  purpose,
}: {
  full_name: string;
  email: string;
  preferred_date: string;
  preferred_time: string;
  purpose: string;
}) {
  // Construct Google Calendar event link
  const startDateTime = new Date(`${preferred_date} ${preferred_time}`);
  const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // +30 min

  const toGoogleDateTime = (dt: Date) =>
    dt.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=PJ%20Legal%20Consultation&dates=${toGoogleDateTime(
    startDateTime
  )}/${toGoogleDateTime(
    endDateTime
  )}&details=${encodeURIComponent(
    purpose
  )}&location=${encodeURIComponent("PJ Legal Office or Online")}&sf=true&output=xml`;

  return {
    subject: "✅ Your PJ Legal Consultation Request is Received",
    html: `
    <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:20px;">
      <table style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden;">
        <tr style="background:#111827;">
          <td style="text-align:center; padding:20px;">
            <img src="https://pjlegal.in/pj_logo_white.png" style="height:50px;" />
          </td>
        </tr>
        <tr>
          <td style="padding:30px;">
            <h2>Hello ${full_name},</h2>
            <p>Thank you for booking a consultation with <strong>PJ Legal</strong>.</p>

            <div style="background:#f3f4f6; padding:15px; border-radius:8px; margin-top:20px;">
              <h3 style="margin:0 0 10px;">📌 Scheduled Details:</h3>
              <p><strong>📅 Date:</strong> ${preferred_date}</p>
              <p><strong>⏰ Time:</strong> ${preferred_time}</p>
              <p><strong>📝 Purpose:</strong> ${purpose}</p>
            </div>

            <div style="margin-top:25px;">
              <a href="${googleCalendarLink}" target="_blank" style="display:inline-block; margin:10px 10px 0 0; background:#0f766e; color:white; padding:10px 16px; text-decoration:none; border-radius:6px;">
                ➕ Add to Google Calendar
              </a>
              <a href="mailto:${email}?subject=Consultation Follow-up" style="display:inline-block; background:#1d4ed8; color:white; padding:10px 16px; text-decoration:none; border-radius:6px;">
                ✉️ Contact Us
              </a>
            </div>

            <p style="margin-top:30px;">We’ll get back to you within 24 hours to confirm the slot officially.</p>

            <p>If urgent, feel free to reach out:</p>
            <p>
              📞 <a href="tel:+918712351102">+91 87123 51102</a><br/>
              📧 <a href="mailto:pjlegal.r@gmail.com">pjlegal.r@gmail.com</a>
            </p>
            <br/>
            <p>Regards,<br/><strong>PJ Legal Team</strong></p>
          </td>
        </tr>
        <tr style="background:#f3f4f6; text-align:center;">
          <td style="padding:15px; font-size:12px;">
            © ${new Date().getFullYear()} PJ Legal • Karimnagar & Hyderabad
          </td>
        </tr>
      </table>
    </div>`,
  };
}
