"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import UploadModal from "./UploadModal";


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
  const [categories, setCategories] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [editRow, setEditRow] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ category: string; region: string }>({
    category: "",
    region: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);


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

  const fetchFilters = async () => {
    try {
      const res = await fetch("/api/legal-docs/filters");
      const data = await res.json();
      setCategories(data.categories || []);
      setRegions(data.regions || []);
    } catch (err) {
      console.error("Error loading filters");
    }
  };

  useEffect(() => {
    fetchFilters();
    fetchDocuments();
  }, [search, category, region]);

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

  const handleEditClick = (doc: LegalDocument) => {
    setEditRow(doc.id);
    setEditData({ category: doc.category, region: doc.region });
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`/api/update-legal-document`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...editData }),
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success("Document updated");
      setEditRow(null);
      fetchDocuments();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  const totalPages = Math.ceil(documents.length / pageSize);
  const paginatedDocs = documents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
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
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border p-2 rounded-md w-full"
          >
            <option value="">All Regions</option>
            {regions.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
        </div>
        <Link
          href="/upload"
          className="ml-4 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded"
        >
          ➕ Upload
        </Link>
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

                  <td className="p-2 border">
                    {editRow === doc.id ? (
                      <select
                        value={editData.category}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        className="border rounded px-2 py-1"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    ) : (
                      doc.category
                    )}
                  </td>

                  <td className="p-2 border">
                    {editRow === doc.id ? (
                      <select
                        value={editData.region}
                        onChange={(e) => setEditData({ ...editData, region: e.target.value })}
                        className="border rounded px-2 py-1"
                      >
                        {regions.map((reg) => (
                          <option key={reg} value={reg}>
                            {reg}
                          </option>
                        ))}
                      </select>
                    ) : (
                      doc.region
                    )}
                  </td>

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
                    {editRow === doc.id ? (
                      <button
                        onClick={() => handleSave(doc.id)}
                        className="text-green-600 hover:underline"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(doc)}
                        className="text-yellow-600 hover:underline"
                      >
                        Edit
                      </button>
                    )}
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
