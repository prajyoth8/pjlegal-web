// ✅ 1. ContactSection.tsx (Enhanced layout with visible social icons)
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message)
      return toast.error("Please fill all fields");
    if (!isValidEmail(email)) return toast.error("Enter a valid email address");

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
      setPhone("");
      setMessage("");
    }
  };

  return (
    <section id="contact" className="bg-gray-100 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white text-black"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white text-black"
              />
              <input
                type="tel"
                placeholder="Your Contact Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white text-black"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white text-black"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* Social Icons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-white">
              <a
                href="tel:+918712351102"
                className="text-green-500 hover:text-green-600 text-2xl"
              >
                <FaPhoneAlt />
              </a>
              <a
                href="mailto:pjlegal.r@gmail.com"
                className="text-red-500 hover:text-red-600 text-2xl"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://wa.me/918712351102"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 text-2xl"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                className="text-blue-600 hover:text-blue-700 text-xl"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="text-pink-500 hover:text-pink-600 text-xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="text-blue-400 hover:text-blue-500 text-xl"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="text-sky-400 hover:text-sky-500 text-xl"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Addresses + Maps */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                Hyderabad Office
              </h3>
              <p className="text-gray-800 dark:text-gray-300 mb-2">
                PJ LEGAL
                <br />
                Prakashnagar, Begumpet,
                <br />
                Hyderabad, Telangana 500001
                <br />
                India
              </p>
              <iframe
                src="https://www.google.com/maps/embed?..."
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg shadow-md"
              ></iframe>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                Karimnagar Office
              </h3>
              <p className="text-gray-800 dark:text-gray-300 mb-2">
                PJ LEGAL
                <br />
                Christian Colony,
                <br />
                Karimnagar, Telangana 505001
                <br />
                India
              </p>
              <iframe
                src="https://www.google.com/maps/embed?..."
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg shadow-md"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
