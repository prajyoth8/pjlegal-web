import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const token = req.cookies.get("admin_token")?.value;

  if (isAdminRoute && !token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin"; // redirect to login page
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
