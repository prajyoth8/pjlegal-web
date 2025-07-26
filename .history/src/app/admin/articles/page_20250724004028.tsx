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
import { Plus, Pencil, Trash2, Search, Loader2, ChevronDown, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";
import ArticleEditorModal from "@/components/admin/ArticleEditorModal";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

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
  created_at: string;
  is_published: boolean;
  views?: number;
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState({ key: "created_at", direction: "desc" });

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order(sortConfig.key, { ascending: sortConfig.direction === "asc" });

    if (error) {
      toast.error("Failed to load articles");
      console.error(error);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  const handleSort = (key: string) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.content.toLowerCase().includes(search.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async () => {
    const { error } = await supabase
      .from("articles")
      .delete()
      .in("id", selected);

    if (error) {
      toast.error("Delete failed");
    } else {
      toast.success(`${selected.length > 1 ? "Articles" : "Article"} deleted`);
      setSelected([]);
      fetchArticles();
    }
    setDeleteConfirmOpen(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [sortConfig]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Content Studio
            </h1>
            <p className="text-gray-500 mt-1">Manage your digital publications</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setEditArticle(null);
              setEditorOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Article</span>
          </motion.button>
        </motion.div>

        {/* Controls */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by title, content or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm transition-all"
            />
          </div>
          
          <div className="flex gap-3">
            <div className="relative flex-1">
              <select className="appearance-none w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm">
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
            </div>
            
            {selected.length > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setDeleteConfirmOpen(true)}
                className="flex items-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-sm transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span>{selected.length}</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader2 className="h-8 w-8 text-indigo-500" />
            </motion.div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("title")}
                    >
                      <div className="flex items-center gap-1">
                        Title
                        <ChevronDown className={`w-4 h-4 transition-transform ${sortConfig.key === "title" && sortConfig.direction === "asc" ? "rotate-180" : ""}`} />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("created_at")}
                    >
                      <div className="flex items-center gap-1">
                        Date
                        <ChevronDown className={`w-4 h-4 transition-transform ${sortConfig.key === "created_at" && sortConfig.direction === "asc" ? "rotate-180" : ""}`} />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredArticles.map((article) => (
                      <motion.tr
                        key={article.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-gray-50/50"
                      >
                        <td className="px-6 py-4 max-w-xs">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selected.includes(article.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelected([...selected, article.id]);
                                } else {
                                  setSelected(selected.filter(id => id !== article.id));
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                {article.title}
                              </div>
                              {article.views && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {article.views.toLocaleString()} views
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {article.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(article.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            article.is_published 
                              ? "bg-green-100 text-green-800" 
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {article.is_published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => {
                                setEditArticle(article);
                                setEditorOpen(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 transition-colors"
                            >
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelected([article.id]);
                                setDeleteConfirmOpen(true);
                              }}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {filteredArticles.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
                          <Search className="h-8 w-8" />
                          <p className="text-lg">No articles found</p>
                          {search && (
                            <button
                              onClick={() => setSearch("")}
                              className="text-sm text-indigo-600 hover:text-indigo-800"
                            >
                              Clear search
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ArticleEditorModal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        initialData={editArticle}
        onSave={fetchArticles}
      />

      <ConfirmDeleteModal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        count={selected.length}
      />
    </div>
  );
}