import { Video } from "@/types";
// import data from "../data/videos.json";

const videosData = async (query: string) => {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;

    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}`
    );
    const data = await res.json();

    if (data?.error) return [];

    return data?.items.map((item: any): Video => {
      return {
        id: item.id?.videoId || item.id,
        title: item.snippet.title || "",
        imgUrl: item.snippet.thumbnails.high.url,
      };
    });
  } catch (error) {
    console.error("Somthing wrong when get videos.", error);
    return [];
  }
};

export default videosData;
