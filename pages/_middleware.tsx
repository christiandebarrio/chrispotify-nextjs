import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Token will exist if user is logged in
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET ?? "undefined",
  });

  const { pathname } = req.nextUrl;

  // Allow the request if the following is true...
  // 1) It's a request for next-auth session & provider fetching
  // 2) the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect them to login if they don't have a token AND requesting a protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}

