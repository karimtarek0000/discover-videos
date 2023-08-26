import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY);

export const signToken = async (data: any) => {
  return await new SignJWT(data).setProtectedHeader({ alg: "HS256" }).setExpirationTime("7d").sign(secret);
};

export const verifyToken = async (token: string) => {
  if (token) {
    return await jwtVerify(token as string, secret);
  }
  return null;
};
