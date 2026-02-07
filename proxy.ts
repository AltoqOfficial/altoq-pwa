import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// API routes that require authentication
// Note: These will be checked against Cookies OR Bearer token
const protectedApiRoutes = ["/api/profile", "/api/auth/logout"];

// Page routes that require authentication (cookie-based)
// Note: Dashboard is rendered at / for authenticated users via ConditionalHome
const protectedPageRoutes: string[] = [];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 1. Refresh auth token (critical for SSR) and get User
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAuthenticated = !!user;

  // 2. Page Route Protection
  const isProtectedPageRoute = protectedPageRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Redirect unauthenticated users trying to access protected page routes
  if (isProtectedPageRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users trying to access auth routes
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. API Route Protection (Supports Cookie OR Bearer)
  if (protectedApiRoutes.includes(pathname)) {
    // If we already have a user from cookies, we allow access
    if (isAuthenticated) {
      return response;
    }

    // If no cookie user, check for Bearer token
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const {
        data: { user: headerUser },
        error,
      } = await supabase.auth.getUser(token);

      if (!error && headerUser) {
        return response;
      }
    }

    // Neither cookie nor valid token found
    return NextResponse.json(
      {
        message: "Token inválido o expirado",
        status: 401,
        code: "invalid_token",
      },
      { status: 401 }
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (svg, png, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
