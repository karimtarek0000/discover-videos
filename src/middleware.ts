import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyToken } from "./lib/jose";

export async function middleware(req: NextRequest) {
  const token = req?.cookies?.get("token");

  const decoded: any = await verifyToken(token?.value as string);

  if (req.nextUrl.pathname.match("/login")) {
    if (decoded?.payload?.issuer) return NextResponse.redirect(new URL("/", req.url));
  }

  if (!req.nextUrl.pathname.match("/login")) {
    if (!decoded?.payload?.issuer) return NextResponse.redirect(new URL("/login", req.url));
  }

  // if (decoded?.payload?.issuer) {
  //   if (req.nextUrl.pathname.match("/login")) {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  // }
  // if (!decoded?.payload?.issuer && !req.nextUrl.pathname.match("/login")) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // if (decoded?.payload?.issuer && req.nextUrl.pathname.match("/login")) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
