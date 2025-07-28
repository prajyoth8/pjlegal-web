"use client";

import { useSearchParams } from "next/navigation";
import EducationList from "@/components/insights/EducationList";
import EducationClientRenderer from "@/components/insights/EducationClientRenderer";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EducationClientPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Legal Education</h1>

      {!id && (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-3xl leading-relaxed">
            Welcome to our Legal Education section. Here, we simplify the law for everyday citizens
            — helping you understand your rights, common legal processes, and practical tips to stay
            legally empowered in India.
          </p>
          <EducationList />
        </>
      )}

      {id && (
        <>
          <button
            onClick={() => router.push("/education")}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Education Overview
          </button>
          <EducationClientRenderer id={id} />
        </>
      )}
    </main>
  );
}
