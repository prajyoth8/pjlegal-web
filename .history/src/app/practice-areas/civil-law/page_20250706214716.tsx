import Image from "next/image";
import Link from "next/link";
import { Gavel, BookOpenCheck, Scale } from "lucide-react";

export default function CivilLawPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 text-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT: Content */}
        <div>
          <div className="flex items-center gap-2 mb-4 text-purple-700">
            <Gavel className="w-6 h-6" />
            <h1 className="text-4xl font-bold">Civil Law</h1>
          </div>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            At <strong>PJ Legal</strong>, we provide comprehensive legal support for civil matters
            affecting individuals, businesses, and institutions. Civil law governs private disputes
            that are non-criminal in nature, including matters related to property, contracts,
            family disputes, and damages.
          </p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-gray-800">
              <BookOpenCheck className="w-5 h-5 text-green-600" />
              Our Civil Law Services Include:
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Partition and inheritance disputes</li>
              <li>Recovery suits and money claims</li>
              <li>Specific performance and contract enforcement</li>
              <li>Property disputes and encroachment cases</li>
              <li>Landlord–tenant matters</li>
              <li>Civil appeals and revisions</li>
              <li>Injunctions and declaratory reliefs</li>
            </ul>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href="/#consultation"
              className="bg-purple-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 transition"
            >
              Book a Consultation
            </Link>
            <Link
              href="/#contact"
              className="text-purple-700 underline font-medium hover:text-purple-900"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="hidden lg:block">
          <Image
            src="/assets/law-civil-balance.png" // ⬅️ Put a relevant image here
            alt="Civil Law"
            width={600}
            height={400}
            className="rounded-xl shadow-md object-cover"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="mt-16 border-t border-gray-300 pt-8 text-center text-sm text-gray-500">
        PJ Legal – Trusted Civil Law Practice in Telangana
      </div>
    </div>
  );
}
