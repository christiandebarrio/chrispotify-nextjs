import type { NextPage } from "next";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>chrispotify</title>
        <meta name="description" content="Spotify clone made with next js" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="bg-black h-screen overflow-hidden">
        <Sidebar />
        {/* Center */}
      </main>
      <footer>{/* player */}</footer>
    </div>
  );
};

export default Home;
