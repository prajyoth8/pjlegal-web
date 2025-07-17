import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page to be accessed without auth
  if (pathname === "/admin") {
    return NextResponse.next();
  }

  // Protect all /admin/* pages
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // ✅ protect all /admin/*
};






import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = [
  "/admin",
  "/admin/cms",
  "/admin/documents_list",
  "/admin/tokens",
  "/admin/keywords",
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;

  const isProtected = protectedRoutes.some((path) => url.pathname.startsWith(path));

  if (isProtected && !token) {
    const loginUrl = new URL("/admin", request.url); // Redirect to login
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
