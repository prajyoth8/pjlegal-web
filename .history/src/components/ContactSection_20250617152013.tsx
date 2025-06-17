"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // ✅ New state for phone number
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone,
      message,
    });
    setLoading(false);

    if (error) toast.error("Submission failed");
    else {
      toast.success("Message sent successfully");
      setName("");
      setEmail("");
      setPhone(""); // ✅ Reset phone
      setMessage("");
    }
  };

  return (
    <section id="contact" className="bg-gray-100 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-black dark:text-black">
          Contact Us
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-700"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-700"
          />
          <input
            type="tel"
            placeholder="Your Contact Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-700"
          />
          <textarea
            rows={4}
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-700"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
