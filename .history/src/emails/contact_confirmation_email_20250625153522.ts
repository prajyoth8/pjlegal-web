export function getContactConfirmationEmail(name: string, email: string, phone: string, subject: string, message: string) {
  return {
    subject: `✅ Thank you for contacting PJ Legal`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9fafb; padding: 20px; color: #1f2937;">
        <table width="100%" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
          
          <!-- Top Branding Banner -->
          <tr>
            <td style="background: linear-gradient(to right, #f59e0b, #d97706); text-align: center; padding: 10px 20px;">
              <span style="color: white; font-size: 18px; font-weight: 600;">PJ LEGAL — Your Trusted Legal Partner</span>
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
              <h2 style="margin-top: 0; color: #111827;">👋 Hello <span style="color: #f59e0b;">${name}</span>,</h2>
              <p style="line-height: 1.7; font-size: 15px;">
                Thank you for contacting <strong style="color: #f59e0b;">PJ Legal</strong>.  
                We have received your message and will respond within 
                <strong style="color: #10b981;">24 hours</strong>.
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

              

              <p style="margin-top: 30px;">
                Best regards,<br/>
                <strong style="color: #f59e0b;">PJ Legal Team</strong><br/>
                <em style="color: #6b7280;">Karimnagar & Hyderabad</em>
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
