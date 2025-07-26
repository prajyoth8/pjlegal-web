"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Plus, Trash2, Pencil, RefreshCw, Search } from "lucide-react";
import toast from "react-hot-toast";
import ArticleEditorModal from "./ArticleEditorModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminArticleManager() {
  const [articles, setArticles] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<any | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select(`id, title, content, tags, image_url, created_at, created_by:users(email)`)
      .order("created_at", { ascending: sortOrder === "oldest" });

    if (error) {
      toast.error("Failed to load articles");
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [sortOrder]);

  const filtered = articles.filter((a) => {
    const q = query.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.tags?.some((t: string) => t.toLowerCase().includes(q)) ||
      a.created_by?.email?.toLowerCase().includes(q)
    );
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex w-full md:w-auto gap-2">
          <input
            type="text"
            placeholder="Search by title, content, tags or author..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-80 px-4 py-2 bg-neutral-800 text-neutral-100 rounded-md border border-neutral-700 focus:outline-none"
          />
          <button
            onClick={() => fetchArticles()}
            className="p-2 rounded-md bg-neutral-800 border border-neutral-700 hover:bg-neutral-700"
            title="Refresh"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        <div className="flex gap-3 items-center">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="bg-neutral-800 text-neutral-100 border border-neutral-700 px-3 py-1 rounded-md"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

          {selected.length > 0 && (
            <button
              onClick={() => setDeleteConfirmOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <Trash2 size={16} /> Delete ({selected.length})
            </button>
          )}

          <button
            onClick={() => {
              setEditArticle(null);
              setEditorOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md"
          >
            <Plus size={18} /> New Article
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-neutral-800 rounded-lg">
        <table className="min-w-full text-sm text-neutral-300">
          <thead className="bg-neutral-900 text-neutral-400">
            <tr>
              <th className="p-3 text-left">Select</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Tags</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr
                key={a.id}
                className="border-t border-neutral-800 hover:bg-neutral-900 transition"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(a.id)}
                    onChange={() => toggleSelect(a.id)}
                  />
                </td>
                <td className="p-3 font-medium text-neutral-100 line-clamp-2 max-w-xs">
                  {a.title}
                </td>
                <td className="p-3 text-neutral-400">
                  {a.created_by?.email?.split("@")[0] || "Unknown"}
                </td>
                <td className="p-3">
                  {a.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs bg-cyan-900/30 text-cyan-400 px-2 py-1 rounded-full mr-1"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="p-3">
                  {new Date(a.created_at).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => {
                      setEditArticle(a);
                      setEditorOpen(true);
                    }}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && !loading && (
          <div className="text-center py-10 text-neutral-500">No matching articles found.</div>
        )}
      </div>

      {/* Modals */}
      {editorOpen && (
        <ArticleEditorModal
  open={editorOpen}
  onClose={() => setEditorOpen(false)}
  initialData={editArticle} // ✅ rename this
  onSave={fetchArticles}
/>
      )}

      {deleteConfirmOpen && (
        <ConfirmDeleteModal
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          ids={selected}
          onDeleteSuccess={() => {
            setSelected([]);
            fetchArticles();
          }}
        />
      )}
    </>
  );
}
