import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value || "";
  const path = request.nextUrl.pathname;
  const isLogReg = path === "/login" || path === "/register";

  const admin = true;

  // Check if the user is authenticated
  if (token && isLogReg) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!token && isLogReg) {
    return null;
  }

  // Check if the user is an admin
  if (admin && path.startsWith("/admin")) {
    return null;
  }

  // check if the user is logged in and is not admin
  if (token && !path.startsWith("/admin")) {
    return null;
  }

  // Redirect to login if not authenticated or not an admin
  return NextResponse.redirect(new URL("/login", request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/post/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
    "/business_packages",
    "/admin/:path*",
  ],
};
