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
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";
import ArticleEditorModal from "@/components/admin/ArticleEditorModal";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import Link from "next/link";

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
    <AdminAuthGuard>


    </AdminAuthGuard>
    
  );
}