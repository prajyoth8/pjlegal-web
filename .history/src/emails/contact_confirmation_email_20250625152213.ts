export function getContactConfirmationEmail(name: string) {
  return {
    subject: `✅ Thank you for contacting PJ Legal`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9fafb; padding: 20px; color: #1f2937;">
        <table width="100%" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
          
          <!-- Header with Logo -->
          <tr style="background-color: #111827;">
            <td style="padding: 20px; text-align: center;">
              <img src="https://pjlegal.in/pj_logo_white.png" alt="PJ Legal Logo" style="height: 60px;" />
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 10px 0; color: #111827;">👋 Hello <span style="color: #f59e0b;">${name}</span>,</h2>

              <p style="line-height: 1.7; font-size: 15px;">
                Thank you for reaching out to <strong style="color: #f59e0b;">PJ Legal</strong>.
                Your message has been received and one of our legal professionals will get back to you within <strong style="color: #10b981;">24 hours</strong>.
              </p>

              <p style="line-height: 1.7; font-size: 15px;">
                In case of urgent legal matters, don’t hesitate to contact us directly:
              </p>

              <div style="margin: 20px 0; line-height: 1.6;">
                📞 <strong>Phone:</strong>
                <a href="tel:+918712351102" style="color: #2563eb; text-decoration: none;"> +91 87123 51102</a><br/>
                📧 <strong>Email:</strong>
                <a href="mailto:pjlegal.r@gmail.com" style="color: #2563eb; text-decoration: none;"> pjlegal.r@gmail.com</a>
              </div>

              <p style="line-height: 1.7; font-size: 15px;">
                We appreciate your trust in our legal services and will treat your query with utmost confidentiality.
              </p>

              <p style="margin-top: 30px; font-size: 14px;">
                Sincerely,<br/>
                <strong style="color: #f59e0b;">PJ Legal Team</strong><br/>
                <em style="color: #6b7280;">Your Trusted Legal Partner</em>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
              &copy; ${new Date().getFullYear()} <strong>PJ Legal</strong>. All rights reserved.
            </td>
          </tr>
        </table>
      </div>
    `,
  };
}
