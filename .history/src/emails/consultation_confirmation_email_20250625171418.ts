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
            <p><strong>Details:</strong></p>
            <ul>
              <li>📅 Date: ${preferred_date}</li>
              <li>⏰ Time: ${preferred_time}</li>
              <li>📝 Purpose: ${purpose}</li>
            </ul>
            <p>We will get back to you within 24 hours to confirm your appointment.</p>
            <p>If urgent, feel free to call us directly:</p>
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
