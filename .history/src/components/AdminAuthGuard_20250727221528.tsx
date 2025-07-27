"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Check Supabase session first
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!session || error) {
          throw new Error("No session");
        }

        // 2. Verify user is admin
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("is_admin")
          .eq("id", session.user.id)
          .single();

        if (!profile?.is_admin || profileError) {
          await supabase.auth.signOut();
          throw new Error("Not admin");
        }

        // 3. If everything checks out
        setChecked(true);
      } catch (err) {
        console.error("Auth check failed:", err);
        router.replace("/admin");
      }
    };

    checkAuth();
  }, [router]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-400 animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}

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
