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
import { Plus, Pencil, Trash2, Search, Loader2, ChevronDown, ArrowLeft, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";
import ArticleEditorModal from "@/components/admin/ArticleEditorModal";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import Link from "next/link";
import AdminAuthGuard from "@/components/AdminAuthGuard";

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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
    const { error } = await supabase.from("articles").delete().in("id", selected);

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
    <AdminAuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Mobile menu button */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center text-neutral-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Link>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-600"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile filters */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed inset-0 z-50 bg-white p-4 overflow-y-auto"
              >
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-600"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                {/* Mobile search */}
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm"
                  />
                </div>

                {/* Mobile status filter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="relative">
                    <select className="appearance-none w-full pl-4 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm">
                      <option>All Status</option>
                      <option>Published</option>
                      <option>Draft</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Mobile create button */}
                <button
                  onClick={() => {
                    setEditArticle(null);
                    setEditorOpen(true);
                    setMobileFiltersOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">New Article</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="hidden md:block mb-6">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center text-neutral-400 hover:text-cyan-400 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Content Studio
              </h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage your digital publications</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditArticle(null);
                setEditorOpen(true);
              }}
              className="hidden md:flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg sm:rounded-xl shadow-lg transition-all"
            >
              <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">New Article</span>
            </motion.button>
          </motion.div>

          {/* Controls */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative col-span-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by title, content or tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm transition-all text-sm sm:text-base"
              />
            </div>

            <div className="flex gap-2 sm:gap-3">
              <div className="relative flex-1">
                <select className="appearance-none w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm text-sm sm:text-base">
                  <option>All Status</option>
                  <option>Published</option>
                  <option>Draft</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-2.5 sm:top-3.5 h-3 sm:h-4 w-3 sm:w-4 text-gray-400" />
              </div>

              {selected.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setDeleteConfirmOpen(true)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg sm:rounded-xl shadow-sm transition-colors text-sm sm:text-base"
                >
                  <Trash2 className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>{selected.length}</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center items-center py-12 sm:py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Loader2 className="h-6 sm:h-8 w-6 sm:w-8 text-indigo-500" />
              </motion.div>
            </div>
          ) : (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleSort("title")}
                      >
                        <div className="flex items-center gap-1">
                          <span className="hidden sm:inline">Title</span>
                          <ChevronDown
                            className={`w-3 sm:w-4 h-3 sm:h-4 transition-transform ${sortConfig.key === "title" && sortConfig.direction === "asc" ? "rotate-180" : ""}`}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                      >
                        Tags
                      </th>
                      <th
                        scope="col"
                        className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors hidden md:table-cell"
                        onClick={() => handleSort("created_at")}
                      >
                        <div className="flex items-center gap-1">
                          <span className="hidden sm:inline">Date</span>
                          <ChevronDown
                            className={`w-3 sm:w-4 h-3 sm:h-4 transition-transform ${sortConfig.key === "created_at" && sortConfig.direction === "asc" ? "rotate-180" : ""}`}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <span className="sr-only">Actions</span>
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
                          <td className="px-3 sm:px-6 py-4 max-w-xs">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={selected.includes(article.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelected([...selected, article.id]);
                                  } else {
                                    setSelected(selected.filter((id) => id !== article.id));
                                  }
                                }}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                  {article.title}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1 sm:hidden">
                                  {article.tags.slice(0, 2).map((tag) => (
                                    <span
                                      key={tag}
                                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {article.tags.length > 2 && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                      +{article.tags.length - 2}
                                    </span>
                                  )}
                                </div>
                                {article.views && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    {article.views.toLocaleString()} views
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">
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
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                            {new Date(article.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                article.is_published
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {article.is_published ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2 sm:gap-3">
                              <button
                                onClick={() => {
                                  setEditArticle(article);
                                  setEditorOpen(true);
                                }}
                                className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                aria-label="Edit article"
                              >
                                <Pencil className="w-4 sm:w-5 h-4 sm:h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelected([article.id]);
                                  setDeleteConfirmOpen(true);
                                }}
                                className="text-red-600 hover:text-red-900 transition-colors"
                                aria-label="Delete article"
                              >
                                <Trash2 className="w-4 sm:w-5 h-4 sm:h-5" />
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

        {/* Mobile create button (fixed at bottom) */}
        <div className="md:hidden fixed bottom-6 right-6 z-40">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditArticle(null);
              setEditorOpen(true);
            }}
            className="flex items-center justify-center p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </AdminAuthGuard>
  );
}