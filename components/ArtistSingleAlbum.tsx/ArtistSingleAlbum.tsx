import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { songType } from "../../types";
import InfoIcon from "../svgs/InfoIcon";

type Props = {
  albumData: {
    name: string;
    slug: string;
    imageUrl: string;
    songs: {
      data: songType[];
    };
  };
  artistSlug: string;
};

const ArtistSingleAlbum: React.FC<Props> = ({ albumData, artistSlug }) => {
  const [showTooltip, setShowTooltip] = useState({ visible: false, id: 99999 });

  return (
    <div className="single-album">
      <div className="top-part">
        <h2 className="album-name">{albumData.name}</h2>

        <Image
          src={albumData.imageUrl}
          alt={`copertina di ${albumData.name}`}
          width="60"
          height="60"
        />
      </div>
      <ul>
        {albumData.songs.data.map((song) => {
          if (song.attributes.translatedSong) {
            return (
              <li className="translated" key={song.id}>
                <Link href={`/${artistSlug}/${song.attributes.slug}`}>
                  {song.attributes.title}
                  <p className="category">Testo e traduzione</p>
                </Link>
              </li>
            );
          } else
            return (
              <li className="not-translated" key={song.id}>
                <p>{song.attributes.title}</p>
                <p
                  className={`no-translation-available ${
                    showTooltip.visible && showTooltip.id === song.id
                      ? "small"
                      : "big"
                  }`}
                  onClick={() =>
                    setShowTooltip({
                      visible: !showTooltip.visible,
                      id: song.id,
                    })
                  }
                >
                  {showTooltip.visible && showTooltip.id === song.id ? (
                    <span>
                      Non abbiamo ancora tradotto questa canzone.{" "}
                      <Link className="more-info" href={"/traduzioni"}>
                        Clicca qui
                      </Link>{" "}
                      per scoprire di più.
                    </span>
                  ) : (
                    <InfoIcon />
                  )}
                </p>
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export default ArtistSingleAlbum;
