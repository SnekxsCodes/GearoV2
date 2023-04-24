import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ThemeToggle from "/components/ThemeToggle";
import Header from "../../components/Header";
import { useEffect } from "react";
import { supabase } from "../../components/helpers/supabase";
import HomePageGrid from "../../components/HomePageGrid";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Gearo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HomePageGrid />
    </>
  );
}
