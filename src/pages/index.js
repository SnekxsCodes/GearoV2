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
import Maintenance from "../../components/Maintenance";
import { Helmet } from "react-helmet";

const cookies = new Cookies();

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const [MaintenanceMode, setMaintenanceMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const welcomeScreenShown = cookies.get("welcomeScreenShown");
    if (!welcomeScreenShown) {
      setShowWelcomeScreen(true);
    }
  }, []);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("maintenance")
      .eq("id", 1)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        } else {
          const currentMode = data[0].maintenance;
          setMaintenanceMode(currentMode);
          setIsLoading(false);
        }
      });
  }, []);

  const handleWelcomeScreenClose = () => {
    cookies.set("welcomeScreenShown", true, { path: "/" });
    setShowWelcomeScreen(false);
  };

  function Preview() {
    const url = "www.gearo.ca";
    return (
      <>
        <Helmet>
          <meta property="og:title" content={`Preview of ${url}`} />
          <meta property="og:description" content={`Preview of ${url}`} />
          <meta
            property="og:image"
            content="https://wallpapers-clan.com/wp-content/uploads/2022/02/hunter-x-hunter-killua-pfp-1.jpg"
          />
          <meta property="og:url" content={url} />
        </Helmet>
      </>
    );
  }

  if (isLoading) {
    return <div></div>;
  } else if (MaintenanceMode) {
    return <Maintenance />;
  } else {
    return (
      <>
        <Preview />

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
}
