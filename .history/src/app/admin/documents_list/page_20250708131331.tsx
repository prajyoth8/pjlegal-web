"use client";

import Link from "next/link";
import DocumentList from "@/components/DocumentList";

export default function AdminDocumentsListPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">📂 Legal Document Manager</h1>
          <Link href="/admin" className="text-sm text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
        <DocumentList />
      </div>
    </div>
  );
}
