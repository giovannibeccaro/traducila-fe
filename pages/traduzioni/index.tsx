import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ListSingleArtist from "../../components/ListSingleArtist/ListSingleArtist";
import ListSingleSong from "../../components/ListSingleSong/ListSingleSong";
import ResultsSection from "../../components/ResultsSection/ResultsSection";
import ChevronDownIcon from "../../components/svgs/ChevronDownIcon";
import ChevronUpIcon from "../../components/svgs/ChevronUpIcon";
import { artistType, fetchedDataType, songType } from "../../types";
import { getQuery } from "../../utils/utils";

type Props = {
  mostViewed: songType[];
  newTranslations: songType[];
  mostViewedArtists: artistType[];
};

const TraduzioniPage: React.FC<Props> = ({
  mostViewed,
  newTranslations,
  mostViewedArtists,
}) => {
  //? lists states
  const [isMostViewedOpen, setIsMostViewedOpen] = useState(true);
  const [isNewTranslationsOpen, setIsNewTranslationsOpen] = useState(false);
  const [isMostViewedArtists, setIsMostViewedArtists] = useState(false);

  // get query parameter
  const router = useRouter();
  const query = router.asPath.split("?")[1];

  return (
    <>
      <Head>
        <title>Traduzioni - Traducila</title>
        <meta
          name="description"
          content="Cerca tra tutte le canzoni presenti nel nostro archivio quella che ti interessa. Scopri nuove canzoni con le nostre liste! "
        />
      </Head>
      <section className="traduzioni">
        {query && <ResultsSection query={query} />}
        <div className="traduzioni-charts">
          <div className="song-list">
            <span className="inline translation-list-header first">
              <button
                className="toggle-show-list"
                onClick={() => {
                  setIsMostViewedOpen(!isMostViewedOpen);
                }}
              >
                <p>I più cercati</p>
                {isMostViewedOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
            </span>
            <div className="mobile-single-song">
              {isMostViewedOpen &&
                mostViewed.map((article, position) => (
                  <ListSingleSong
                    key={article.id}
                    songName={article.attributes.name}
                    artistName={article.attributes.artist.data.attributes.name}
                    songImage={article.attributes.songImg.data.attributes.url}
                    slug={article.attributes.slug + "-traduzione"}
                    artistSlug={article.attributes.artist.data.attributes.slug}
                    position={position}
                  />
                ))}
            </div>
            <div className="desktop-single-song">
              {mostViewed &&
                mostViewed.map((article, position) => (
                  <ListSingleSong
                    key={article.id}
                    songName={article.attributes.name}
                    artistName={article.attributes.artist.data.attributes.name}
                    songImage={article.attributes.songImg.data.attributes.url}
                    slug={article.attributes.slug + "-traduzione"}
                    artistSlug={article.attributes.artist.data.attributes.slug}
                    position={position}
                  />
                ))}
            </div>
          </div>
          <div className="artist-list">
            <span className="inline translation-list-header">
              <button
                className="toggle-show-list"
                onClick={() => setIsMostViewedArtists(!isMostViewedArtists)}
              >
                <p>Artisti più cercati</p>
                {isMostViewedArtists ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
            </span>
            <div className="mobile-single-artist">
              {isMostViewedArtists &&
                mostViewedArtists &&
                mostViewedArtists.map((artist, position) => (
                  <ListSingleArtist
                    key={artist.id}
                    artistName={artist.attributes.name}
                    slug={artist.attributes.slug}
                    position={position}
                  />
                ))}
            </div>
            <div className="desktop-single-artist">
              {mostViewedArtists &&
                mostViewedArtists.map((artist, position) => (
                  <ListSingleArtist
                    key={artist.id}
                    artistName={artist.attributes.name}
                    slug={artist.attributes.slug}
                    position={position}
                  />
                ))}
            </div>
          </div>
          <div className="song-list">
            <span className="inline translation-list-header">
              <button
                className="toggle-show-list"
                onClick={() => setIsNewTranslationsOpen(!isNewTranslationsOpen)}
              >
                <p>Ultime traduzioni</p>
                {isNewTranslationsOpen ? (
                  <ChevronUpIcon />
                ) : (
                  <ChevronDownIcon />
                )}
              </button>
            </span>
            <div className="mobile-single-song">
              {isNewTranslationsOpen &&
                newTranslations &&
                newTranslations.map((article) => (
                  <ListSingleSong
                    key={article.id}
                    songName={article.attributes.name}
                    artistName={article.attributes.artist.data.attributes.name}
                    songImage={article.attributes.songImg.data.attributes.url}
                    slug={article.attributes.slug + "-traduzione"}
                    artistSlug={article.attributes.artist.data.attributes.slug}
                  />
                ))}
            </div>
            <div className="desktop-single-song">
              {newTranslations &&
                newTranslations.map((article) => (
                  <ListSingleSong
                    key={article.id}
                    songName={article.attributes.name}
                    artistName={article.attributes.artist.data.attributes.name}
                    songImage={article.attributes.songImg.data.attributes.url}
                    slug={article.attributes.slug + "-traduzione"}
                    artistSlug={article.attributes.artist.data.attributes.slug}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps() {
  const endpointPosts = getQuery("posts");
  const endpointArtists = getQuery("artists");
  try {
    const [newTranslationsRes, mostViewedRes, mostViewedArtistsRes] =
      await Promise.all([
        fetch(
          `${endpointPosts}?filters[translatedSong][$notNull]=true&sort=publishedAt%3Adesc&pagination[page]=1&pagination[pageSize]=10&populate=*`
        ),
        fetch(
          `${endpointPosts}?filters[translatedSong][$notNull]=true&sort=viewCount%3Adesc&pagination[page]=1&pagination[pageSize]=10&populate=*`
        ),
        fetch(
          `${endpointArtists}?&sort=viewCount%3Adesc&pagination[page]=1&pagination[pageSize]=10&populate=*`
        ),
      ]);

    const [newTranslationsData, mostViewedData, mostViewedArtistsData] =
      await Promise.all<fetchedDataType>([
        newTranslationsRes.json(),
        mostViewedRes.json(),
        mostViewedArtistsRes.json(),
      ]);

    return {
      props: {
        mostViewed: mostViewedData.data,
        newTranslations: newTranslationsData.data,
        mostViewedArtists: mostViewedArtistsData.data,
      },
    };
  } catch (error) {
    console.log(error);
    alert(
      "Qualcosa è andato storto con il caricamento dei dati, aggiornare la pagina"
    );
  }
}

export default TraduzioniPage;
