import Card from "@/components/card/Card";
import Navbar from "@/components/layout/navbar/Navbar";
import Grids from "@/components/shared/grids/Grids";
import { getAllWatchedVideos } from "@/lib/videos";
import { HomeProps } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { NextApiRequest, NextApiResponse } from "next";
import Head from "next/head";

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const token = req.cookies?.token as string;
  const userId = verifyToken(token) ?? null;

  const listVideosWatched = (await getAllWatchedVideos(userId, token)) || [];

  return {
    props: { listVideosWatched: listVideosWatched ?? [] },
  };
}

export default function MyList(props: HomeProps) {
  const { listVideosWatched } = props;

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="List videos" />
      </Head>

      <Navbar />

      <main className="container">
        <h2 className="mt-3 mb-5 text-white capitalize max-md:text-center text-40">my list</h2>

        <div>
          <Grids items={listVideosWatched} className="grids--list">
            <Card className="!w-full" />
          </Grids>
        </div>
      </main>
    </>
  );
}
