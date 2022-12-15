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
    <>
      <Head>
        <title>Progetto GC - Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="home">
        <div className="home-main">
          <div className="mobile-heading">
            <h1>LE MIGLIORI</h1>
            <h1>TRADUZIONI DEI </h1>
            <h1>TUOI TESTI PREFERITI</h1>
          </div>
          <div className="desktop-heading">
            <h1>LE MIGLIORI TRADUZIONI</h1>
            <h1>DEI TUOI TESTI PREFERITI</h1>
          </div>
          <p className="subtitle">
            Inserire qui un testo carino riguardo il fatto che le nostre
            traduzioni sono migliori per motivo X.
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
