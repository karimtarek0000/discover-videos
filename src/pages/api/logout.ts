import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const cookieOptions = {
      expires: new Date(0),
      httpOnly: true,
    };

    const setCookie = cookie.serialize("token", "", cookieOptions);

    res.setHeader("Set-Cookie", setCookie);

    res.status(200).json({ message: "logout sucessfully" });
  }
}
