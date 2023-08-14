import { Video } from "@/types";
import fetchData from "@/utils/fetchData";

const API_KEY = process.env.YOUTUBE_API_KEY;

const videosData = async (query: string, typeURL = "videos") => {
  try {
    const URL: any = {
      videos: `${process.env.YOUTUBE_URL}/search?part=snippet&maxResults=25&q=${query}&key=${API_KEY}`,
      popular: `${process.env.YOUTUBE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=${query}&maxResults=25&regionCode=US&key=${API_KEY}`,
      video: `${process.env.YOUTUBE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${query}&key=${API_KEY}
      `,
    };

    const data = await fetchData(URL[typeURL]);

    if (data?.error) {
      console.error("Error", data.error);
      return [];
    }

    return data?.items?.map((item: any): Video => {
      const snippet = item?.snippet;

      return {
        id: item.id?.videoId || item.id,
        title: snippet.title || "",
        imgUrl: snippet.thumbnails.high.url,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item?.statistics ? item?.statistics : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.error("Somthing wrong when get videos.", error);
    return [];
  }
};

export default videosData;
