// ✅ ContactSection.tsx (Responsive with collapsible addresses on mobile)
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) return toast.error("Please fill all fields");
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

  const offices = [
    {
      title: "Hyderabad Office",
      address: "Prakashnagar, Begumpet,\nHyderabad, Telangana 500001\nIndia",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.403565590368!2d78.47449297507577!3d17.437462501899507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9732d5dbeb55%3A0x7e5b4e07e8e1cbf4!2sTelangana%20High%20Court!5e0!3m2!1sen!2sin!4v1687349493170!5m2!1sen!2sin",
    },
    {
      title: "Karimnagar Office",
      address: "Christian Colony,\nKarimnagar, Telangana 505001\nIndia",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3802.046119289376!2d79.1275685746987!3d18.438555872018245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcced5d1fd0d9e5%3A0xe06a1d24de71c748!2sKarimnagar%20District%20Court!5e0!3m2!1sen!2sin!4v1687393001833!5m2!1sen!2sin",
    },
  ];

  return (
    <section id="contact" className="bg-gray-100 dark:bg-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 h-full"
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
              rows={5}
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

          {/* Address Section */}
          <div className="flex flex-col gap-6">
            {offices.map((office, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <button
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  className="w-full text-left text-xl font-semibold text-black dark:text-white mb-2 focus:outline-none"
                >
                  {office.title}
                </button>
                {(expanded === index || typeof window === 'undefined' || window.innerWidth >= 768) && (
                  <>
                    <p className="whitespace-pre-line text-gray-800 dark:text-gray-300 mb-3">
                      PJ LEGAL<br />{office.address}
                    </p>
                    <iframe
                      src={office.map}
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="rounded-lg shadow-md"
                    ></iframe>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
