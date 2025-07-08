"use client";

import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

export default function UploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [userId, setUserId] = useState("admin"); // Replace with actual auth
  const dropRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
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
    //   const res = await fetch("/upload-legal-doc", {
    //     method: "POST",
    //     body: form,
    //   });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Upload failed");

      toast.success("Document uploaded");
      onClose(); // Close modal
      setFile(null);
      setTitle("");
      setSummary("");
      setTags("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
            <X />
          </button>
          <Dialog.Title className="text-xl font-semibold mb-4">
            📤 Upload Legal Document
          </Dialog.Title>

          <input
            type="text"
            placeholder="Title"
            className="w-full mb-2 p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Summary (optional)"
            className="w-full mb-2 p-2 border rounded"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="w-full mb-2 p-2 border rounded"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <div
            ref={dropRef}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 p-4 rounded mb-3 text-center cursor-pointer hover:bg-gray-50"
            onClick={() => dropRef.current?.querySelector("input")?.click()}
          >
            {file ? (
              <p className="text-sm text-gray-600">📄 {file.name}</p>
            ) : (
              <p className="text-gray-500">Drag & drop or click to select PDF/DOCX</p>
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

          <button
            disabled={isUploading}
            onClick={handleUpload}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isUploading ? "Uploading..." : "Upload Document"}
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
