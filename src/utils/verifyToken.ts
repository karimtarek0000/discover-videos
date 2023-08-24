import JWT from "jsonwebtoken";

export const verifyToken = (token: string) => {
  if (token) {
    const decoded: any = JWT.verify(token, process.env.TOKEN_SECRET_KEY!);

    return decoded?.issuer ? decoded.issuer : null;
  }

  return null;
};
