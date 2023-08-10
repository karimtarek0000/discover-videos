import { Magic } from "magic-sdk";

export const magic: any =
  typeof window !== "undefined" &&
  new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISH_API_KEY as string);
