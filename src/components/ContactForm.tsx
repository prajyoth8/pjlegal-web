"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ContactForm() {
  const supabase = createClientComponentClient();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("contact_messages")
      .insert([formData]);

    if (error) {
      toast.error("Failed to submit. Please try again.");
    } else {
      toast.success("Your message has been sent!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }

    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border dark:border-gray-700"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Contact Us
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />

        <input
          name="subject"
          type="text"
          placeholder="Subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />

        <textarea
          name="message"
          rows={5}
          placeholder="Your Message"
          required
          value={formData.message}
          onChange={handleChange}
          className="p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 w-full py-3 rounded-md text-white font-semibold transition duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
        >
          {loading ? "Submitting..." : "Send Message"}
        </button>
      </div>
    </motion.form>
  );
}
