"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X, ImagePlus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

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

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      if (initialData.image_url) {
        setImagePreview(initialData.image_url);
      }
    } else {
      setForm({ title: "", content: "", tags: [], image_url: "" });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setForm((prev) => ({ ...prev, image_url: "" }));
    const input = document.getElementById("upload-img") as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleSave = async () => {
    if (!form.title || !form.content) {
      toast.error("Title and content are required");
      return;
    }

    try {
      setUploading(true);

      let uploadedImageUrl = form.image_url ?? null;

      if (imageFile) {
        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(imageFile.type)) {
          throw new Error("Only JPEG, PNG, or WebP allowed");
        }
        if (imageFile.size > 5 * 1024 * 1024) {
          throw new Error("Max size 5MB");
        }

        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData.session) throw new Error("Not authenticated");

        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${sessionData.session.user.id}-${Date.now()}.${fileExt}`;
        const filePath = `thumbnails/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("article-images")
          .upload(filePath, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("article-images")
          .getPublicUrl(filePath);

        uploadedImageUrl = urlData.publicUrl;
      }

      const payload = {
        ...form,
        tags: form.tags.map((t) => t.trim()),
        image_url: uploadedImageUrl,
      };

      if (form.id) {
        const { error } = await supabase
          .from("articles")
          .update(payload)
          .eq("id", form.id);
        if (error) throw error;
        toast.success("Article updated");
      } else {
        const { error } = await supabase.from("articles").insert([payload]);
        if (error) throw error;
        toast.success("Article created");
      }

      onSave();
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to save");
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
            rows={6}
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

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm mb-1 text-neutral-400">Upload Image</label>
            <div className="flex gap-3 items-center">
              <label className="cursor-pointer bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs rounded px-3 py-2 flex items-center gap-2">
                <ImagePlus className="w-4 h-4" />
                {imageFile ? "Change Image" : "Upload Image"}
                <input
                  id="upload-img"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              {imageFile && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              )}
            </div>
            {imagePreview && (
              <div className="mt-3 relative w-full h-48 rounded overflow-hidden border border-neutral-700">

                <Image
                                      src={imagePreview.trim()}
                                      alt="Preview"
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      unoptimized
                                    />
                {/* <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                /> */}
              </div>
            )}
          </div>

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
