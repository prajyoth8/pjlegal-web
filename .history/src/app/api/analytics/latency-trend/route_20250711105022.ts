import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";

export async function GET() {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("chatbot_responses")
      .select("created_at, latency_ms");

    if (error) throw error;

    const grouped: Record<string, number[]> = {};

    for (const row of data) {
      const dateKey = format(new Date(row.created_at), "yyyy-MM-dd");
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(row.latency_ms);
    }

    const result = Object.entries(grouped).map(([date, latencies]) => ({
      date,
      average: Math.round(
        latencies.reduce((sum, ms) => sum + ms, 0) / latencies.length
      ),
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ Error in /latency-trend:", err);
    return NextResponse.json({ error: "Failed to fetch latency trend" }, { status: 500 });
  }
}
