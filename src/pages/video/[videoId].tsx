import Navbar from "@/components/layout/navbar/Navbar";
import RenderSVG from "@/components/shared/RenderSVG";
import { formatDate } from "@/lib/formatDate";
import videosData from "@/lib/videos";
import { Video } from "@/types";
import { useRouter } from "next/router";
import Style from "../../styles/video.module.css";
import { startFetchMyQuery } from "@/db/hasura";

const { videoWrapper, btnBack, info } = Style;

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

  console.log(startFetchMyQuery());

  return (
    <>
      <Navbar />
      <main className={videoWrapper}>
        {/* Back */}
        <button onClick={back} className={btnBack}>
          <RenderSVG name="back" size="1.5rem" />
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
        <div className={info}>
          {/* Col 1 */}
          <div className="md:basis-[70%]">
            <h3>{formatDate(publishTime)}</h3>
            <h2 className="my-3 text-25">{title}</h2>
            <p className="text-18 max-h-[300px] overflow-auto text-gray-400">{description}</p>
          </div>

          {/* Col 2 */}
          <div className="max-lg:my-5">
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
    </>
  );
};

export default VideoDetails;
