"use client";

import PracticeDetailLayout from "@/components/PracticeDetailLayout";
import { useState } from "react";
import Image from "next/image";
import { Gavel, BookOpenCheck, ArrowRight, X } from "lucide-react";

const services = [
  {
    title: "Partition and Inheritance Disputes",
    description:
      "We handle property division under the Hindu Succession Act, 1956 and Indian Succession Act, 1925. Matters include intestate succession, coparcenary rights, and partition suits.",
  },
  {
    title: "Money Recovery & Civil Suits",
    description:
      "Under Order 37 of the CPC (Summary Suits), and Indian Contract Act, 1872, we file recovery suits for unpaid dues, bounced cheques (NI Act), and breach of monetary obligations.",
  },
  {
    title: "Specific Performance & Injunctions",
    description:
      "Under the Specific Relief Act, 1963 (esp. Sections 10, 14, 20), we seek orders to enforce contracts or prohibit unlawful acts via temporary/permanent injunctions (Order 39 CPC).",
  },
  {
    title: "Property & Encroachment Issues",
    description:
      "We handle ownership disputes, encroachments, easements, and title suits. Key laws include Transfer of Property Act, 1882 and Easements Act, 1882.",
  },
  {
    title: "Landlord-Tenant Disputes",
    description:
      "Handled under state-specific Rent Control Acts (e.g., Telangana Buildings (Lease, Rent & Eviction) Control Act, 1960), covering evictions, arrears, and tenancy terms.",
  },
  {
    title: "Civil Appeals & Revisions",
    description:
      "We handle civil appeals under Sections 96-100 CPC and revisions under Section 115 CPC for errors in lower court decisions.",
  },
  {
    title: "Declaratory & Injunctive Reliefs",
    description:
      "Declaratory suits (S.34 of the Specific Relief Act) and perpetual injunctions (S.38-42) help protect rights and prevent wrongs before they occur.",
  },
];

export default function CivilLawPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <PracticeDetailLayout title="Civil Law" icon={<Gavel className="w-6 h-6" />}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2">
          <p className="text-lg text-gray-800 mb-6 leading-relaxed">
            <strong>Civil Law</strong> governs private disputes between individuals, families, and
            institutions. At <strong>PJ Legal</strong>, we specialize in protecting civil rights,
            securing remedies, and resolving complex legal conflicts across property, money, and
            contractual domains.
          </p>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <BookOpenCheck className="w-5 h-5 text-green-600" />
              Core Legal Areas Covered
            </h2>

            <ul className="space-y-4">
              {services.map((service, i) => (
                <li
                  key={i}
                  className="bg-purple-50 rounded-md p-4 border border-purple-200 hover:bg-purple-100 flex justify-between items-center cursor-pointer transition"
                  onClick={() => setActiveIndex(i)}
                >
                  <span className="text-gray-800 font-medium">{service.title}</span>
                  <ArrowRight className="text-purple-600" />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
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
            src="/assets/law-civil-balance.jpg"
            alt="Civil Law Scales"
            width={400}
            height={300}
            className="rounded-xl shadow-md object-cover"
          />
        </div>
      </div>

      {/* MODAL */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
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
