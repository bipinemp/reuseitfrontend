import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value || "";
  const path = request.nextUrl.pathname;
  const isLogReg = path === "/login" || path === "/register";

  if (token && isLogReg) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!token && !isLogReg) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/post/:path*", "/login", "/register"],
};
