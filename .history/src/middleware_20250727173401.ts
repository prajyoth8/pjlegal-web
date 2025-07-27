// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Allow the login page to be accessed without auth
//   if (pathname === "/admin") {
//     return NextResponse.next();
//   }

//   // Protect all /admin/* pages
//   if (pathname.startsWith("/admin")) {
//     const token = request.cookies.get("admin_token")?.value;

//     if (!token) {
//       return NextResponse.redirect(new URL("/admin", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"], // ✅ protect all /admin/*
// };


import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create a Supabase client configured to use cookies
  const supabase = createClient(request)

  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession()

  // Allow access to /admin login page without auth
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.next()
  }

  // Protect all other /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    // Additional check for admin role
    const { data: user } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', session.user.id)
      .single()

    if (!user?.is_admin) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}


// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Define protected routes
// const protectedRoutes = [
//   "/admin",
//   "/admin/cms",
//   "/admin/documents_list",
//   "/admin/tokens",
//   "/admin/keywords",
// ];

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl;
//   const token = request.cookies.get("admin_token")?.value;

//   const isProtected = protectedRoutes.some((path) => url.pathname.startsWith(path));

//   if (isProtected && !token) {
//     const loginUrl = new URL("/admin", request.url); // Redirect to login
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };
