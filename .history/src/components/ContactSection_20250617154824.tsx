// ✅ 1. ContactSection.tsx (Trendy layout + full enhancements)
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, Facebook, Instagram, Linkedin, Twitter, MapPin } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const addresses = [
  {
    title: "Hyderabad Office",
    lines: [
      "PJ LEGAL",
      "Prakashnagar, Begumpet",
      "Hyderabad, Telangana 500001",
      "India",
    ],
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.403565590368!2d78.47449297507577!3d17.437462501899507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9732d5dbeb55%3A0x7e5b4e07e8e1cbf4!2sTelangana%20High%20Court!5e0!3m2!1sen!2sin!4v1687349493170!5m2!1sen!2sin",
  },
  {
    title: "Karimnagar Office",
    lines: [
      "PJ LEGAL",
      "Christian Colony",
      "Karimnagar, Telangana 505001",
      "India",
    ],
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3802.046119289376!2d79.1275685746987!3d18.438555872018245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcced5d1fd0d9e5%3A0xe06a1d24de71c748!2sKarimnagar%20District%20Court!5e0!3m2!1sen!2sin!4v1687393001833!5m2!1sen!2sin",
  },
];

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) return toast.error("Please fill all fields");
    if (!isValidEmail(email)) return toast.error("Enter a valid email address");

    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({ name, email, phone, message });
    setLoading(false);

    if (error) toast.error("Submission failed");
    else {
      toast.success("Thanks for contacting PJ Legal! We’ll get back soon.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
  };

  return (
    <section id="contact" className="bg-gray-100 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12 text-black dark:text-white"
        >
          Contact Us
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-white text-black"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-white text-black"
              />
              <input
                type="tel"
                placeholder="Your Contact Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-white text-black"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-white text-black"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded font-medium"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="mt-8 flex justify-center">
              <Image
                src="/assets/pj_logo.png"
                alt="PJ Legal Logo"
                width={100}
                height={100}
                className="opacity-80"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            {addresses.map((office, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{office.title}</h3>
                <p className="text-gray-800 dark:text-gray-300 mb-3">
                  {office.lines.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </p>
                <iframe
                  src={office.mapUrl}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg shadow-md"
                ></iframe>
                <div className="flex mt-4 gap-3 flex-wrap">
                  <a
                    href="https://wa.me/918712351102"
                    target="_blank"
                    className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded"
                  >
                    <MessageSquare size={16} /> WhatsApp
                  </a>
                  <a href="tel:+918712351102" className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded">
                    <Phone size={16} /> Call Now
                  </a>
                  <a
                    href="mailto:pjlegal.r@gmail.com"
                    className="flex items-center gap-1 px-3 py-1 bg-gray-700 text-white text-sm rounded"
                  >
                    <Mail size={16} /> Email
                  </a>
                </div>
              </div>
            ))}
            <div className="flex gap-4 justify-center mt-4">
              <a href="https://facebook.com" target="_blank" className="text-blue-600 hover:scale-110 transition"><Facebook /></a>
              <a href="https://instagram.com" target="_blank" className="text-pink-500 hover:scale-110 transition"><Instagram /></a>
              <a href="https://linkedin.com" target="_blank" className="text-blue-800 hover:scale-110 transition"><Linkedin /></a>
              <a href="https://twitter.com" target="_blank" className="text-sky-500 hover:scale-110 transition"><Twitter /></a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
