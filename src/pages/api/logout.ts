import { removeCookie } from "@/lib/cookies";
import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    removeCookie(res);

    res.writeHead(302, { Location: "/login" });
    res.end();
  }
}
