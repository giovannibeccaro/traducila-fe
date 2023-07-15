import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import SearchBar from "../components/Searchbar/SearchBar";
import ArrowRightIcon from "../components/svgs/ArrowRightIcon";
import HeroIllustration from "../components/svgs/HeroIllustration";
import HeroIllustrationDesktop from "../components/svgs/HeroIllustrationDesktop";
import HomeMusicNotes from "../components/svgs/HomeMusicNotes";

// import Image from "next/image";
export default function Home() {
  useEffect(() => {
    document.body.classList.add("no-overflow");
    return () => {
      document.body.classList.remove("no-overflow");
    };
  }, []);

  return (
    //TODO inserire descrizione seo
    <>
      <Head>
        <title>Traducila</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="home">
        <div className="home-main">
          <div className="mobile-heading">
            <p>LE MIGLIORI</p>
            <p>TRADUZIONI DEI </p>
            <p>TUOI TESTI PREFERITI</p>
          </div>
          <div className="desktop-heading">
            <p>LE MIGLIORI TRADUZIONI</p>
            <p>DEI TUOI TESTI PREFERITI</p>
          </div>
          <p className="subtitle">
            Esplora il mondo della musica, senza barriere linguistiche:
            traduciamo canzoni, condividiamo emozioni
          </p>
          <SearchBar parentSection="homepage" />
          <Link className="view-others" href="/traduzioni">
            Oppure dai un&apos;occhiata a tutte le nostre traduzioni{" "}
            <ArrowRightIcon />
          </Link>
          <div className="music-notes">
            <HomeMusicNotes />
          </div>
        </div>
        <div className="hero-illustration-mobile">
          <HeroIllustration />
        </div>
        <div className="hero-illustration-desktop">
          <HeroIllustrationDesktop />
        </div>
      </section>
    </>
  );
}
