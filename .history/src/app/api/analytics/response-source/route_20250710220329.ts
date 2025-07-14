import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// ✅ Use environment variables safely
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data: responses, error } = await supabase
      .from("chatbot_responses") // ✅ Check table name
      .select("used_semantic_chunks");

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }

    const summary = {
      "Semantic Search": 0,
      "Direct AI": 0,
    };

    for (const row of responses || []) {
      if (row.used_semantic_chunks && row.used_semantic_chunks.length > 0) {
        summary["Semantic Search"] += 1;
      } else {
        summary["Direct AI"] += 1;
      }
    }

    const chartData = Object.entries(summary).map(([name, value]) => ({
      name,
      value,
    }));

    return NextResponse.json(chartData);
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
