import type { NextPage } from "next";
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
