// // src/app/admin/dashboard/page.tsx
// "use client";

// import { useRouter } from "next/navigation";

// export default function AdminDashboard() {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-8">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-10 text-blue-800">
//           👨‍⚖️ PJ Legal Admin Dashboard
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           <div
//             className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-blue-300 transition cursor-pointer border hover:border-blue-600"
//             onClick={() => router.push("/admin/keywords")}
//           >
//             <h2 className="text-xl font-semibold mb-2 text-gray-800">📝 Manage Keywords</h2>
//             <p className="text-sm text-gray-500">Add, edit or delete banned and legal keywords</p>
//           </div>

//           {/* Future Tiles Here */}
//           {/* <div className="...">Cases</div> */}
//         </div>
//       </div>
//     </div>
//   );
// }
