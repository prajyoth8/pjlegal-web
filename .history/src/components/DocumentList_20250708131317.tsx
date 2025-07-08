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

const pageSize = 10;

export default function DocumentList() {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this document?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/delete-legal-document?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Document deleted");
      fetchDocuments();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [search, category, region]);

  const totalPages = Math.ceil(documents.length / pageSize);
  const paginatedDocs = documents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Search title/summary"
          className="border p-2 rounded-md w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-md w-full"
        >
          <option value="">All Categories</option>
          <option value="Cyber Law">Cyber Law</option>
          <option value="Contract Law">Contract Law</option>
          <option value="Criminal Law">Criminal Law</option>
        </select>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border p-2 rounded-md w-full"
        >
          <option value="">All Regions</option>
          <option value="Telangana">Telangana</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Delhi">Delhi</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading documents...</p>
      ) : paginatedDocs.length === 0 ? (
        <p className="text-gray-500">No documents found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Region</th>
                <th className="p-2 border">Tags</th>
                <th className="p-2 border">Uploaded</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="p-2 border font-medium">{doc.title}</td>
                  <td className="p-2 border">{doc.category}</td>
                  <td className="p-2 border">{doc.region}</td>
                  <td className="p-2 border text-gray-500">{doc.tags}</td>
                  <td className="p-2 border">{new Date(doc.uploaded_at).toLocaleDateString()}</td>
                  <td className="p-2 border space-x-2">
                    <a href={doc.file_url} download className="text-blue-600 hover:underline">
                      Download
                    </a>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
            <div className="space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
