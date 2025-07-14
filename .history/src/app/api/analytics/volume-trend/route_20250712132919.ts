import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const interval = searchParams.get("interval") || "daily"; // daily | weekly | monthly | yearly

  const { data, error } = await supabase.from("chatbot_requests").select("created_at");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // const counts: Record<string, number> = {};

  // for (const row of data) {
  //   const date = new Date(row.created_at);
  //   let key = "";

  //   if (interval === "yearly") {
  //     key = date.getFullYear().toString();
  //   } else if (interval === "monthly") {
  //     key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  //   } else if (interval === "weekly") {
  //     // Get week number and year
  //     const year = date.getFullYear();
  //     const oneJan = new Date(year, 0, 1);
  //     const weekNumber = Math.ceil(
  //       ((date.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7
  //     );
  //     key = `${year}-W${String(weekNumber).padStart(2, "0")}`;
  //   } else {
  //     key = date.toLocaleDateString(); // daily
  //   }

  //   counts[key] = (counts[key] || 0) + 1;
  // }

  // const labels = Object.keys(counts).sort((a, b) => {
  //   // Custom sorting for weekly format (YYYY-Www)
  //   if (interval === "weekly") {
  //     const [yearA, weekA] = a.split("-W");
  //     const [yearB, weekB] = b.split("-W");
  //     return yearA.localeCompare(yearB) || parseInt(weekA) - parseInt(weekB);
  //   }
  //   return a.localeCompare(b);
  // });

  // const values = labels.map((key) => counts[key]);

  const counts: Record<string, number> = {};

  for (const row of data) {
    const date = new Date(row.created_at);
    const key = date.toISOString().split("T")[0]; // YYYY-MM-DD format for proper sorting

    counts[key] = (counts[key] || 0) + 1;
  }

  const labels = Object.keys(counts).sort(); // keep in YYYY-MM-DD

const values = labels.map((dateKey) => counts[dateKey]);


  return NextResponse.json({ labels, values });
}
