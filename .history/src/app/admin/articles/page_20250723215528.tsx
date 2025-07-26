"use client";

import AdminArticleManager from "@/components/admin/AdminArticleManager";
import AdminAuthGuard from "@/components/AdminAuthGuard";

export default function AdminArticlesPage() {
  return (
    <AdminAuthGuard>
      <div className="px-6 py-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">📝 Manage Articles & Blogs</h1>
        <AdminArticleManager />
      </div>
    </AdminAuthGuard>
  );
}
