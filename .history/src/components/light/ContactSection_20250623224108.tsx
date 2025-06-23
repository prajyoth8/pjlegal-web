"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Calendar,
} from "lucide-react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: POST to Supabase or backend endpoint
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 87123 51102"],
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["pjlegal.r@gmail.com"],
      action: "Send Email",
    },
    {
      icon: MapPin,
      title: "Office - Karimnagar",
      details: ["Karimnagar, Telangana"],
      action: "Get Directions",
    },
    {
      icon: MapPin,
      title: "Office - Hyderabad",
      details: ["Prakash Nagar, Begumpet, Hyderabad"],
      action: "Get Directions",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 9:00 AM - 6:00 PM", "24/7 Emergency Support"],
      action: "Schedule Meeting",
    },
  ];

  const legalAreas = [
    "Corporate Law",
    "Family Law",
    "Real Estate Law",
    "Criminal Defense",
    "Civil Litigation",
    "Employment Law",
    "Constitutional Law",
    "Banking & Finance",
    "Other",
  ];

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in{" "}
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ready to discuss your legal needs? Contact us today for a consultation and let us help
            you navigate your legal challenges.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-slate-300 text-sm mb-1">
                          {detail}
                        </p>
                      ))}
                      <button className="text-amber-400 text-sm font-medium hover:text-amber-300 transition mt-2">
                        {info.action} →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-4">
              <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Free Consultation
              </button>
              <button className="w-full border-2 border-amber-500 text-amber-400 p-4 rounded-xl font-semibold hover:bg-amber-500 hover:text-white transition-all flex items-center justify-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Live Chat Support
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
                <p className="text-slate-300">We’ll respond within 24 hours.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                      placeholder="Subject of your message"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none"
                    placeholder="Brief about your legal issue..."
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="mt-1 w-4 h-4 text-amber-500 bg-slate-700 border-slate-600 rounded"
                  />
                  <label htmlFor="consent" className="text-sm text-slate-300">
                    I agree to the privacy policy and allow PJ Legal to contact me.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: CheckCircle,
              title: "Confidential",
              desc: "All communications are protected by attorney-client privilege",
            },
            {
              icon: Clock,
              title: "Quick Response",
              desc: "We respond to all inquiries within 24 hours",
            },
            {
              icon: Phone,
              title: "24/7 Emergency",
              desc: "Emergency legal support available around the clock",
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <item.icon className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
              <p className="text-slate-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Embedded Map */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Karimnagar */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-2">Karimnagar Office</h4>
            <iframe
              title="Karimnagar Map"
              className="w-full h-80 rounded-xl border border-slate-800"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60561.20757594816!2d79.09194859174164!3d18.434882034129032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bccd910bcf48931%3A0x4889b0398ed69f07!2sKarimnagar%2C%20Telangana!5e0!3m2!1sen!2sin!4v1750162608292!5m2!1sen!2sin"
            ></iframe>
          </div>

          {/* Hyderabad */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-2">Hyderabad Office</h4>
            <iframe
              title="Hyderabad Map"
              className="w-full h-80 rounded-xl border border-slate-800"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.382526149176!2d78.46648702591123!3d17.441396051245547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90a5d40aa43f%3A0x759891c5155b2eac!2sPrakash%20Nagar%2C%20Begumpet%2C%20Hyderabad%2C%20Telangana%20500016!5e0!3m2!1sen!2sin!4v1750162240236!5m2!1sen!2sin"
            ></iframe>
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-xl text-white font-semibold mb-4">Connect with us</h3>
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
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
