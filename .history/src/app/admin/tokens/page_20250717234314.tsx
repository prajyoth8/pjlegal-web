"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { createClient } from "@supabase/supabase-js";
import dynamic from "next/dynamic";

// Lazy load chart to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TokenUsagePage() {
  const [data, setData] = useState<any[]>([]);
  const [range, setRange] = useState([
    {
      startDate: new Date(new Date().setDate(new Date().getDate() - 6)), // last 7 days
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    fetchTokenUsage();
  }, [range]);

  const fetchTokenUsage = async () => {
    const { startDate, endDate } = range[0];
    const { data, error } = await supabase
      .from("token_usage_logs")
      .select("timestamp, token_count")
      .gte("timestamp", startDate.to
