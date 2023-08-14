import { useRouter } from "next/router";
import Style from "../../styles/video.module.css";
import videosData from "@/lib/videos";
import { Video } from "@/types";

const { videoWrapper, btnBack } = Style;

export async function getStaticPaths() {
  const paths = ["qEVUtrk8_B4", "uYPbbksJxIg", "avz06PDqDbM"].map((videoId) => ({
    params: { videoId },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const video = await videosData(params.videoId, "video");

  return {
    props: {
      video: video?.length ? video[0] : {},
    },
    revalidate: 20,
  };
}

const VideoDetails = ({ video }: { video: Video }): JSX.Element => {
  const { query, back } = useRouter();

  const { title, description, publishTime, statistics, channelTitle } = video;

  return (
    <main className={videoWrapper}>
      {/* Back */}
      <button onClick={back} className={btnBack}>
        back
      </button>

      {/* Video */}
      <iframe
        id="ytplayer"
        typeof="text/html"
        height="360"
        className="w-full"
        src={`https://www.youtube.com/embed/${query.videoId}?autoplay=0&controls=0&origin=http://example.com`}
      ></iframe>

      {/* Info */}
      <div className="flex justify-between mt-5 text-white max-lg:flex-wrap">
        <div className="md:basis-[70%]">
          <h3>{publishTime}</h3>
          <h2 className="my-3 text-25">{title}</h2>
          <p className="text-18 max-h-[300px] overflow-auto  text-gray-400">{description}</p>
        </div>
        <div>
          <p>
            <span className="text-gray-400">Channel: </span>
            {channelTitle}
          </p>
          <p>
            <span className="text-gray-400">View count: </span> {statistics.viewCount}
          </p>
        </div>
      </div>
    </main>
  );
};

export default VideoDetails;
