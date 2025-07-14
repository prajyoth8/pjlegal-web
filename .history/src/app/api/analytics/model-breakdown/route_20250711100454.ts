// ✅ src/app/api/analytics/model-breakdown/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase.from("chatbot_responses").select("model_used");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const breakdown = data.reduce((acc: Record<string, number>, row) => {
    acc[row.model_used] = (acc[row.model_used] || 0) + 1;
    return acc;
  }, {});

  const formatted = Object.entries(breakdown).map(([name, value]) => ({ name, value }));

  return NextResponse.json(formatted);
}
