"use client";

import DocumentList from "@/components/DocumentList";

export default function AdminDocumentsListPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">📂 Legal Document Manager</h1>
        <DocumentList />
      </div>
    </div>
  );
}
