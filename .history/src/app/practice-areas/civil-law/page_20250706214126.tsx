// import PracticeDetailLayout from "@/components/PracticeDetailLayout";

// export default function CivilLawPage() {
//   return (
//     <PracticeDetailLayout
//       title="Civil Law"
//       description="Civil law encompasses a broad range of legal issues that affect individuals and organizations. At PJ Legal, we help you navigate disputes that are non-criminal in nature."
//       points={[
//         "Breach of contracts",
//         "Property and tenancy disputes",
//         "Consumer protection matters",
//         "Partition and inheritance issues",
//         "Civil injunctions and recovery suits",
//       ]}
//     />
//   );
// }

import PracticeDetailLayout from "@/components/PracticeDetailLayout";
import Image from "next/image";

export default function CivilLawPage() {
  return (
    <PracticeDetailLayout
      title="Building Excellence in Civil Law"
      description="As a passionate new advocate specializing in civil matters, I bring fresh perspective combined with rigorous legal training to help resolve disputes effectively. While early in my career, I approach each case with meticulous attention to detail and commitment to justice, guided by senior mentors in complex matters."
      points={[
        "Contract disputes - analysis, mediation, and resolution",
        "Property conflicts including tenant rights and ownership issues",
        "Consumer protection cases with focus on fair resolution",
        "Inheritance and succession matters with family-sensitive approach",
        "Debt recovery through structured legal processes",
        "Civil injunctions for protection of rights and property",
        "Negligence claims with emphasis on fair compensation",
        "Alternative dispute resolution to avoid prolonged litigation"
      ]}
    >
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/young-lawyer-consulting.jpg" // Suggested image
            alt="Young lawyer consulting with client"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-purple-800 mb-4">My Approach to Civil Law</h3>
          <p className="text-gray-700 mb-4">
            As a new practitioner, I combine up-to-date legal education with hands-on mentorship experience to provide:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>Clear explanations of legal processes</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>Cost-effective case strategies</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>Regular communication and updates</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              <span>Ethical, client-centered representation</span>
            </li>
          </ul>
        </div>
      </div>
    </PracticeDetailLayout>
  );
}