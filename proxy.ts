import { NextRequest, NextResponse } from "next/server";

const adminSessionCookie = "eventflow_admin_session";
const clientSessionCookie = "eventflow_client_session";

function redirectToLogin(request: NextRequest, pathname: string) {
  return NextResponse.redirect(new URL(pathname, request.url));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    if (!request.cookies.get(adminSessionCookie)?.value) {
      return redirectToLogin(request, "/admin/login");
    }
  }

  if (pathname.startsWith("/client")) {
    if (pathname === "/client/login") {
      return NextResponse.next();
    }

    if (!request.cookies.get(clientSessionCookie)?.value) {
      return redirectToLogin(request, "/client/login");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"],
};
