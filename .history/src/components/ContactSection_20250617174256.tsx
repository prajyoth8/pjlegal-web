"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import SuccessModal from "./SuccessModal";
import { sendContactEmail } from "@/utils/EmailService";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#contact") {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, message } = form;

    if (!name || !email || !phone || !message)
      return toast.error("Please fill all fields");
    if (!isValidEmail(email)) return toast.error("Enter a valid email address");

    setLoading(true);

    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, phone, message });
    await sendContactEmail({ name, email, phone, message }); // send email via backend

    setLoading(false);
    if (error) toast.error("Submission failed");
    else {
      setShowSuccess(true);
      toast.success("Message sent!");
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-gray-100 dark:bg-gray-900 py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* 📩 Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
            >
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white text-black"
              />
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white text-black"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Your Contact Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white text-black"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
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

            {/* 🌐 Social Icons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918712351102"
                className="text-green-600 hover:scale-110 text-3xl transition"
              >
                <FaPhoneAlt />
              </a>
              <a
                href="mailto:pjlegal.r@gmail.com"
                className="text-red-600 hover:scale-110 text-3xl transition"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://wa.me/918712351102"
                className="text-green-500 hover:scale-110 text-3xl transition"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://facebook.com"
                className="text-blue-600 hover:scale-110 text-2xl transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                className="text-pink-600 hover:scale-110 text-2xl transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                className="text-blue-400 hover:scale-110 text-2xl transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://twitter.com"
                className="text-sky-500 hover:scale-110 text-2xl transition"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* 🗺️ Address + Map */}
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
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.382526149176!2d78.46648702591123!3d17.441396051245547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90a5d40aa43f%3A0x759891c5155b2eac!2sPrakash%20Nagar%2C%20Begumpet%2C%20Hyderabad%2C%20Telangana%20500016!5e0!3m2!1sen!2sin!4v1750162240236!5m2!1sen!2sin"
                width="600"
                height="450"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
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
                Christian Colony,
                <br />
                Karimnagar, Telangana 505001
              </p>
              <iframe
                src="https://www.google.com/maps/place/Karimnagar,+Telangana/@18.434882,79.0919486,13z/data=!3m1!4b1!4m6!3m5!1s0x3bccd910bcf48931:0x4889b0398ed69f07!8m2!3d18.4385553!4d79.1288412!16zL20vMDMxYzJk?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D" // replace with real map
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg shadow-md"
              />
            </motion.div>
          </div>
        </div>

        {/* 📱 Floating Mobile Buttons */}
        <div className="md:hidden fixed bottom-6 right-4 flex flex-col items-end space-y-3 z-50">
          <a
            href="tel:+918712351102"
            className="bg-green-600 text-white p-3 rounded-full shadow-md hover:scale-105 transition"
          >
            <FaPhoneAlt size={20} />
          </a>
          <a
            href="https://wa.me/918712351102"
            className="bg-green-500 text-white p-3 rounded-full shadow-md hover:scale-105 transition"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>

      {/* 🎉 Modal */}
      <SuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
    </section>
  );
}
