export function getAdminConsultationAlertEmail({
  full_name,
  email,
  phone,
  preferred_date,
  preferred_time,
  purpose,
}: {
  full_name: string;
  email: string;
  phone?: string;
  preferred_date?: string;
  preferred_time?: string;
  purpose?: string;
}) {
  return {
    subject: `📥 New Consultation Booking by ${full_name}`,
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>🗓 New Consultation Booking</h2>
      <p><strong>Name:</strong> ${full_name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Date:</strong> ${preferred_date}</p>
      <p><strong>Time:</strong> ${preferred_time}</p>
      <p><strong>Purpose:</strong><br/>${purpose}</p>
    </div>`,
  };
}
