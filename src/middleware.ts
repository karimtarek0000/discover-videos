import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyToken } from "./lib/jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token") || null;

  const decoded: any = await verifyToken(token?.value as string);

  const { pathname } = req.nextUrl;

  if (!token && !decoded?.payload?.issuer && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && decoded?.payload?.issuer && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/login", "/brows/my-list", "/video/:videoId*"],
};
