import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data: responses, error } = await supabase.from("chatbot_response").select("source");

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    // Count how many are 'semantic' vs 'direct'
    const summary = {
      "Semantic Search": 0,
      "Direct AI": 0,
    };

    for (const row of responses || []) {
      if (row.source === "semantic") summary["Semantic Search"] += 1;
      else summary["Direct AI"] += 1;
    }

    // Convert to chart data format
    const chartData = Object.entries(summary).map(([name, value]) => ({
      name,
      value,
    }));

    return res.status(200).json(chartData);
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
