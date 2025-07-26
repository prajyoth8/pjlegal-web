
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
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

