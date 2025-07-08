// /components/DocumentList.tsx
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export type LegalDocument = {
  id: string;
  title: string;
  summary: string;
  category: string;
  region: string;
  tags: string;
  file_url: string;
  uploaded_at: string;
};

export default function DocumentList() {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category", category);
      if (region) params.append("region", region);

      const res = await fetch(`/api/get-legal-documents?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Failed to fetch documents");
      setDocuments(data.documents);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [search, category, region]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">📄 Uploaded Legal Documents</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Search by title or summary"
          className="border p-2 rounded-md w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="📂 Filter by category"
          className="border p-2 rounded-md w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="🌍 Filter by region"
          className="border p-2 rounded-md w-full"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading documents...</p>
      ) : documents.length === 0 ? (
        <p className="text-gray-500">No documents found.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Region</th>
              <th className="p-2 border">Tags</th>
              <th className="p-2 border">Uploaded At</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="p-2 border text-sm font-medium">{doc.title}</td>
                <td className="p-2 border text-sm">{doc.category}</td>
                <td className="p-2 border text-sm">{doc.region}</td>
                <td className="p-2 border text-sm text-gray-500">{doc.tags}</td>
                <td className="p-2 border text-sm">
                  {new Date(doc.uploaded_at).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
