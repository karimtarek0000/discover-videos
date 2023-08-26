import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyToken } from "./lib/jose";

export async function middleware(req: NextRequest) {
  const token = req?.cookies?.get("token");

  const decoded: any = await verifyToken(token?.value as string);

  const { pathname } = req.nextUrl;

  if (!decoded?.payload?.issuer && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (decoded?.payload?.issuer && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
