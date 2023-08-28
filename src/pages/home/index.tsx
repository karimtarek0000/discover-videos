import Card from "@/components/card/Card";
import Header from "@/components/layout/header/Header";
import Navbar from "@/components/layout/navbar/Navbar";
import SectionCard from "@/components/sectionCard/SectionCard";
import videosData, { getAllWatchedVideos } from "@/lib/videos";
import { HomeProps } from "@/types";
import { verifyToken } from "@/lib/jose";
import { NextApiRequest, NextApiResponse } from "next";
import Head from "next/head";

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  const token = req?.cookies?.token as string;
  const { payload }: any = await verifyToken(token);

  const [disneyVideos, travelVideos, productivityVideos, mostPopularVideos, listVideosWatched] = await Promise.all([
    videosData("disney trailer"),
    videosData("travel"),
    videosData("productivity"),
    videosData("mostPopular", "popular"),
    getAllWatchedVideos(payload?.issuer, token),
  ]);

  // For caching
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  return {
    props: {
      disneyVideos,
      travelVideos,
      productivityVideos,
      mostPopularVideos,
      listVideosWatched: listVideosWatched ?? [],
    },
  };
}

export default function Home(props: HomeProps) {
  const { disneyVideos, travelVideos, productivityVideos, mostPopularVideos, listVideosWatched } = props;

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Discover videos" />
      </Head>

      <Navbar classes="fixed" />

      <Header
        title="john wick"
        type="movies"
        imgUrl="/images/john-wick.jpg"
        subTitle="John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes."
        videoId="qEVUtrk8_B4"
      />

      <main className="max-md:px-2">
        <SectionCard head="desiny" items={disneyVideos}>
          <Card type="large" />
        </SectionCard>
        {listVideosWatched?.length && (
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
