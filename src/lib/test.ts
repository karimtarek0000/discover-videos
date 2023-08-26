import JWT from "jsonwebtoken";

export const verifyToken = (token: string) => {
  return JWT.verify(token, process.env.TOKEN_SECRET_KEY!);
};
