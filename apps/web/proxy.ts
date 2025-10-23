import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // If there's no session cookie (user is not logged in)
  // and they are trying to access a protected route, redirect them to the home page.
  // We're assuming "/" is your public home page or login page for unauthenticated users.
  if (!sessionCookie && pathname.startsWith("/dashboard")) {
    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If there is a session cookie (user is logged in)
  // and they are trying to access /signin or /signup, redirect them to the dashboard.
  if (sessionCookie && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Specify the routes the middleware applies to
  // This will run the middleware for /dashboard, /signin, and /signup
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
