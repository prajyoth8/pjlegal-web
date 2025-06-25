"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Calendar } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 87123 51102"],
      link: "tel:+918712351102",
      clickable: true,
    },
    {
      icon: Mail,
      title: "Email",
      details: ["pjlegal.r@gmail.com"],
      link: "mailto:pjlegal.r@gmail.com",
      clickable: true,
    },
  ];

  

  const officeAddresses = [
    {
      title: "Karimnagar Office",
      details: ["Karimnagar, Telangana"],
      map: "https://www.google.com/maps/embed?...2608292",
    },
    {
      title: "Hyderabad Office",
      details: ["Prakash Nagar, Begumpet, Hyderabad"],
      map: "https://www.google.com/maps/embed?...2240236",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get in <span className="text-amber-500">Touch</span>
          </h2>
          <p className="text-slate-300">
            Contact us for a consultation and navigate legal challenges with us.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <div
                key={i}
                className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 hover:border-amber-500 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-amber-500 p-2 rounded-md">
                    {info.clickable ? (
                      <a href={info.link} target="_blank" rel="noopener noreferrer">
                        <info.icon className="text-white w-5 h-5" />
                      </a>
                    ) : (
                      <info.icon className="text-white w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{info.title}</h4>
                    {info.details.map((d, j) => (
                      <p key={j} className="text-slate-300 text-sm">
                        {d}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center: Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 space-y-6"
            >
              <h3 className="text-white text-xl font-bold mb-2">Send us a Message</h3>
              <input
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="Full Name"
                required
                className="w-full p-3 bg-slate-700 text-white rounded-md"
              />
              <input
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Email"
                required
                className="w-full p-3 bg-slate-700 text-white rounded-md"
              />
              <input
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                placeholder="Phone"
                className="w-full p-3 bg-slate-700 text-white rounded-md"
              />
              <input
                name="subject"
                onChange={handleChange}
                value={formData.subject}
                placeholder="Subject"
                required
                className="w-full p-3 bg-slate-700 text-white rounded-md"
              />
              <textarea
                name="message"
                rows="4"
                onChange={handleChange}
                value={formData.message}
                placeholder="Your message..."
                required
                className="w-full p-3 bg-slate-700 text-white rounded-md"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-md w-full flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" /> Send Message
              </button>
            </form>

            {/* Socials */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm mb-2">Follow us</p>
              <div className="flex justify-center gap-4 text-2xl">
                <a href="#" className="text-green-500">
                  <FaWhatsapp />
                </a>
                <a href="#" className="text-blue-600">
                  <FaFacebookF />
                </a>
                <a href="#" className="text-pink-600">
                  <FaInstagram />
                </a>
                <a href="#" className="text-blue-400">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="text-sky-500">
                  <FaXTwitter />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Office Maps */}
          <div className="space-y-6">
            {officeAddresses.map((office, i) => (
              <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <h4 className="text-white font-semibold mb-2">{office.title}</h4>
                {office.details.map((d, j) => (
                  <p key={j} className="text-slate-300 text-sm mb-2">
                    {d}
                  </p>
                ))}
                <iframe
                  src={office.map}
                  className="w-full h-48 rounded-md border border-slate-700"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center">
          <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-xl font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Schedule Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
