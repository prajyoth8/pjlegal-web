import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClients";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("chatbot_responses")
      .select("used_semantic_chunks");

    if (error) throw error;

    const breakdown = { semantic: 0, direct: 0 };

    data.forEach((row) => {
      if (row.used_semantic_chunks === true) {
        breakdown.semantic += 1;
      } else {
        breakdown.direct += 1;
      }
    });

    const result = [
      { name: "Semantic Search", value: breakdown.semantic },
      { name: "Direct AI", value: breakdown.direct },
    ];

    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ Error in /response-source:", err);
    return NextResponse.json({ error: "Failed to fetch response source breakdown" }, { status: 500 });
  }
}
