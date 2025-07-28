// "use client";

// import { useEffect, useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// import EducationSections from "./EducationSections";

// export default function EducationClientPage() {
//   const [mounted, setMounted] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <div className="space-y-8">
//       <button
//         onClick={() => router.push("/insights?type=education")}
//         className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
//       >
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to Education Overview
//       </button>

//       <EducationSections />
//     </div>
//   );
// }
