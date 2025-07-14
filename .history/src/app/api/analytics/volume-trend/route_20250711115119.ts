import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const interval = searchParams.get("interval") || "daily"; // daily | monthly | yearly

  const { data, error } = await supabase
    .from("chatbot_requests")
    .select("created_at");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const counts: Record<string, number> = {};

  for (const row of data) {
    const date = new Date(row.created_at);
    let key = "";

    if (interval === "yearly") {
      key = date.getFullYear().toString();
    } else if (interval === "monthly") {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    } else {
      key = date.toLocaleDateString(); // daily
    }

    counts[key] = (counts[key] || 0) + 1;
  }

  const labels = Object.keys(counts).sort();
  const values = labels.map((key) => counts[key]);

  return NextResponse.json({ labels, values });
}
