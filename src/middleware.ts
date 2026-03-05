import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is authenticated (using the cookie we set in the login store)
  const isAuthTokenSet = request.cookies.has("pos-auth-token");

  // Define public routes (auth pages, static files, api routes)
  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  // Allow static assets, images, and API routes to pass through
  const isPublicAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") || // files with extensions (images, icons, etc)
    pathname === "/favicon.ico";

  if (isPublicAsset) {
    return NextResponse.next();
  }

  // If the user is unauthenticated and trying to access a protected route
  if (!isAuthTokenSet && !isAuthRoute) {
    const signInUrl = new URL("/sign-in", request.url);
    // You can also pass the current path as a redirect-back param if you want
    // signInUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If the user IS authenticated and trying to access login/register pages
  if (isAuthTokenSet && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
