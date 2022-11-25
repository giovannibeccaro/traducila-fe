import React from "react";
import SingleMostSearched from "../../components/SingleMostSearched/SingleMostSearched";
import ChevronDown from "../../components/svgs/ChevronDown";
import ChevronUp from "../../components/svgs/ChevronUp";

const TraduzioniPage = () => {
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

  return (
    <section className="traduzioni">
      <div className="most-viewed">
        <span className="inline translation-list-header first">
          <h2>I più cercati</h2> <ChevronUp />
        </span>
        {articlesFromBE.map((article) => (
          <SingleMostSearched
            key={article.id}
            songName={article.song_name}
            artistName={article.artist_name}
            songImage={article.song_image}
            category={article.category}
          />
        ))}
      </div>
      <div className="most-viewed">
        <span className="inline translation-list-header">
          <h2>Ultime traduzioni</h2> <ChevronUp />
        </span>
        {articlesFromBE.map((article) => (
          <SingleMostSearched
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
