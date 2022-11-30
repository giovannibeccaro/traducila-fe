import Head from "next/head";
import { useEffect } from "react";
import SearchBar from "../components/Searchbar/SearchBar";
import ArrowRightIcon from "../components/svgs/ArrowRightIcon";
import HeroIllustration from "../components/svgs/HeroIllustration";
import useCheckHeight from "../hooks/useCheckHeight";
// import Image from "next/image";
export default function Home() {
  const height = useCheckHeight();
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
          <h1>LE MIGLIORI</h1>
          <h1>TRADUZIONI DEI </h1>
          <h1>TUOI TESTI PREFERITI</h1>
          <p>
            Inserire qui un testo carino riguardo il fatto che le nostre
            traduzioni sono migliori per motivo X.
          </p>
          <SearchBar parentSection="homepage" />
          <a href="#">
            Oppure dai un&apos;occhiata a tutte le nostre traduzioni{" "}
            <ArrowRightIcon />
          </a>
        </div>
        {height && height > 500 && (
          <div className="hero-illustration">
            <HeroIllustration />
          </div>
        )}
      </section>
    </>
  );
}
