import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { songType } from "../../types";
import { getQuery } from "../../utils/utils";

type Props = {
  albumData: {
    name: string;
    slug: string;
    songs: {
      data: songType[];
    };
  };
  artistSlug: string;
};

const ArtistSingleAlbum: React.FC<Props> = ({ albumData, artistSlug }) => {
  const [albumImg, setAlbumImg] = useState("/placeholder.png");

  useEffect(() => {
    async function fetchImage() {
      const res = await fetch(`${getQuery("albums")}?populate=image`);
      const data = await res.json();
      const image = data.data[0].attributes.image.data[0].attributes.url;

      setAlbumImg(image);
    }
    fetchImage();
  }, [albumData.songs.data]);

  return (
    <div className="single-album">
      <div className="top-part">
        <h2 className="album-name">{albumData.name}</h2>

        <Image
          src={albumImg}
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
                  {song.attributes.name}
                  <p className="category">Testo e traduzione</p>
                </Link>
              </li>
            );
          } else
            return (
              <li className="not-translated" key={song.id}>
                {song.attributes.name}
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export default ArtistSingleAlbum;
