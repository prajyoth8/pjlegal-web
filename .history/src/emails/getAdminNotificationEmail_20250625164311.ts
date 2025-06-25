export function getAdminNotificationEmail(
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string
) {
  return {
    subject: `📥 New Inquiry Received from ${name}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9fafb; padding: 20px; color: #1f2937;">
        <table width="100%" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">

          <!-- Top Branding Banner -->
          <tr>
            <td style="background: linear-gradient(to right, #f59e0b, #d97706); text-align: center; padding: 10px 20px;">
              <span style="color: white; font-size: 18px; font-weight: 600;">PJ LEGAL — New Client Inquiry</span>
            </td>
          </tr>

          <!-- Logo -->
          <tr style="background-color: #111827;">
            <td style="padding: 20px; text-align: center;">
              <img src="https://pjlegal.in/pj_logo_white.png" alt="PJ Legal Logo" style="height: 60px;" />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin-top: 0; color: #111827;">📨 New Contact Message</h2>
              <p style="line-height: 1.7; font-size: 15px;">
                You’ve received a new inquiry from PJ Legal's website’s contact form.
              </p>

              <!-- Message Summary -->
              <table cellpadding="6" cellspacing="0" width="100%" style="font-size: 14px; margin-top: 20px;">
                <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
                <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
                <tr><td><strong>Phone:</strong></td><td>${phone || "N/A"}</td></tr>
                <tr><td><strong>Subject:</strong></td><td>${subject || "No Subject"}</td></tr>
                <tr><td colspan="2" style="padding-top: 10px;"><strong>Message:</strong><br/>${message}</td></tr>
              </table>

              <p style="margin-top: 30px;">
                🔁 <a href="mailto:${email}" style="color: #f59e0b;">Reply to ${name}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr style="background-color: #f3f4f6;">
            <td style="padding: 20px; text-align: center;">
              <p style="font-size: 14px; font-weight: 600; margin-bottom: 10px; color: #374151;">Follow us</p>
              <div style="margin-bottom: 10px;">
                <a href="https://wa.me/918712351102" style="margin: 0 6px;">
                  <img src="https://cdn-icons-png.flaticon.com/24/733/733585.png" alt="WhatsApp" />
                </a>
                <a href="https://facebook.com" style="margin: 0 6px;">
                  <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" />
                </a>
                <a href="https://instagram.com" style="margin: 0 6px;">
                  <img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" alt="Instagram" />
                </a>
                <a href="https://linkedin.com" style="margin: 0 6px;">
                  <img src="https://cdn-icons-png.flaticon.com/24/733/733561.png" alt="LinkedIn" />
                </a>
                <a href="https://twitter.com" style="margin: 0 6px;">
                  <img src="https://cdn-icons-png.flaticon.com/24/733/733579.png" alt="Twitter" />
                </a>
              </div>
              <p style="font-size: 13px; color: #6b7280;">
                📍 Karimnagar Office: Ashok Nagar, Telangana<br/>
                📍 Hyderabad Office: Begumpet, Telangana
              </p>
              <p style="font-size: 12px; color: #6b7280; margin-top: 8px;">
                &copy; ${new Date().getFullYear()} PJ Legal. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </div>
    `,
  };
}
