// "use client";

// import { useState, useRef } from "react";
// import { toast } from "react-hot-toast";
// import { Dialog } from "@headlessui/react";
// import { X } from "lucide-react";

// export default function UploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");
//   const [summary, setSummary] = useState("");
//   const [tags, setTags] = useState("");
//   const [userId, setUserId] = useState("3131a70d-d552-45ba-9b63-6ba5ed3849dd"); // Replace with actual auth
//   const dropRef = useRef<HTMLDivElement>(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     if (e.dataTransfer.files.length > 0) {
//       setFile(e.dataTransfer.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!title || !file) {
//       toast.error("Please provide title and select a file.");
//       return;
//     }

//     const form = new FormData();
//     form.append("title", title);
//     form.append("summary", summary);
//     form.append("tags", tags);
//     form.append("file", file);
//     form.append("user_id", userId);

//     try {
//       setIsUploading(true);
//       //   const res = await fetch("/upload-legal-doc", {
//       //     method: "POST",
//       //     body: form,
//       //   });

//       const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//       const res = await fetch(`${baseUrl}/upload-legal-doc`, {
//         method: "POST",
//         body: form,
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.detail || "Upload failed");

//       toast.success("Document uploaded");
//       onClose(); // Close modal
//       setFile(null);
//       setTitle("");
//       setSummary("");
//       setTags("");
//     } catch (err: any) {
//       toast.error(err.message);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onClose={onClose} className="relative z-50">
//       <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
//       <div className="fixed inset-0 flex items-center justify-center p-4">
//         <Dialog.Panel className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg relative">
//           <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
//             <X />
//           </button>
//           <Dialog.Title className="text-xl font-semibold mb-4">
//             📤 Upload Legal Document
//           </Dialog.Title>

//           <input
//             type="text"
//             placeholder="Title"
//             className="w-full mb-2 p-2 border rounded"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <textarea
//             placeholder="Summary (optional)"
//             className="w-full mb-2 p-2 border rounded"
//             value={summary}
//             onChange={(e) => setSummary(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Tags (comma separated)"
//             className="w-full mb-2 p-2 border rounded"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//           />

//           <div
//             ref={dropRef}
//             onDrop={handleDrop}
//             onDragOver={(e) => e.preventDefault()}
//             className="border-2 border-dashed border-gray-300 p-4 rounded mb-3 text-center cursor-pointer hover:bg-gray-50"
//             onClick={() => dropRef.current?.querySelector("input")?.click()}
//           >
//             {file ? (
//               <p className="text-sm text-gray-600">📄 {file.name}</p>
//             ) : (
//               <p className="text-gray-500">Drag & drop or click to select PDF/DOCX</p>
//             )}
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx"
//               hidden
//               onChange={(e) => {
//                 if (e.target.files?.[0]) setFile(e.target.files[0]);
//               }}
//             />
//           </div>

//           <button
//             disabled={isUploading}
//             onClick={handleUpload}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             {isUploading ? "Uploading..." : "Upload Document"}
//           </button>
//         </Dialog.Panel>
//       </div>
//     </Dialog>
//   );
// }
"use client";

import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import { X, UploadCloud, FileText, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [userId] = useState("3131a70d-d552-45ba-9b63-6ba5ed3849dd");
  const dropRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleUpload = async () => {
    if (!title || !file) {
      toast.error("Please provide title and select a file.");
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("summary", summary);
    form.append("tags", tags);
    form.append("file", file);
    form.append("user_id", userId);

    try {
      setIsUploading(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/upload-legal-doc`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Upload failed");

      toast.success("Document uploaded successfully!");
      onClose();
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setTitle("");
    setSummary("");
    setTags("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog static open={isOpen} onClose={onClose} className="relative z-50">
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-neutral-900/80 backdrop-blur-lg border border-neutral-800 rounded-xl shadow-2xl w-full max-w-md relative max-h-[90vh] flex flex-col"
            >
              <Dialog.Panel className="flex flex-col h-full overflow-hidden">
                {/* Modal header */}
                <div className="p-4 md:p-6 border-b border-neutral-800">
                  <div className="flex justify-between items-center">
                    <Dialog.Title className="text-lg md:text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                      Upload Legal Document
                    </Dialog.Title>
                    <button
                      onClick={onClose}
                      className="text-neutral-400 hover:text-neutral-200 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-neutral-400 mt-1">
                    Add new legal documents to your repository
                  </p>
                </div>

                {/* Modal content - scrollable area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Document Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Privacy Policy v2.3"
                      className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-neutral-200"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Summary (Optional)
                    </label>
                    <textarea
                      placeholder="Brief description of the document..."
                      className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-neutral-200 min-h-[100px]"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., privacy, policy, compliance"
                      className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-neutral-200"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Document File *
                    </label>
                    <div
                      ref={dropRef}
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onClick={() => dropRef.current?.querySelector("input")?.click()}
                      className={`border-2 border-dashed rounded-xl p-4 md:p-6 text-center cursor-pointer transition-all duration-300 ${
                        isDragging
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/30"
                      }`}
                    >
                      {file ? (
                        <div className="flex flex-col items-center">
                          <FileText className="h-8 w-8 md:h-10 md:w-10 text-emerald-400 mb-2" />
                          <p className="text-sm font-medium text-neutral-200 truncate max-w-full">
                            {file.name}
                          </p>
                          <p className="text-xs text-neutral-400 mt-1">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <UploadCloud className="h-8 w-8 md:h-10 md:w-10 text-neutral-500 mb-2 md:mb-3" />
                          <p className="text-xs md:text-sm text-neutral-400">
                            <span className="font-medium text-neutral-300">Drag & drop</span> or
                            click to browse
                          </p>
                          <p className="text-xs text-neutral-500 mt-1">PDF, DOC, DOCX (Max 25MB)</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        hidden
                        onChange={(e) => {
                          if (e.target.files?.[0]) setFile(e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Modal footer */}
                <div className="p-4 md:p-6 border-t border-neutral-800 flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    disabled={isUploading}
                    className="px-3 py-2 md:px-4 md:py-2.5 text-sm font-medium rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800/50 disabled:opacity-50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpload}
                    disabled={isUploading || !title || !file}
                    className="px-3 py-2 md:px-4 md:py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                        Upload
                      </>
                    )}
                  </motion.button>
                </div>
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}