// "use client";

// import Link from "next/link";

// export default function PracticeDetailLayout({
//   title,
//   description,
//   points,
// }: {
//   title: string;
//   description: string;
//   points?: string[];
// }) {
//   return (
//     <div className="min-h-screen bg-white text-black py-16 px-4 max-w-4xl mx-auto">
//       <Link href="/#practice" className="text-blue-600 text-sm mb-4 inline-block">
//         ← Back to Practice Areas
//       </Link>
//       <h1 className="text-4xl font-bold mb-6 text-purple-800">{title}</h1>
//       <p className="text-lg mb-6 text-gray-700">{description}</p>
//       {points?.length ? (
//         <ul className="list-disc list-inside text-gray-800 space-y-2">
//           {points.map((pt, i) => (
//             <li key={i}>{pt}</li>
//           ))}
//         </ul>
//       ) : null}
//     </div>
//   );
// }


