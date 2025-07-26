// "use client";

// import AdminArticleManager from "@/components/admin/AdminArticleManager";
// import AdminAuthGuard from "@/components/AdminAuthGuard";

// export default function AdminArticlesPage() {
//   return (
//     <AdminAuthGuard>
//       <div className="px-6 py-10 max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-white mb-6">📝 Manage Articles & Blogs</h1>
//         <AdminArticleManager />
//       </div>
//     </AdminAuthGuard>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";
import ArticleEditorModal from "@/components/admin/ArticleEditorModal";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Article = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  tags: string[];
  created_by: string;
  created_at: string;
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load articles");
      console.error(error);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    const { error } = await supabase.from("articles").delete().in("id", selected);
    if (error) {
      toast.error("Delete failed");
    } else {
      toast.success("Deleted successfully");
      setSelected([]);
      fetchArticles();
    }
    setDeleteConfirmOpen(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Articles / Blogs</h1>
        <button
          onClick={() => {
            setEditArticle(null);
            setEditorOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md"
        >
          <Plus className="w-4 h-4" />
          New Article
        </button>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by title, tags, or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-900 border border-neutral-700 text-white focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-neutral-500 h-5 w-5" />
        </div>

        {selected.length > 0 && (
          <button
            onClick={() => setDeleteConfirmOpen(true)}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            <Trash2 className="w-4 h-4" />
            Delete ({selected.length})
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-20 text-neutral-400 flex justify-center items-center gap-2">
          <Loader2 className="animate-spin h-5 w-5" />
          Loading...
        </div>
      ) : (
        <div className="overflow-x-auto border border-neutral-800 rounded-md">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-900 text-neutral-400">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2">Tags</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-neutral-900 border-t border-neutral-800"
                >
                  <td className="px-4 py-3 max-w-xs">
                    <div className="font-medium text-white line-clamp-2">
                      {article.title}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-cyan-800/30 text-cyan-400 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-neutral-400">
                    {new Date(article.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setEditArticle(article);
                          setEditorOpen(true);
                        }}
                        className="text-blue-400 hover:text-blue-600"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelected([article.id]);
                          setDeleteConfirmOpen(true);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-neutral-400">
                    No articles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔧 Modals */}
      {editorOpen && (
        <ArticleEditorModal
          open={editorOpen}
          onClose={() => setEditorOpen(false)}
          initialData={editArticle}
          onSave={fetchArticles}
        />
      )}

      {deleteConfirmOpen && (
        <ConfirmDeleteModal
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
