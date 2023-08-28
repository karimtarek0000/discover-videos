import { addNewVideo, findVideoIdByUserId, updateVideo } from "@/db/queries";
import { verifyToken } from "@/lib/jose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function updateStats(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies?.token;

    // ------------------ Check if token exist ------------------------
    if (!token) return res.status(403).json({ message: "Token is not exist" });

    // ------------------ After that check token is valid ------------------------
    const decoded: any = await verifyToken(token);

    if (!decoded.issuer) return res.status(400).json({ message: "Token is not valid" });

    const { issuer: userId } = decoded as any;

    // ----- POST -----
    if (req.method === "POST") {
      const { videoId, favorited = 0, watched = true } = req.body;

      if (videoId) {
        const videoExist = await findVideoIdByUserId(userId, videoId, token);

        if (videoExist.length) {
          const video = await updateVideo({ userId, videoId, favorited, watched }, token);
          return res.status(200).json({ message: "Update video", video });
        }

        const video = await addNewVideo({ userId, videoId, favorited, watched }, token);
        res.status(201).json({ message: "New video created", video });
      } else {
        res.status(400).json({ message: "Video id not exist" });
      }
    }

    // ------ GET ------
    if (req.method === "GET") {
      const videoId = req.query.videoId as string;

      if (videoId) {
        const videoExist = await findVideoIdByUserId(userId, videoId, token);

        videoExist.length ? res.status(200).json({ message: "Video", video: videoExist[0] }) : res.status(200).json({ message: "Video not exist" });
      } else {
        res.status(400).json({ message: "Video id not exist" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Error", error });
  }
}
