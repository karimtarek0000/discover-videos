import cookie from "cookie";
import { NextApiResponse } from "next";

const maxAge = 7 * 24 * 60 * 60;

export const setCookie = (token: string, res: NextApiResponse) => {
  const setCookie = cookie.serialize("token", token, {
    maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    // secure: process.env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
  });

  res.setHeader("Set-Cookie", setCookie);
};
