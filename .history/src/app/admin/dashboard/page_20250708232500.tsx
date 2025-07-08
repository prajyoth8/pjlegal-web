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

"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AdminAuthGuard from "@/components/AdminAuthGuard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!session || error) {
        router.push("/admin");
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("is_admin, email")
        .eq("id", session.user.id)
        .single();

      if (!profile?.is_admin) {
        await supabase.auth.signOut();
        router.push("/admin");
        return;
      }

      setUserEmail(profile.email);
      setIsLoading(false);
    };

    checkSession();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin");
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AdminAuthGuard>{/* Your dashboard content here */}</AdminAuthGuard>
    
  );
}
