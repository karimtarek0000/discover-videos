import { NextApiRequest, NextApiResponse } from "next";
import JWT from "jsonwebtoken";

export default async function updateStats(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const token = req.cookies?.token;

      // ------------------ Check if token exist ------------------------
      if (!token) return res.status(403).json({ message: "Token is not exist" });

      // ------------------ After that check token valid ------------------------
      JWT.verify(token, process.env.TOKEN_SECRET_KEY as string, (err, decode) => {
        // -------- If token not valid will return to the client status 403
        if (err) return res.status(403).json({ message: "Token is not valid" });

        // Continue
        res.status(200).json({ message: "done" });
      });
    } catch (error) {
      res.status(400).json({ message: "Error", error });
    }
  }
}
