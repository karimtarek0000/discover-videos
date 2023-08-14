import Card from "@/components/card/Card";
import Header from "@/components/layout/header/Header";
import Navbar from "@/components/layout/navbar/Navbar";
import SectionCard from "@/components/sectionCard/SectionCard";
import { LayoutDefault } from "@/layouts/default";
import videosData from "@/lib/videos";
import { HomeProps } from "@/types";
import Head from "next/head";

export async function getServerSideProps() {
  const [disneyVideos, travelVideos, productivityVideos, mostPopularVideos] = await Promise.all([
    videosData("disney trailer"),
    videosData("travel"),
    videosData("productivity"),
    videosData("mostPopular", "popular"),
  ]);

  return { props: { disneyVideos, travelVideos, productivityVideos, mostPopularVideos } };
}

export default function Home(props: HomeProps) {
  const { disneyVideos, travelVideos, productivityVideos, mostPopularVideos } = props;

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
          <Card type="medium" />
        </SectionCard>
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
