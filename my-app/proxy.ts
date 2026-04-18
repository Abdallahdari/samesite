import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = new Set(["/login", "/register"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API and Next internals early (defense-in-depth; matcher should exclude most).
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  const isAuthRoute = AUTH_ROUTES.has(pathname);

  // If already authenticated, don't allow visiting login/register.
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If not authenticated, protect everything except login/register.
  if (!token && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url);
    if (pathname && pathname !== "/") loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
