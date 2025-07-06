"use client";

import { useState } from "react";
import { ShieldCheck, Lock, Cpu, Bug, GlobeLock, UserSearch, FileLock2, Network, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import ConsultationModal from "@/components/ConsultationModal";
import PracticeDetailLayout from "@/components/PracticeDetailLayout";

const services = [
  {
    title: "Data Privacy & Protection",
    description: "GDPR, Indian PDP Bill, and enterprise data compliance services for businesses and professionals.",
    icon: <Lock className="w-5 h-5" />
  },
  {
    title: "Cybercrime & Fraud Defense",
    description: "Legal assistance for victims of cyberstalking, financial fraud, impersonation, and hacking.",
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    title: "AI & Algorithmic Accountability",
    description: "Advisory on ethical AI use, deepfakes, automated decisions, and algorithm transparency.",
    icon: <Cpu className="w-5 h-5" />
  },
  {
    title: "Digital Contracts & E-Signatures",
    description: "Drafting, reviewing, and enforcing smart contracts, NDAs, and digital agreements.",
    icon: <FileLock2 className="w-5 h-5" />
  },
  {
    title: "Cyber Compliance for Startups",
    description: "Helping tech founders navigate cyber laws, platform liabilities, and IP concerns.",
    icon: <Network className="w-5 h-5" />
  },
  {
    title: "Social Media & Reputation",
    description: "Legal recourse against defamation, doxxing, revenge porn, and social media abuse.",
    icon: <UserSearch className="w-5 h-5" />
  }
];

export default function CyberLawPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PracticeDetailLayout title="Cyber Law & Digital Rights" icon={<GlobeLock className="w-6 h-6" />}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Intro Section */}
        <section className="text-center mb-16">
          <motion.h1
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Modern Legal Solutions for the Digital World
          </motion.h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We protect your digital rights, ensure compliance, and defend against online threats. From AI regulations to cybercrime — we’re with you at every byte.
          </p>
        </section>

        {/* Service Tiles */}
        <section className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-3 text-blue-600">
                  <div className="bg-blue-50 p-3 rounded-lg">{service.icon}</div>
                  <h3 className="font-semibold text-lg text-gray-800">{service.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Cyber Law Matters */}
        <section className="mb-20 bg-gradient-to-r from-blue-50 to-purple-50 p-10 rounded-3xl border border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Cyber Law Is Critical Today</h2>
            <ul className="text-gray-700 space-y-3 text-left list-disc list-inside">
              <li>India saw over 1.6 lakh cybercrime cases in 2023 alone – <strong>protection is no longer optional</strong>.</li>
              <li>Data privacy regulations like <strong>DPDP Bill</strong> affect every digital business and professional.</li>
              <li>AI-generated content, deepfakes, and automated frauds need fast legal remedies.</li>
              <li><strong>Social media misuse</strong> is growing — users must know their rights and legal options.</li>
            </ul>
          </div>
        </section>

        {/* CTA Block */}
        <section className="text-center">
          <h3 className="text-2xl font-semibold mb-4">Facing a digital legal issue?</h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Get expert advice within 24 hours. We handle urgent issues like impersonation, fraud, and data leaks swiftly.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition"
          >
            Request Immediate Consultation
          </button>
        </section>

        <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </PracticeDetailLayout>
  );
}
