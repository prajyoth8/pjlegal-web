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
import { Plus, Pencil, Trash2, Search, Loader2, ChevronDown, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";
import ArticleEditorModal from "@/components/admin/ArticleEditorModal";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import { motion, AnimatePresence } from "framer-motion";

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
  is_published?: boolean;
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ 
    key: 'created_at', 
    direction: 'desc' 
  });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order(sortConfig.key, { ascending: sortConfig.direction === 'asc' });
    
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
  ).filter(a => 
    activeFilter ? a.tags.includes(activeFilter) : true
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

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    fetchArticles();
  }, [sortConfig]);

  const allTags = Array.from(new Set(articles.flatMap(article => article.tags || [])));

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {/* Added Back Button */}
      <div className="mb-6">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center text-neutral-400 hover:text-cyan-400 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
      </div>

      {/* Rest of the existing JSX remains exactly the same */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Content Management
          </h1>
          <p className="text-neutral-400 mt-1">Manage your articles and blog posts</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditArticle(null);
            setEditorOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">New Article</span>
        </motion.button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-500" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          />
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <select 
              onChange={(e) => setActiveFilter(e.target.value || null)}
              className="appearance-none bg-neutral-900 border border-neutral-700/50 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-neutral-400 pointer-events-none" />
          </div>

          {selected.length > 0 && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setDeleteConfirmOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-600/90 hover:bg-red-700 text-white rounded-lg shadow-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete ({selected.length})</span>
            </motion.button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="animate-spin h-8 w-8 text-cyan-500" />
          <p className="text-neutral-400">Loading articles...</p>
        </div>
      ) : (
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-700/30 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-800/50">
              <thead className="bg-neutral-800/50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('title')}
                  >
                    <div className="flex items-center gap-1">
                      Title
                      <ChevronDown className={`w-4 h-4 transition-transform ${sortConfig.key === 'title' && sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">
                    Tags
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('created_at')}
                  >
                    <div className="flex items-center gap-1">
                      Date
                      <ChevronDown className={`w-4 h-4 transition-transform ${sortConfig.key === 'created_at' && sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/30">
                <AnimatePresence>
                  {filtered.map((article) => (
                    <motion.tr
                      key={article.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-neutral-800/20"
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
                            className="h-4 w-4 rounded border-neutral-700 bg-neutral-800 text-cyan-500 focus:ring-cyan-500/30"
                          />
                          <div>
                            <div className="font-medium text-white line-clamp-1">
                              {article.title}
                            </div>
                            <div className="text-xs text-neutral-400 mt-1">
                              {article.is_published ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-400">
                                  Published
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/10 text-yellow-400">
                                  Draft
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                        {new Date(article.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => {
                              setEditArticle(article);
                              setEditorOpen(true);
                            }}
                            className="text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelected([article.id]);
                              setDeleteConfirmOpen(true);
                            }}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2 text-neutral-500">
                        <Search className="h-8 w-8" />
                        <p className="text-lg">No articles found</p>
                        {search || activeFilter ? (
                          <button
                            onClick={() => {
                              setSearch('');
                              setActiveFilter(null);
                            }}
                            className="mt-2 text-sm text-cyan-400 hover:text-cyan-300"
                          >
                            Clear filters
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

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