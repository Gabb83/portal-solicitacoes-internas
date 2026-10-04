import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith("/auth");

  if(!token && !isAuthPage) {
    return NextResponse.redirect(
      new URL("/auth", request.url)
    );
  }

  if(token && isAuthPage) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};