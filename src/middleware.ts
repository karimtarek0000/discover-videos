import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyToken } from "./lib/test";

// if (req.nextUrl.pathname.startsWith("/api/stats"))

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  // // ------------------ Check if token exist ------------------------
  // if (!token?.value)
  //   return NextResponse.json(
  //     { message: "Token is not exist" },
  //     {
  //       status: 403,
  //     }
  //   );

  // // -------- Check if data exist in body or not --------------------
  // if (!videoId)
  //   return NextResponse.json(
  //     { message: "Video id not exist!" },
  //     {
  //       status: 400,
  //     }
  //   );

  const decodedToken = verifyToken(token.value);

  console.log(decodedToken);

  // const { issuer: userId } = decodedToken as any;

  return NextResponse.json({ message: "Done" }, { status: 400 });
}
