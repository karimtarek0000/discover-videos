import { createNewUser, isNewUser } from "@/db/queries";
import { setCookie } from "@/lib/cookies";
import { magicServerAdmin } from "@/lib/magicServer";
import { MetaData } from "@/types";
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
        const { email, issuer, publicAddress } = await magicServerAdmin.users.getMetadataByToken(didToken as string);

        // ----------------------- Create token and send this token to hasura --------------------
        const data = {
          email: email,
          issuer,
          publicAddress,
          "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": "user",
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-user-id": issuer,
          },
        };

        const token = JWT.sign(data, process.env.TOKEN_SECRET_KEY as string, { expiresIn: "7d" });

        // ----------------------- Check if user new or not --------------------
        const userStatus = await isNewUser(issuer as string, token);

        if (userStatus) {
          await createNewUser({ email, issuer, publicAddress } as MetaData, token);
        }

        setCookie(token, res);
        return res.status(200).json({ message: "User Done" });
      }

      res.status(400).json({ message: "Token not exist" });
    } catch (error) {
      res.status(400).json({ message: "Error", error });
    }
  }
}
