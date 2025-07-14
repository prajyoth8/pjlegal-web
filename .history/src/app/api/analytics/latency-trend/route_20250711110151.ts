import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("chatbot_responses")
      .select("created_at, latency_ms");

    if (error) throw error;

    // Group by date (YYYY-MM-DD) and calculate average
    const grouped: { [date: string]: number[] } = {};

    data.forEach((row) => {
      const date = new Date(row.created_at).toISOString().slice(0, 10);
      if (!grouped[date]) grouped[date] = [];
      if (typeof row.latency_ms === "number") {
        grouped[date].push(row.latency_ms);
      }
    });

    const labels = Object.keys(grouped).sort();
    const values = labels.map((date) => {
      const list = grouped[date];
      return list.length ? list.reduce((a, b) => a + b, 0) / list.length : 0;
    });

    return NextResponse.json({ labels, values });
  } catch (err) {
    console.error("❌ Error in /latency-trend:", err);
    return NextResponse.json({ error: "Failed to fetch latency trend" }, { status: 500 });
  }
}
