// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.session) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", data.user.id)
    .single();

  if (!profile?.is_admin) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const response = NextResponse.json({ success: true }, { status: 200 });

  response.headers.set(
    "Set-Cookie",
    `admin_token=${data.session.access_token}; Path=/; HttpOnly; SameSite=Strict; ${
      process.env.NODE_ENV === "production" ? "Secure;" : ""
    } Max-Age=86400`
  );

  return response;
}
