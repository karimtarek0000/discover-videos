import { isNewUser } from "@/db/queries";
import { magicServerAdmin } from "@/lib/magicServer";
import JWT from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const getToken: string = req.headers.authorization as string;

      // ----------------------- Check if token exists --------------------
      if (getToken) {
        const didToken = getToken.split(" ")[1];

        // ----------------------- Get user data from token magic link --------------------
        const { email, issuer } = await magicServerAdmin.users.getMetadataByToken(
          didToken as string
        );

        // ----------------------- Create token and send this token to hasura --------------------
        const data = {
          email: email,
          "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": "user",
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-user-id": issuer,
          },
        };

        const token = JWT.sign(data, process.env.TOKEN_SECRET_KEY as string, { expiresIn: "7d" });

        // ----------------------- Check if user new or not --------------------
        const user = await isNewUser(issuer as string, token);

        return res.status(200).json({ message: "User data", isNewUser: user });
      }

      res.status(200).json({ message: "Token not exist" });
    } catch (error) {
      res.status(400).json({ message: "fail", error });
    }
  }
}
