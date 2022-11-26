import Image from "next/image";
import React, { useCallback } from "react";
import SwitchTextIcon from "../svgs/SwitchTextIcon";
import { setIsTranslation } from "../../store/swapButton/swapButtonSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";

const SongInfo = () => {
  const { isTranslation } = useSelector((store: RootState) => store.swapButton);
  const dispatch = useDispatch();
  const clickButton = useCallback(
    () => dispatch(setIsTranslation(!isTranslation)),
    [dispatch, isTranslation]
  );
  return (
    <section className="song-info-section">
      <Image
        src="/ab67616d0000b2730538b48c180256e0bdd8363f.jpg"
        alt="song-cover"
        width="120"
        height="120"
      />
      <div className="song-info">
        <div className="main-info">
          <h2 className="song-title">I miss you</h2>
          <h3 className="artist-name">blink-182</h3>
        </div>
        <div className="secondary-info">
          <p>
            <span className="light-weight-text">Album: </span>
            <b>blink-182</b>
          </p>
          <p>
            <span className="light-weight-text">Anno di produzione: </span>
            <b>2003</b>
          </p>
          <p>
            <span className="light-weight-text">Scritto da: </span>
            <b>M. Hoppus, T. De Longe, T. Barker</b>
          </p>
          <p>
            <span className="light-weight-text">Prodotto da: </span>
            <b>Jerry Finn</b>
          </p>
        </div>
        <button
          className="show-alt-text"
          onClick={() => {
            console.count();
            return clickButton();
          }}
        >
          <SwitchTextIcon />{" "}
          {isTranslation ? "Mostra testo originale" : "Mostra traduzione"}
        </button>
      </div>
    </section>
  );
};

export default SongInfo;
