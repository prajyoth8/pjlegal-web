// ✅ src/app/api/analytics/latency-trend/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("chatbot_responses")
    .select("created_at, latency")
    .order("created_at");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const trend: { labels: string[]; values: number[] } = { labels: [], values: [] };

  data.forEach((row) => {
    const date = new Date(row.created_at).toLocaleDateString();
    if (!trend.labels.includes(date)) {
      trend.labels.push(date);
      trend.values.push(row.latency);
    } else {
      const index = trend.labels.indexOf(date);
      trend.values[index] = (trend.values[index] + row.latency) / 2;
    }
  });

  return NextResponse.json(trend);
}
