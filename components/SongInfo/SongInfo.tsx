import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SwitchTextIcon from "../svgs/SwitchTextIcon";
import { setIsTranslation } from "../../store/swapButton/swapButtonSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";

const SongInfo = () => {
  //? redux for original song/translation check
  const { isTranslation } = useSelector((store: RootState) => store.swapButton);
  const dispatch = useDispatch();
  const clickButton = useCallback(
    () => dispatch(setIsTranslation(!isTranslation)),
    [dispatch, isTranslation]
  );

  //? redux for song info state
  const { songInfo } = useSelector((store: RootState) => store.songInfo);
  const {
    songName,
    songImg,
    artistName,
    albumName,
    yearOfProduction,
    writtenBy,
    producedBy,
  } = songInfo;
  //? slim navbar functionality
  //  1) check if user has scrolled
  const [isPageScrolled, setIsPageScrolled] = useState<boolean>(false);

  useEffect(() => {
    function checkScroll() {
      if (window.pageYOffset > 50 && !isPageScrolled) {
        setIsPageScrolled(true);
      } else if (window.pageYOffset < 50 && isPageScrolled) {
        setIsPageScrolled(false);
      }
    }
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  });

  return (
    <section
      className={
        isPageScrolled ? "song-info-section slim" : "song-info-section "
      }
    >
      {songImg ? (
        <Image src={`${songImg}`} alt="song-cover" width="120" height="120" />
      ) : (
        <Image
          src={"/placeholder.png"}
          alt="song-cover"
          width="120"
          height="120"
        />
      )}
      <div className="song-info">
        <div className="main-info">
          <h2 className="song-title">{songName}</h2>
          <h3 className="artist-name">{artistName}</h3>
        </div>
        {!isPageScrolled && (
          <div className="secondary-info">
            <p>
              <span className="light-weight-text">Album: </span>
              <b>{albumName}</b>
            </p>
            <p>
              <span className="light-weight-text">Anno di produzione: </span>
              <b>{yearOfProduction}</b>
            </p>
            <p>
              <span className="light-weight-text">Scritto da: </span>
              <b>{writtenBy}</b>
            </p>
            <p>
              <span className="light-weight-text">Prodotto da: </span>
              <b>{producedBy}</b>
            </p>
          </div>
        )}
        <button
          className="show-alt-text"
          onClick={() => {
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
