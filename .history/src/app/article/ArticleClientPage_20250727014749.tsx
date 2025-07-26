
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Bookmark, Clock, User, Eye, MessageSquare, ChevronRight } from "lucide-react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import { motion } from "framer-motion";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function ArticleClientPage({
  article,
  related,
}: {
  article: any;
  related: any[];
}) {
  const [readingTime, setReadingTime] = useState(0);
  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (article?.content) {
      const words = article.content.split(/\s+/).length;
      setReadingTime(Math.max(1, Math.round(words / 200)));
    }
  }, [article]);

  if (!article)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-neutral-500">Article not found</p>
      </div>
    );