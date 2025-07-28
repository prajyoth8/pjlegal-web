"use client";

import EducationClientRenderer from "./EducationClientRenderer";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function EducationClientPage() {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("id");
  const router = useRouter();

  if (!topicId) return <div>Invalid topic ID.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.push("/insights?type=education")}
        className="flex items-center text-blue-600 dark:text-blue-300 hover:underline mb-6"
      >
        <ArrowLeft className="mr-2" size={18} /> Back to Education List
      </button>

      <EducationClientRenderer id={topicId} />
    </div>
  );
}
