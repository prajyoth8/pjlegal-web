"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Calendar, Send, CheckCircle, Clock } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { name, email, phone, subject, message } = formData;

  const { error } = await supabase.from("contact_messages").insert([
    {
      name,
      email,
      phone,
      subject,
      message,
      submitted_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    toast.error("❌ Failed to send message. Please try again.");
  } else {
    toast.success("✅ Message sent successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  }
};


  const phoneMailCards = [
    {
      icon: Phone,
      title: "Phone",
      detail: "+91 87123 51102",
      link: "tel:+918712351102",
    },
    {
      icon: Mail,
      title: "Email",
      detail: "pjlegal.r@gmail.com",
      link: "mailto:pjlegal.r@gmail.com",
    },
  ];

  const addressCards = [
    {
      title: "Karimnagar Office",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60561.20757594816!2d79.09194859174164!3d18.434882034129032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bccd910bcf48931%3A0x4889b0398ed69f07!2sKarimnagar%2C%20Telangana!5e0!3m2!1sen!2sin!4v1750162608292!5m2!1sen!2sin",
    },
    {
      title: "Hyderabad Office",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.382526149176!2d78.46648702591123!3d17.441396051245547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90a5d40aa43f%3A0x759891c5155b2eac!2sPrakash%20Nagar%2C%20Begumpet%2C%20Hyderabad%2C%20Telangana%20500016!5e0!3m2!1sen!2sin!4v1750162240236!5m2!1sen!2sin",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Touch
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Reach out via phone, email, or use the form to connect with PJ Legal.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Phone + Mail */}
          <div className="md:col-span-3 space-y-6">
            {phoneMailCards.map((item, i) => (
              <div key={i} className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <a
                      href={item.link}
                      className="text-amber-400 hover:text-amber-300 block text-sm"
                    >
                      {item.detail}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <button className="mt-4 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Free Consultation
            </button>
          </div>

          {/* Center: Form */}
          <div className="md:col-span-6">
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
              <h3 className="text-white text-xl font-semibold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject *"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Message *"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="input-field resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm uppercase mb-2 tracking-wide">Connect with us</p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://wa.me/918712351102"
                  className="text-green-500 hover:scale-110 text-2xl transition"
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
                  <FaXTwitter />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Office Maps */}
          <div className="md:col-span-3 space-y-6">
            {addressCards.map((office, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden"
              >
                <h4 className="text-white px-4 py-2 font-medium border-b border-slate-700">
                  {office.title}
                </h4>
                <iframe
                  src={office.map}
                  title={office.title}
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-48"
                ></iframe>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: CheckCircle,
              title: "Confidential",
              desc: "Client information stays private",
            },
            {
              icon: Clock,
              title: "24/7 Support",
              desc: "Available anytime for emergencies",
            },
            {
              icon: Phone,
              title: "Quick Response",
              desc: "We respond within 24 hours",
            },
          ].map((item, idx) => (
            <div key={idx}>
              <item.icon className="mx-auto text-amber-500 w-10 h-10 mb-3" />
              <h5 className="text-white font-semibold">{item.title}</h5>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Input field styling */}
      <style jsx>{`
        .input-field {
          background-color: rgba(51, 65, 85, 0.5);
          border: 1px solid #334155;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          width: 100%;
          color: white;
          placeholder-color: #94a3b8;
          outline: none;
          transition: border 0.3s;
        }
        .input-field:focus {
          border-color: #f59e0b;
          box-shadow: 0 0 0 1px #f59e0b;
        }
      `}</style>
    </section>
  );
}
