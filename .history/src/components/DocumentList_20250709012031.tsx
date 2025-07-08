// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import Link from "next/link";
// import UploadModal from "./UploadModal";

// export type LegalDocument = {
//   id: string;
//   title: string;
//   summary: string;
//   category: string;
//   region: string;
//   tags: string;
//   file_url: string;
//   uploaded_at: string;
// };

// const pageSize = 10;

// export default function DocumentList() {
//   const [documents, setDocuments] = useState<LegalDocument[]>([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [region, setRegion] = useState("");
//   const [categories, setCategories] = useState<string[]>([]);
//   const [regions, setRegions] = useState<string[]>([]);
//   const [editRow, setEditRow] = useState<string | null>(null);
//   const [editData, setEditData] = useState<{ category: string; region: string }>({
//     category: "",
//     region: "",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showUploadModal, setShowUploadModal] = useState(false);

//   const fetchDocuments = async () => {
//     try {
//       const params = new URLSearchParams();
//       if (search) params.append("search", search);
//       if (category) params.append("category", category);
//       if (region) params.append("region", region);

//       const res = await fetch(`/api/get-legal-documents?${params.toString()}`);
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.detail || "Failed to fetch documents");
//       setDocuments(data.documents);
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchFilters = async () => {
//     try {
//       const res = await fetch("/api/legal-docs/filters");
//       const data = await res.json();
//       setCategories(data.categories || []);
//       setRegions(data.regions || []);
//     } catch (err) {
//       console.error("Error loading filters");
//     }
//   };

//   useEffect(() => {
//     fetchFilters();
//     fetchDocuments();
//   }, [search, category, region]);

//   const handleDelete = async (id: string) => {
//     const confirmed = confirm("Are you sure you want to delete this document?");
//     if (!confirmed) return;

//     try {
//       const res = await fetch(`/api/delete-legal-document?id=${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Failed to delete");
//       toast.success("Document deleted");
//       fetchDocuments();
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed");
//     }
//   };

//   const handleEditClick = (doc: LegalDocument) => {
//     setEditRow(doc.id);
//     setEditData({ category: doc.category, region: doc.region });
//   };

//   const handleSave = async (id: string) => {
//     try {
//       const res = await fetch(`/api/update-legal-document`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, ...editData }),
//       });
//       if (!res.ok) throw new Error("Failed to update");
//       toast.success("Document updated");
//       setEditRow(null);
//       fetchDocuments();
//     } catch (err) {
//       console.error(err);
//       toast.error("Update failed");
//     }
//   };

//   const totalPages = Math.ceil(documents.length / pageSize);
//   const paginatedDocs = documents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
//           <input
//             type="text"
//             placeholder="🔍 Search title/summary"
//             className="border p-2 rounded-md w-full"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="border p-2 rounded-md w-full"
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//           <select
//             value={region}
//             onChange={(e) => setRegion(e.target.value)}
//             className="border p-2 rounded-md w-full"
//           >
//             <option value="">All Regions</option>
//             {regions.map((reg) => (
//               <option key={reg} value={reg}>
//                 {reg}
//               </option>
//             ))}
//           </select>
//         </div>

//       </div>
//       <div className="flex justify-between mb-4">
//           <h2 className="text-xl font-semibold">📚 Filter Legal Documents</h2>
//           <button
//             onClick={() => setShowUploadModal(true)}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             + Upload
//           </button>
//         </div>

//       {isLoading ? (
//         <p className="text-gray-500">Loading documents...</p>
//       ) : paginatedDocs.length === 0 ? (
//         <p className="text-gray-500">No documents found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full table-auto border-collapse text-sm">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 border">Title</th>
//                 <th className="p-2 border">Category</th>
//                 <th className="p-2 border">Region</th>
//                 <th className="p-2 border">Tags</th>
//                 <th className="p-2 border">Uploaded</th>
//                 <th className="p-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedDocs.map((doc) => (
//                 <tr key={doc.id} className="hover:bg-gray-50">
//                   <td className="p-2 border font-medium">{doc.title}</td>

//                   <td className="p-2 border">
//                     {editRow === doc.id ? (
//                       <select
//                         value={editData.category}
//                         onChange={(e) => setEditData({ ...editData, category: e.target.value })}
//                         className="border rounded px-2 py-1"
//                       >
//                         {categories.map((cat) => (
//                           <option key={cat} value={cat}>
//                             {cat}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       doc.category
//                     )}
//                   </td>

//                   <td className="p-2 border">
//                     {editRow === doc.id ? (
//                       <select
//                         value={editData.region}
//                         onChange={(e) => setEditData({ ...editData, region: e.target.value })}
//                         className="border rounded px-2 py-1"
//                       >
//                         {regions.map((reg) => (
//                           <option key={reg} value={reg}>
//                             {reg}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       doc.region
//                     )}
//                   </td>

//                   <td className="p-2 border text-gray-500">{doc.tags}</td>
//                   <td className="p-2 border">{new Date(doc.uploaded_at).toLocaleDateString()}</td>
//                   <td className="p-2 border space-x-2">
//                     <a href={doc.file_url} download className="text-blue-600 hover:underline">
//                       Download
//                     </a>
//                     <button
//                       onClick={() => handleDelete(doc.id)}
//                       className="text-red-600 hover:underline"
//                     >
//                       Delete
//                     </button>
//                     {editRow === doc.id ? (
//                       <button
//                         onClick={() => handleSave(doc.id)}
//                         className="text-green-600 hover:underline"
//                       >
//                         Save
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => handleEditClick(doc)}
//                         className="text-yellow-600 hover:underline"
//                       >
//                         Edit
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="flex justify-between items-center mt-4">
//             <p className="text-sm text-gray-500">
//               Page {currentPage} of {totalPages}
//             </p>
//             <div className="space-x-2">
//               <button
//                 onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                 className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//                 disabled={currentPage === 1}
//               >
//                 Prev
//               </button>
//               <button
//                 onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//                 className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <UploadModal
//         isOpen={showUploadModal}
//         onClose={() => {
//           setShowUploadModal(false);
//           fetchDocuments();
//         }}
//       />
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import UploadModal from "./UploadModal";
import { motion } from "framer-motion";

export type LegalDocument = {
  id: string;
  title: string;
  summary: string;
  category: string;
  region: string;
  tags?: string | null;
  file_url: string;
  uploaded_at: string;
};

const pageSize = 10;

export default function DocumentList() {
  const [allDocuments, setAllDocuments] = useState<LegalDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<LegalDocument[]>([]);
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
      setIsLoading(true);
      const res = await fetch('/api/get-legal-documents');
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to fetch documents");
      setAllDocuments(data.documents);
      setFilteredDocuments(data.documents);
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
  }, []);

  // Apply filters whenever search, category or region changes
  useEffect(() => {
    let results = [...allDocuments];
    
    if (search) {
      const searchTerm = search.toLowerCase();
      results = results.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm) || 
        (doc.summary && doc.summary.toLowerCase().includes(searchTerm))
      );
    }
    
    if (category) {
      results = results.filter(doc => doc.category === category);
    }
    
    if (region) {
      results = results.filter(doc => doc.region === region);
    }
    
    setFilteredDocuments(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [search, category, region, allDocuments]);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this document?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/delete-legal-document?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Document deleted");
      fetchDocuments(); // Refresh the list
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
      fetchDocuments(); // Refresh the list
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  const totalPages = Math.ceil(filteredDocuments.length / pageSize);
  const paginatedDocs = filteredDocuments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen p-6">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-2xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          Legal Document Repository
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-emerald-500/20"
        >
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Upload Document
          </span>
        </motion.button>
      </motion.div>

      {/* Filter Controls */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-neutral-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search documents..."
            className="block w-full pl-10 pr-3 py-2.5 rounded-lg border-neutral-800 bg-neutral-900 focus:border-emerald-400 focus:ring-emerald-400/30 text-sm border shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full pl-3 pr-10 py-2.5 rounded-lg border-neutral-800 bg-neutral-900 focus:border-emerald-400 focus:ring-emerald-400/30 text-sm border shadow-sm appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjd2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1rem]"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-neutral-900">
              {cat}
            </option>
          ))}
        </select>

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="block w-full pl-3 pr-10 py-2.5 rounded-lg border-neutral-800 bg-neutral-900 focus:border-emerald-400 focus:ring-emerald-400/30 text-sm border shadow-sm appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjd2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1rem]"
        >
          <option value="">All Regions</option>
          {regions.map((reg) => (
            <option key={reg} value={reg} className="bg-neutral-900">
              {reg}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Document Table */}
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12"
        >
          <div className="w-12 h-12 border-2 border-transparent border-t-emerald-400 rounded-full animate-spin mb-4"></div>
          <p className="text-neutral-400">Loading documents...</p>
        </motion.div>
      ) : filteredDocuments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-neutral-900/50 rounded-xl border border-neutral-800 p-8 text-center"
        >
          <svg
            className="mx-auto h-12 w-12 text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-neutral-200">No documents found</h3>
          <p className="mt-1 text-sm text-neutral-500">
            Try adjusting your search or filter criteria
          </p>
          {(search || category || region) && (
            <button
              onClick={() => {
                setSearch('');
                setCategory('');
                setRegion('');
              }}
              className="mt-4 text-sm text-emerald-400 hover:text-emerald-300"
            >
              Clear all filters
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-xl border border-neutral-800 shadow-lg"
        >
          <table className="min-w-full divide-y divide-neutral-800">
            <thead className="bg-neutral-900">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
                >
                  Region
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
                >
                  Tags
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
                >
                  Uploaded
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-neutral-900/50 divide-y divide-neutral-800">
              {paginatedDocs.map((doc) => (
                <motion.tr 
                  key={doc.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-200">
                    {doc.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                    {editRow === doc.id ? (
                      <select
                        value={editData.category}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        className="block w-full pl-3 pr-8 py-1.5 rounded-md border-neutral-700 bg-neutral-800 focus:border-emerald-400 focus:ring-emerald-400/30 text-sm border shadow-sm"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat} className="bg-neutral-900">
                            {cat}
                          </option>
                        ))}
                      </select>
                    ) : (
                      doc.category
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                    {editRow === doc.id ? (
                      <select
                        value={editData.region}
                        onChange={(e) => setEditData({ ...editData, region: e.target.value })}
                        className="block w-full pl-3 pr-8 py-1.5 rounded-md border-neutral-700 bg-neutral-800 focus:border-emerald-400 focus:ring-emerald-400/30 text-sm border shadow-sm"
                      >
                        {regions.map((reg) => (
                          <option key={reg} value={reg} className="bg-neutral-900">
                            {reg}
                          </option>
                        ))}
                      </select>
                    ) : (
                      doc.region
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                    <div className="flex flex-wrap gap-1">
                      {doc.tags && typeof doc.tags === "string" ? (
                        doc.tags
                          .split(",")
                          .filter((tag) => tag.trim())
                          .map((tag) => (
                            <motion.span
                              key={tag}
                              whileHover={{ scale: 1.05 }}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300"
                            >
                              {tag.trim()}
                            </motion.span>
                          ))
                      ) : (
                        <span className="text-neutral-500 italic">No tags</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                    {new Date(doc.uploaded_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={doc.file_url}
                      download
                      className="inline-block text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </motion.a>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      onClick={() => handleDelete(doc.id)}
                      className="inline-block text-red-400 hover:text-red-300 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </motion.button>
                    {editRow === doc.id ? (
                    //   <motion.button
                    //     whileHover={{ scale: 1.2 }}
                    //     onClick={() => handleSave(doc.id)}
                    //     className="inline-block text-green-400 hover:text-green-300 transition-colors"
                    //   >
                    //     <svg
                    //       xmlns="http://www.w3.org/2000/svg"
                    //       width="16"
                    //       height="16"
                    //       viewBox="0 0 24 24"
                    //       fill="none"
                    //       stroke="currentColor"
                    //       strokeWidth="2"
                    //       strokeLinecap="round"
                    //       strokeLinejoin="round"
                    //     >
                    //       <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    //       <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    //       <polyline points="7 3 7 8 15 8"></polyline>
                    //     </svg>
                    //   </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        onClick={() => handleEditClick(doc)}
                        className="inline-block text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="bg-neutral-900 px-6 py-3 flex items-center justify-between border-t border-neutral-800">
            <div className="text-sm text-neutral-400">
              Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(currentPage * pageSize, filteredDocuments.length)}
              </span>{" "}
              of <span className="font-medium">{filteredDocuments.length}</span> documents
            </div>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border border-neutral-700 bg-neutral-800 text-sm font-medium text-neutral-300 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border border-neutral-700 bg-neutral-800 text-sm font-medium text-neutral-300 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => {
          setShowUploadModal(false);
          fetchDocuments();
        }}
      />
    </div>
  );
}