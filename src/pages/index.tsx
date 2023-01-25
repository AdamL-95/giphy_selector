import Head from "next/head";
import styles from "@/styles/Home.module.css";
import SearchBar from "@/components/SearchBar";
import { Inter } from "@next/font/google";
import { useState } from "react";
import SearchResults from "@/components/SearchResults";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <SearchBar setSearchQuery={setSearchQuery} />
        <SearchResults searchQuery={searchQuery} />
      </main>
    </>
  );
}
