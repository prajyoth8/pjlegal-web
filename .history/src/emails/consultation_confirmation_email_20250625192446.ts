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

  const toGoogleDateTime = (dt: Date) => dt.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=PJ%20Legal%20Consultation&dates=${toGoogleDateTime(
    startDateTime
  )}/${toGoogleDateTime(endDateTime)}&details=${encodeURIComponent(
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
          <h2 style="margin-bottom:10px;">Hello ${full_name},</h2>
          <p>✅ <strong>Your consultation request has been received!</strong></p>
          <p>Thank you for choosing <strong>PJ Legal</strong>.</p>

          <table style="margin-top:20px; margin-bottom:20px;">
            <tr><td><strong>📅 Date:</strong></td><td>${preferred_date}</td></tr>
            <tr><td><strong>⏰ Time:</strong></td><td>${preferred_time}</td></tr>
            <tr><td><strong>📝 Purpose:</strong></td><td>${purpose}</td></tr>
          </table>

          <p>We will contact you within 24 hours to confirm the appointment.</p>

          <div style="margin-top:20px; text-align:center;">
            <a 
              href="https://calendar.google.com/calendar/u/0/r/eventedit?text=PJ+Legal+Consultation&dates=${preferred_date.replace(/-/g, '')}T${preferred_time.replace(':', '')}00Z/${preferred_date.replace(/-/g, '')}T${preferred_time.replace(':', '')}30Z&details=${encodeURIComponent(purpose)}&location=PJ+Legal" 
              style="background:linear-gradient(to right,#4f46e5,#3b82f6); color:white; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:bold;" 
              target="_blank"
            >
              ➕ Add to Google Calendar
            </a>
          </div>

          <p style="margin-top:30px;">📞 <a href="tel:+918712351102">+91 87123 51102</a><br/>
          📧 <a href="mailto:pjlegal.r@gmail.com">pjlegal.r@gmail.com</a></p>

          <p>Regards,<br/><strong>PJ Legal Team</strong></p>
        </td>
      </tr>
      <tr style="background:#f3f4f6; text-align:center;">
        <td style="padding:15px; font-size:12px;">
          © ${new Date().getFullYear()} PJ Legal • Karimnagar & Hyderabad
        </td>
      </tr>
    </table>
  </div>
`,

  };
}
