import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const isAdminRoute = url.pathname.startsWith("/admin");
  const token = req.cookies.get("admin_token")?.value;

  if (isAdminRoute && !token) {
    url.pathname = "/admin"; // redirect to login
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
