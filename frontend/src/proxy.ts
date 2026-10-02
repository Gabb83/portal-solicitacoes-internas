import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  console.log("🔐 PROXY EXECUTOU");
  console.log("📍 ROTA:", request.nextUrl.pathname);
  console.log("🍪 TOKEN:", token);

  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith("/auth");

  if (!token && !isAuthPage) {
    console.log("🚫 Sem token → /auth");

    return NextResponse.redirect(
      new URL("/auth", request.url)
    );
  }

  if (token && isAuthPage) {
    console.log("✅ Com token → /");

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