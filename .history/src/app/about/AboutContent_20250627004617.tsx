"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import HybridLayout from "@/components/layout/HybridLayout";
import { Link } from "lucide-react";

const faqs = [
  {
    q: "What areas of law does PJ Legal specialize in?",
    a: "We cover Civil, Criminal, Family, Property, Corporate, and Constitutional Law.",
  },
  {
    q: "Can I book consultations online?",
    a: "Yes, you can book via our website through the 'Book a Consultation' button.",
  },
  {
    q: "What sets PJ Legal apart?",
    a: "Our unique blend of legal expertise, tech background, and AI insights brings smarter legal solutions.",
  },
  {
    q: "Is PJ Legal available for High Court matters?",
    a: "Yes, we handle matters at district and High Court levels.",
  },
];

export default function AboutContent() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-amber-50 text-gray-900 px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold text-center text-amber-700"
        >
          About PJ Legal
        </motion.h1>

        {/* Avatar + Bio Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <Image
              src="/assets/lawyer_profile_black.png"
              alt="PJ Legal Founder"
              width={240}
              height={240}
              className="rounded-full border-4 border-amber-500 shadow-xl object-cover"
            />
            <p className="text-center mt-4 italic text-amber-600">
              “From Software to Supreme Law – Navigating with Intelligence.”
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 space-y-6"
          >
            <p className="text-lg leading-relaxed text-gray-800">
              PJ Legal is founded by an individual who transitioned from an extensive IT career to
              law with a vision to bring clarity, efficiency, and empathy into legal service
              delivery.
            </p>
            <p className="text-gray-700">
              With years of experience as a <strong>Salesforce Developer</strong> and{" "}
              <strong>SAP Security Architect</strong>, backed by academic excellence in{" "}
              <strong>Artificial Intelligence from IIT Roorkee</strong> and dual management degrees,
              I’ve now dedicated my energy and purpose to the legal profession.
            </p>
            <p className="text-gray-700">
              Having completed my LLB and embracing the values of justice and truth, PJ Legal is
              committed to assisting clients with informed legal solutions—bridging tradition with
              technology.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              {/* <button
                onClick={() => router.push("/contact")}
                className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full shadow-lg transition"
              >
                📞 Contact Me
              </button> */}
              <Link
                href="#contact"
                className="bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105"
              >
                📞 Contact Me
              </Link>
              <button
                onClick={() => router.push("/booking")}
                className="bg-white border border-amber-600 text-amber-700 px-5 py-2 rounded-full shadow-md hover:bg-amber-100 transition"
              >
                📅 Book a Consultation
              </button>
            </div>
          </motion.div>
        </div>

        {/* Timeline + FAQ */}
        <div className="grid md:grid-cols-2 gap-12 mt-20">
          <div>
            <h2 className="text-2xl font-semibold text-amber-700">📅 Career Timeline</h2>
            <ul className="border-l-4 border-amber-500 pl-6 space-y-6 mt-4">
              <li>
                <div className="font-bold text-gray-800">🎓 Bachelor's in IT</div>
                <p className="text-gray-700">Built a strong technical foundation</p>
              </li>
              <li>
                <div className="font-bold text-gray-800">🎓 MBA in HR & Info Systems</div>
                <p className="text-gray-700">Blended management and IT expertise</p>
              </li>
              <li>
                <div className="font-bold text-gray-800">💼 Salesforce & SAP Roles</div>
                <p className="text-gray-700">Worked across tech domains solving complex problems</p>
              </li>
              <li>
                <div className="font-bold text-gray-800">🤖 PG in AI from IIT Roorkee</div>
                <p className="text-gray-700">Mastered AI for smart solutions</p>
              </li>
              <li>
                <div className="font-bold text-gray-800">⚖️ LLB & Legal Practice</div>
                <p className="text-gray-700">Embarked on a purpose-driven legal journey</p>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-amber-100 via-yellow-50 to-white p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">
              ❓ Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white border border-amber-200 rounded-lg p-4 shadow transition-all duration-300"
                >
                  <summary className="font-semibold cursor-pointer text-gray-800 group-open:text-amber-700">
                    {item.q}
                  </summary>
                  <p className="mt-2 text-gray-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
