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
import { motion } from "framer-motion";

export default function UploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [userId] = useState("3131a70d-d552-45ba-9b63-6ba5ed3849dd"); // Replace with actual auth
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
        <Dialog 
          static 
          open={isOpen} 
          onClose={onClose} 
          className="relative z-50"
        >
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-neutral-900/80 backdrop-blur-lg border border-neutral-800 rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden"
            >
              <Dialog.Panel className="h-full">
                {/* Modal header */}
                <div className="p-6 border-b border-neutral-800">
                  <div className="flex justify-between items-center">
                    <Dialog.Title className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                      Upload Legal Document
                    </Dialog.Title>
                    <button 
                      onClick={onClose}
                      className="text-neutral-400 hover:text-neutral-200 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <p className="text-sm text-neutral-400 mt-1">
                    Add new legal documents to your repository
                  </p>
                </div>

                {/* Rest of your modal content */}
                {/* ... (keep all your existing modal content JSX) */}
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}