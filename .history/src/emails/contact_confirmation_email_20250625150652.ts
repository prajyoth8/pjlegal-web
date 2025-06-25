export function getContactConfirmationEmail(name: string) {
  return {
    subject: `Thank you for contacting PJ Legal`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9fafb; color: #1f2937;">
        <table width="100%" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden;">
          <tr style="background-color: #111827;">
            <td style="padding: 20px; text-align: center;">
              <img src="https://pjlegal.in/logo/pjlegal_logo_dark.png" alt="PJ Legal Logo" style="height: 50px;" />
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin-top: 0; color: #111827;">Dear ${name},</h2>
              <p style="line-height: 1.6;">
                Thank you for getting in touch with <strong>PJ Legal</strong>.  
                We have received your message and one of our legal professionals will respond to you within 24 hours.
              </p>

              <p style="line-height: 1.6;">For urgent legal matters, feel free to contact us directly at:</p>
              <ul style="line-height: 1.6;">
                <li>📞 <a href="tel:+918712351102" style="color: #f59e0b;">+91 87123 51102</a></li>
                <li>📧 <a href="mailto:pjlegal.r@gmail.com" style="color: #f59e0b;">pjlegal.r@gmail.com</a></li>
              </ul>

              <p style="line-height: 1.6;">We appreciate your trust in us.</p>

              <p style="margin-top: 30px;">
                Best regards,<br/>
                <strong>PJ Legal Team</strong><br/>
                <em>Your Trusted Legal Partner</em>
              </p>
            </td>
          </tr>
          <tr style="background-color: #f3f4f6; text-align: center;">
            <td style="padding: 15px; font-size: 12px; color: #6b7280;">
              © ${new Date().getFullYear()} PJ Legal. All rights reserved.
            </td>
          </tr>
        </table>
      </div>
    `,
  };
}
