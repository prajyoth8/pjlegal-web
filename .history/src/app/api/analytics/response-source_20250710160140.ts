// pages/api/analytics/response-source.ts
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase
    .from("chatbot_responses")
    .select("used_semantic_chunks");

  if (error) return res.status(500).json({ error: error.message });

  const total = data.length;
  const semantic = data.filter((d) => d.used_semantic_chunks === true).length;
  const direct = total - semantic;

  return res.status(200).json([
    { name: "Semantic Search", value: semantic },
    { name: "Direct AI", value: direct }
  ]);
}
