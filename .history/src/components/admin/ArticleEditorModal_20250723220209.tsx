"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Article = {
  id?: string;
  title: string;
  content: string;
  tags: string[];
  image_url?: string | null;
};

export default function ArticleEditorModal({
  open,
  onClose,
  onSave,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: Article | null;
}) {
  const [form, setForm] = useState<Article>({
    title: "",
    content: "",
    tags: [],
    image_url: "",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({ title: "", content: "", tags: [], image_url: "" });
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.title || !form.content) {
      toast.error("Title and content are required");
      return;
    }

    try {
      setUploading(true);

      const payload = {
        ...form,
        tags: form.tags.map((t) => t.trim()),
      };

      if (form.id) {
        // Edit
        const { error } = await supabase
          .from("articles")
          .update(payload)
          .eq("id", form.id);
        if (error) throw error;
        toast.success("Article updated");
      } else {
        // New
        const { error } = await supabase.from("articles").insert([payload]);
        if (error) throw error;
        toast.success("Article created");
      }

      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-neutral-900 text-white p-6 space-y-4 border border-neutral-700">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-lg font-semibold">
              {form.id ? "Edit Article" : "New Article"}
            </Dialog.Title>
            <X className="cursor-pointer" onClick={onClose} />
          </div>

          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full bg-neutral-800 rounded p-2"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            name="content"
            placeholder="Content"
            rows={8}
            className="w-full bg-neutral-800 rounded p-2"
            value={form.content}
            onChange={handleChange}
          />

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="w-full bg-neutral-800 rounded p-2"
            value={form.tags.join(", ")}
            onChange={(e) =>
              setForm({ ...form, tags: e.target.value.split(",").map((s) => s.trim()) })
            }
          />

          <input
            type="text"
            name="image_url"
            placeholder="Image URL (optional)"
            className="w-full bg-neutral-800 rounded p-2"
            value={form.image_url ?? ""}
            onChange={handleChange}
          />

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={uploading}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded"
            >
              {uploading ? "Saving..." : "Save"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
