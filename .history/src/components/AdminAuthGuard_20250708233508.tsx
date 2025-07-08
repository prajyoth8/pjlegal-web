"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Wait until we check token

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      router.replace("/admin"); // Redirect to login
    } else {
      setIsLoading(false); // Show page only if token exists
    }
  }, []);

  if (isLoading) {
    return <div className="p-6 text-center text-gray-500">🔐 Verifying session...</div>;
  }

  return <>{children}</>;
}
