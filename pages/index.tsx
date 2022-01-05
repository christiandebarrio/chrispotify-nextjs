import type { NextPage } from "next";
import { getSession, GetSessionParams } from "next-auth/react";
import Head from "next/head";
import { Center } from "../components/Center";
import { Sidebar } from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>chrispotify</title>
        <meta name="description" content="Spotify clone made with next js" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <footer>{/* player */}</footer>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

  return { props: { session } };
}
