// // File: src/app/api/admin/login/route.ts

// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error || !data.session) {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
//     }

//     const { data: userInfo } = await supabase
//       .from("users")
//       .select("is_admin")
//       .eq("id", data.user.id)
//       .single();

//     if (!userInfo?.is_admin) {
//       return NextResponse.json({ error: "Not authorized" }, { status: 403 });
//     }

//     const token = data.session.access_token;

//     // ✅ Use `await cookies()` before calling `.set(...)`
//     const cookieStore = await cookies();
//     cookieStore.set({
//       name: "admin_token",
//       value: token,
//       path: "/",
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 60 * 60 * 24, // 1 day
//     });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
