import { type } from "os";
import React, { useEffect, useState } from "react";
import ListSingleArtist from "../../components/ListSingleArtist/ListSingleArtist";
import ListSingleSong from "../../components/ListSingleSong/ListSingleSong";
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
  // prendiamo queste canzoni tramite get static props

  const [isMostViewedOpen, setIsMostViewedOpen] = useState(true);
  const [isNewTranslationsOpen, setIsNewTranslationsOpen] = useState(false);
  const [isNewReleasesOpen, setIsNewReleasesOpen] = useState(false);

  useEffect(() => {
    console.log(isMostViewedOpen);
  }, [isMostViewedOpen]);

  return (
    <section className="traduzioni">
      <div className="song-list">
        <span className="inline translation-list-header first">
          <button
            onClick={(e) => {
              console.log(e.currentTarget);

              setIsMostViewedOpen(!isMostViewedOpen);
            }}
          >
            <p>I più cercati</p>
            {isMostViewedOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </span>
        {isMostViewedOpen &&
          mostViewed.map((article, position) => (
            <ListSingleSong
              key={article.id}
              songName={article.attributes.name}
              artistName={article.attributes.artist.data.attributes.name}
              songImage={article.attributes.songImg.data.attributes.url}
              slug={article.attributes.slug}
              artistSlug={article.attributes.artist.data.attributes.slug}
              position={position}
            />
          ))}
      </div>
      <div className="song-list">
        <span className="inline translation-list-header">
          <button
            onClick={() => setIsNewTranslationsOpen(!isNewTranslationsOpen)}
          >
            <p>Ultime traduzioni</p>
            {isNewTranslationsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </span>
        {isNewTranslationsOpen &&
          newTranslations.map((article) => (
            <ListSingleSong
              key={article.id}
              songName={article.attributes.name}
              artistName={article.attributes.artist.data.attributes.name}
              songImage={article.attributes.songImg.data.attributes.url}
              slug={article.attributes.slug}
              artistSlug={article.attributes.artist.data.attributes.slug}
            />
          ))}
      </div>

      <div className="song-list">
        <span className="inline translation-list-header">
          <button onClick={() => setIsNewReleasesOpen(!isNewReleasesOpen)}>
            <p>Artisti più cercati</p>
            {isNewReleasesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </span>
        {isNewReleasesOpen &&
          mostViewedArtists.map((artist, position) => (
            <ListSingleArtist
              key={artist.id}
              artistName={artist.attributes.name}
              slug={artist.attributes.slug}
              position={position}
            />
          ))}
      </div>
    </section>
  );
};

export async function getStaticProps() {
  const endpointPosts = getQuery("posts");
  const endpointArtists = getQuery("artists");
  try {
    const [newTranslationsRes, mostViewedRes, mostViewedArtistsRes] =
      await Promise.all([
        fetch(
          `${endpointPosts}?sort=publishedAt%3Adesc&pagination[page]=1&pagination[pageSize]=10&populate=*`
        ),
        fetch(
          `${endpointPosts}?sort=viewCount%3Adesc&pagination[page]=1&pagination[pageSize]=10&populate=*`
        ),
        fetch(
          `${endpointArtists}?sort=viewCount%3Adesc&pagination[page]=1&pagination[pageSize]=10&populate=*`
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
  }
}

export default TraduzioniPage;
