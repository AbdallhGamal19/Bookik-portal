import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/",
  "/Discover",
  "/Explorer",
  "/Categories",
  "/FeaturedDeals",
  "/NewOffers",
  "/top-Advertiser",
];

const protectedRoutes = [
  "/profile",
  "/Company-Statistics",
  "/messaging",
  "/store",
  "/followers-ads",
  "/join-creators",
];

// دالة للتحقق من أن المستخدم مسجل دخول
function isUserAuthenticated(request: NextRequest): boolean {
  // التحقق من وجود token في cookies
  const token = request.cookies.get("auth_token")?.value;
  const user = request.cookies.get("auth_user")?.value;

  // التحقق من وجود token في headers
  const authHeader = request.headers.get("authorization");
  const tokenFromHeader = authHeader?.replace("Bearer ", "");

  // إذا كان هناك token في أي مكان، نعتبر المستخدم مسجل دخول
  return !!(token || tokenFromHeader || user);
}

// دالة للتحقق من أن المستخدم لديه صلاحيات للوصول للصفحة
function hasPageAccess(request: NextRequest, pathname: string): boolean {
  // للصفحات العامة، السماح دائماً
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return true;
  }

  // للصفحات المحمية، التحقق من المصادقة
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    return isUserAuthenticated(request);
  }

  // للصفحات الأخرى، السماح بالوصول
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // تجاهل الملفات الثابتة والـ API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // التحقق من الصلاحيات
  if (!hasPageAccess(request, pathname)) {
    // إعادة توجيه للصفحة الرئيسية
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("redirect", pathname);
    url.searchParams.set("auth", "required");

    return NextResponse.redirect(url);
  }

  // إذا كان المستخدم لديه صلاحيات، السماح بالوصول

  // إضافة headers للمصادقة (للهيدر)
  const response = NextResponse.next();

  // إضافة header للإشارة إلى أن المستخدم مسجل دخول
  response.headers.set("X-Auth-Status", "authenticated");

  // إضافة headers للمصادقة (للهيدر)
  if (isUserAuthenticated(request)) {
    response.headers.set("X-User-Authenticated", "true");

    // إضافة بيانات المستخدم في headers (للهيدر)
    const user = request.cookies.get("auth_user")?.value;
    if (user) {
      try {
        const userData = JSON.parse(user);
        response.headers.set("X-User-Name", userData.name || "");
        response.headers.set("X-User-Email", userData.email || "");
        response.headers.set("X-User-ID", userData.id || "");
      } catch (error) {}
    }
  } else {
    response.headers.set("X-User-Authenticated", "false");
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
