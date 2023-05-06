import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ThemeToggle from "/components/ThemeToggle";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { supabase } from "../../components/helpers/supabase";
import HomePageGrid from "../../components/HomePageGrid";
import SplashScreen from "../../components/SplashScreen";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);

  useEffect(() => {
    const welcomeScreenShown = cookies.get("welcomeScreenShown");
    if (!welcomeScreenShown) {
      setShowWelcomeScreen(true);
    }
  }, []);

  const handleWelcomeScreenClose = () => {
    cookies.set("welcomeScreenShown", true, { path: "/" });
    setShowWelcomeScreen(false);
  };

  return (
    <>
      <Head>
        <title>Gearo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="overlay-container">
        <Header />
        <HomePageGrid />
      </div>
      <div className={`overlay ${showWelcomeScreen ? "active" : ""}`}>
        <SplashScreen onClose={handleWelcomeScreenClose} />
      </div>
    </>
  );
}
