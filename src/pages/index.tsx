import Card from "@/components/card/Card";
import Header from "@/components/layout/header/Header";
import Navbar from "@/components/layout/navbar/Navbar";
import SectionCard from "@/components/sectionCard/SectionCard";
import videosData, { getAllWatchedVideos } from "@/lib/videos";
import { HomeProps } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { NextApiRequest } from "next";
import Head from "next/head";

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const token = (req.cookies?.token as string) ?? null;
  const userId = verifyToken(token);

  const [disneyVideos, travelVideos, productivityVideos, mostPopularVideos, listVideosWatched] = await Promise.all([
    videosData("disney trailer"),
    videosData("travel"),
    videosData("productivity"),
    videosData("mostPopular", "popular"),
    getAllWatchedVideos(userId, token),
  ]);

  return { props: { disneyVideos, travelVideos, productivityVideos, mostPopularVideos, listVideosWatched } };
}

export default function Home(props: HomeProps) {
  const { disneyVideos, travelVideos, productivityVideos, mostPopularVideos, listVideosWatched } = props;

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Discover videos" />
      </Head>

      <Navbar />

      <Header
        title="john wick"
        type="movies"
        imgUrl="/images/john-wick.jpg"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim facere molestiae deserunt. Maxime, aut consequuntur eos quaerat sunt cumque aliquid!"
        videoId="qEVUtrk8_B4"
      />

      <main>
        <SectionCard head="desiny" items={disneyVideos}>
          <Card type="large" />
        </SectionCard>
        {listVideosWatched.length && (
          <SectionCard head="Watch it again" items={listVideosWatched}>
            <Card type="small" />
          </SectionCard>
        )}
        <SectionCard head="travel" items={travelVideos}>
          <Card type="small" />
        </SectionCard>
        <SectionCard head="productivity" items={productivityVideos}>
          <Card type="medium" />
        </SectionCard>
        <SectionCard head="popular" items={mostPopularVideos}>
          <Card type="small" />
        </SectionCard>
      </main>
    </>
  );
}
