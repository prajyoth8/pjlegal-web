// 📁 src/app/contact/page.tsx
"use client";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <ContactForm />
    </div>
  );
}
