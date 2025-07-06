"use client";

import PracticeDetailLayout from "@/components/PracticeDetailLayout";
import { useState } from "react";
import Image from "next/image";
import { Gavel, BookOpenCheck, ArrowRight, X } from "lucide-react";

const services = [
  {
    title: "Partition and inheritance disputes",
    description:
      "We help resolve family and ancestral property disputes through fair division, succession analysis, and court-supervised partition suits.",
  },
  {
    title: "Recovery suits and money claims",
    description:
      "If someone owes you money and refuses to pay, we file recovery suits to secure your rightful claims through civil courts.",
  },
  {
    title: "Specific performance and contract enforcement",
    description:
      "We ensure contractual obligations are fulfilled — including sale agreements, service contracts, and breach resolutions.",
  },
  {
    title: "Property disputes and encroachment cases",
    description:
      "We handle disputes related to illegal possession, boundaries, easements, and land ownership with thorough documentation and legal action.",
  },
  {
    title: "Landlord–tenant matters",
    description:
      "We represent both landlords and tenants in rent control issues, evictions, maintenance disputes, and lease enforcement.",
  },
  {
    title: "Civil appeals and revisions",
    description:
      "Challenging a lower court decision? We file appeals and revisions before higher courts to seek justice.",
  },
  {
    title: "Injunctions and declaratory reliefs",
    description:
      "We obtain court orders to prevent wrongful acts, and get declarations for rights, status, or title where necessary.",
  },
];

export default function CivilLawPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <PracticeDetailLayout title="Civil Law" icon={<Gavel className="w-6 h-6" />}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-lg text-gray-800 mb-6 leading-relaxed">
            Civil law governs private rights and obligations between individuals, families, or
            businesses. At <strong>PJ Legal</strong>, we guide clients through disputes involving
            property, contracts, succession, and money recovery.
          </p>

          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <BookOpenCheck className="w-5 h-5 text-green-600" />
            Key Civil Law Services
          </h2>

          <ul className="space-y-4">
            {services.map((service, i) => (
              <li
                key={i}
                className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition cursor-pointer"
                onClick={() => setActiveIndex(i)}
              >
                <span className="text-gray-800 font-medium">{service.title}</span>
                <ArrowRight className="text-purple-600" />
              </li>
            ))}
          </ul>

          <div className="mt-8 flex gap-4">
            <a
              href="/#consultation"
              className="bg-purple-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 transition"
            >
              Book a Consultation
            </a>
            <a
              href="/#contact"
              className="text-purple-700 underline font-medium hover:text-purple-900"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:block">
          <Image
            src="/assets/law-civil-balance.png"
            alt="Civil Law"
            width={600}
            height={400}
            className="rounded-xl shadow-md object-cover"
          />
        </div>
      </div>

      {/* MODAL */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white max-w-lg w-full p-6 rounded-xl relative shadow-xl">
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-3 text-purple-700">
              {services[activeIndex].title}
            </h3>
            <p className="text-gray-700">{services[activeIndex].description}</p>
          </div>
        </div>
      )}
    </PracticeDetailLayout>
  );
}
