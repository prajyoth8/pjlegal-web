"use client";
import { useSearchParams } from "next/navigation";

export default function ArticleContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <div>Showing article with ID: {id}</div>;
}
