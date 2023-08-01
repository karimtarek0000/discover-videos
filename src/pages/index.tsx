import Card from "@/components/card/Card";
import Header from "@/components/layout/header/Header";
import Navbar from "@/components/layout/navbar/Navbar";
import SectionCard from "@/components/sectionCard/SectionCard";
import videosData from "@/lib/videos";
import { HomeProps } from "@/types";
import Head from "next/head";

export async function getServerSideProps() {
  const [disneyVideos, travelVideos, productivityVideos] = await Promise.all([
    videosData("disney trailer"),
    videosData("travel"),
    videosData("productivity"),
  ]);

  return { props: { disneyVideos, travelVideos, productivityVideos } };
}

export default function Home(props: HomeProps) {
  const { disneyVideos, travelVideos, productivityVideos } = props;

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Discover videos" />
      </Head>
      <Navbar />
      <Header
        title="john wick"
        imgUrl="/images/clifford.webp"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim facere molestiae deserunt. Maxime, aut consequuntur eos quaerat sunt cumque aliquid!"
      />
      <main>
        <SectionCard head="desiny" items={disneyVideos}>
          <Card type="large" />
        </SectionCard>
        <SectionCard head="travel" items={travelVideos}>
          <Card type="small" />
        </SectionCard>
        <SectionCard head="productivity" items={productivityVideos}>
          <Card type="medium" />
        </SectionCard>
      </main>
    </>
  );
}
