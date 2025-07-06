// "use client";

// import Link from "next/link";

// const simplifiedPracticeAreas = [
//   { name: "Civil Law", slug: "civil-law" },
//   { name: "Constitutional Law", slug: "constitutional-law" },
//   { name: "Corporate Laws", slug: "corporate-laws" },
//   { name: "Criminal Law", slug: "criminal-law" },
//   { name: "Election Law", slug: "election-law" },
//   { name: "Family Law", slug: "family-law" },
//   { name: "Labour Law", slug: "labour-law" },
//   { name: "Property Law", slug: "property-law" },
//   { name: "Real Estate RERA", slug: "real-estate-rera" },
//   { name: "Service Law", slug: "service-law" },
// ];

// export default function PracticeSection() {
//   return (
//     <section id="practice" className="py-16 bg-gray-50 text-black">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-3xl font-bold mb-8 text-center">Practice Areas</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {simplifiedPracticeAreas.map(({ name, slug }) => (
//             <Link
//               key={slug}
//               href={`/practice-areas/${slug}`}
//               className="block bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg hover:border-purple-400 transition"
//             >
//               <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
