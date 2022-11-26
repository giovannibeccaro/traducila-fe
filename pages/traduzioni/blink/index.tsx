import React, { useState } from "react";
import { originalSong } from "./songs";
import { song } from "./songs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const SongTranslationPage = () => {
  const { isTranslation } = useSelector((store: RootState) => store.swapButton);

  return (
    <main className="song-page-main">
      <section className="song-page-main-section">
        <h1>Traduzione di I miss you</h1>
        {isTranslation ? (
          <div
            className="translated-text"
            dangerouslySetInnerHTML={{ __html: song }}
          />
        ) : (
          <div
            className="original-text"
            dangerouslySetInnerHTML={{ __html: originalSong }}
          />
        )}
      </section>
      <section className="song-page-secondary-section">
        <h2>Descrizione</h2>
        <p>
          “I Miss You” is one of Blink-182’s most iconic tracks, serving as a
          haunting depiction of the effect depression can have on a relationship
          and its subsequent fallout.
          <br />
          Chart wise, it peaked at #1 on Billboard’s Alternative Songs and was
          certified Gold by RIAA.
          <br />
          The song was produced entirely acoustically and features an upright
          bass, cello, and brushes on the drums. The track is also the only
          blink-182 track to-date in which Travis uses brushes instead of
          drumsticks.
          <br />
          Tom DeLonge and Mark Hoppus wrote the song in a two-part way,
          combining two songs together to make this track. The song was inspired
          by The Cure’s song “The Lovecats” and contains a reference to the film
          The Nightmare Before Christmas.
          <br />
          The track went on to inspire The Chainsmokers‘ “Closer.”
        </p>
        <h2>Altre traduzioni di blink-182</h2>
        <ul>
          <li>
            <a href="#">Always</a>
          </li>
          <li>
            {" "}
            <a href="#">All the small things</a>
          </li>
          <li>
            {" "}
            <a href="#">What&apos;s my age again</a>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default SongTranslationPage;
