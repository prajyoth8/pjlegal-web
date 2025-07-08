"use client";

import Link from "next/link";
import DocumentList from "@/components/DocumentList";
import { useRouter } from "next/navigation";
import AdminAuthGuard from "@/components/AdminAuthGuard";


export default function AdminDocumentsListPage() {
  const router = useRouter();
  return (
    <AdminAuthGuard></AdminAuthGuard>
    
  );
}
