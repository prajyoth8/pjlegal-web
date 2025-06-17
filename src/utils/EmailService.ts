export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function sendContactEmail(data: ContactFormData) {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Email sending failed");
    return result;
  } catch (error) {
    throw error;
  }
}
