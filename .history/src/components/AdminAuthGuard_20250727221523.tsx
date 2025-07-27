// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("admin_token");
//     if (!token) {
//       router.replace("/admin"); // login page
//     } else {
//       setChecked(true); // ✅ Authenticated, show page
//     }
//   }, []);

//   if (!checked) {
//     return <div className="p-6 text-center text-gray-400">🔐 Authenticating...</div>;
//   }

//   return <>{children}</>;
// }
