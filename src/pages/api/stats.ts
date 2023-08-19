import { NextApiRequest, NextApiResponse } from "next";
import JWT from "jsonwebtoken";
import { addNewVideo, findVideoIdByUserId, updateVideo } from "@/db/queries";

export default async function updateStats(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const token = req.cookies?.token;
      const { favorited, watched } = req.body;
      const videoId = req.query.videoId as string;

      // ------------------ Check if token exist ------------------------
      if (!token) return res.status(403).json({ message: "Token is not exist" });

      // ------------------ After that check token valid ------------------------
      return JWT.verify(token, process.env.TOKEN_SECRET_KEY as string, async (err, decoded) => {
        // -------- If token not valid will return to the client status 403
        if (err) return res.status(403).json({ message: "Token is not valid" });

        // ------ Check if video id exist or not and get video with id --------
        if (videoId) {
          const { issuer: userId } = decoded as any;

          const isVideoExist = await findVideoIdByUserId(userId, videoId, token);

          // ----- If video exist will updated if not will create new video -----
          if (isVideoExist) {
            const video = await updateVideo({ userId, videoId, favorited, watched }, token);

            return res.status(200).json({ message: "Update video", video });
          }

          const video = await addNewVideo({ userId, videoId, favorited, watched }, token);

          res.status(201).json({ message: "New video created", video });
        } else {
          res.status(400).json({ message: "Video id not exist" });
        }
      });
    } catch (error) {
      res.status(400).json({ message: "Error", error });
    }
  }
}
