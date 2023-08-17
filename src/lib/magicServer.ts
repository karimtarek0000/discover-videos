import { Magic } from "@magic-sdk/admin";

export const magicServerAdmin = new Magic(process.env.MAGIC_SECRET_KEY);
