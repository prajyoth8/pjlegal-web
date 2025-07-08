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
