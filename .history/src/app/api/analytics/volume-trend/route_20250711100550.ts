// ✅ src/app/api/analytics/volume-trend/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase.from("chatbot_requests").select("created_at");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const counts: Record<string, number> = {};

  data.forEach((row) => {
    const date = new Date(row.created_at).toLocaleDateString();
    counts[date] = (counts[date] || 0) + 1;
  });

  const labels = Object.keys(counts);
  const values = Object.values(counts);

  return NextResponse.json({ labels, values });
}
