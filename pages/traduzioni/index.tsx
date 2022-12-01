import React, { useState } from "react";
import ListSingleSong from "../../components/ListSingleSong/ListSingleSong";
import ChevronDownIcon from "../../components/svgs/ChevronDownIcon";
import ChevronUpIcon from "../../components/svgs/ChevronUpIcon";

const TraduzioniPage = () => {
  // prendiamo queste canzoni tramite get static props
  const articlesFromBE = [
    {
      song_name: "I miss you",
      artist_name: "blink-182",
      song_image: "/ab67616d0000b2730538b48c180256e0bdd8363f.jpg",
      category: "Testo e traduzione",
      id: 1,
    },
    {
      song_name: "I miss you",
      artist_name: "blink-182",
      song_image: "/ab67616d0000b2730538b48c180256e0bdd8363f.jpg",
      category: "Testo e traduzione",
      id: 2,
    },
    {
      song_name: "I miss you",
      artist_name: "blink-182",
      song_image: "/ab67616d0000b2730538b48c180256e0bdd8363f.jpg",
      category: "Testo e traduzione",
      id: 3,
    },
    {
      song_name: "I miss you",
      artist_name: "blink-182",
      song_image: "/ab67616d0000b2730538b48c180256e0bdd8363f.jpg",
      category: "Testo e traduzione",
      id: 4,
    },
    {
      song_name: "I miss you",
      artist_name: "blink-182",
      song_image: "/ab67616d0000b2730538b48c180256e0bdd8363f.jpg",
      category: "Testo e traduzione",
      id: 5,
    },
    {
      song_name: "I miss you",
      artist_name: "blink-182",
      song_image: "/ab67616d0000b2730538b48c180256e0bdd8363f.jpg",
      category: "Testo e traduzione",
      id: 6,
    },
    {
      song_name: "I miss you",
      artist_name: "blink-182",
      song_image: "/ab67616d0000b2730538b48c180256e0bdd8363f.jpg",
      category: "Testo e traduzione",
      id: 7,
    },
    {
      song_name: "I miss you",
      artist_name: "blink-182",
      song_image: "/ab67616d0000b2730538b48c180256e0bdd8363f.jpg",
      category: "Testo e traduzione",
      id: 8,
    },
    {
      song_name: "I miss you",
      artist_name: "blink-182",
      song_image: "/ab67616d0000b2730538b48c180256e0bdd8363f.jpg",
      category: "Testo e traduzione",
      id: 9,
    },
    {
      song_name: "I miss you",
      artist_name: "blink-182",
      song_image: "/ab67616d0000b2730538b48c180256e0bdd8363f.jpg",
      category: "Testo e traduzione",
      id: 10,
    },
  ];

  const [isMostViewedOpen, setIsMostViewedOpen] = useState(true);
  const [isNewTranslationsOpen, setIsNewTranslationsOpen] = useState(false);
  const [isNewReleasesOpen, setIsNewReleasesOpen] = useState(false);

  return (
    <section className="traduzioni">
      <div className="song-list">
        <span className="inline translation-list-header first">
          <h2>I più cercati</h2>{" "}
          <button onClick={() => setIsMostViewedOpen(!isMostViewedOpen)}>
            {isMostViewedOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </span>
        {isMostViewedOpen &&
          articlesFromBE.map((article) => (
            <ListSingleSong
              key={article.id}
              songName={article.song_name}
              artistName={article.artist_name}
              songImage={article.song_image}
              category={article.category}
            />
          ))}
      </div>
      <div className="song-list">
        <span className="inline translation-list-header">
          <h2>Ultime traduzioni</h2>{" "}
          <button
            onClick={() => setIsNewTranslationsOpen(!isNewTranslationsOpen)}
          >
            {isNewTranslationsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </span>
        {isNewTranslationsOpen &&
          articlesFromBE.map((article) => (
            <ListSingleSong
              key={article.id}
              songName={article.song_name}
              artistName={article.artist_name}
              songImage={article.song_image}
              category={article.category}
            />
          ))}
      </div>

      <div className="song-list">
        <span className="inline translation-list-header">
          <h2>Ultime uscite</h2>{" "}
          <button onClick={() => setIsNewReleasesOpen(!isNewReleasesOpen)}>
            {isNewReleasesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </span>
        {isNewReleasesOpen &&
          articlesFromBE.map((article) => (
            <ListSingleSong
              key={article.id}
              songName={article.song_name}
              artistName={article.artist_name}
              songImage={article.song_image}
              category={article.category}
            />
          ))}
      </div>
    </section>
  );
};

export default TraduzioniPage;
