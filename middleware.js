import { NextResponse } from "next/server";

const COOKIE_NAME = "reunion_admin";

async function expectedToken() {
  const secret = process.env.ADMIN_SECRET || "dev-secret";
  const password = process.env.ADMIN_PASSWORD || "";
  const data = new TextEncoder().encode(`${password}::${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only guard /admin (but let the login page through).
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const cookie = request.cookies.get(COOKIE_NAME)?.value;
    const ok = cookie && cookie === (await expectedToken());
    if (!ok) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
