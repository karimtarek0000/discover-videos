import JWT from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/stats")) {
    const token = req.cookies.get("token");
    const body = await req.json();
    const { videoId } = body;

    // ------------------ Check if token exist ------------------------
    if (!token?.value)
      return NextResponse.json(
        { message: "Token is not exist" },
        {
          status: 403,
        }
      );

    // -------- Check if data exist in body or not --------------------
    if (!videoId)
      return NextResponse.json(
        { message: "Video id not exist!" },
        {
          status: 400,
        }
      );

    // const decodedToken = JWT.verify(token.value, process.env.TOKEN_SECRET_KEY!);

    // const { issuer: userId } = decodedToken as any;

    return NextResponse.json({ message: "Done" }, { status: 400 });
  }
}
