import React from "react";
import { songType } from "../../types";
import Link from "next/link";

type Props = {
  data: songType[];
  slug: string;
};

const OtherTranslationFromArtist: React.FC<Props> = ({ data, slug }) => {
  //? don't render current song
  const dataWithoutCurrentSong = data.filter(
    (song) => song.attributes.slug !== slug
  );
  return (
    <section>
      <h2>Altre traduzioni di blink-182</h2>
      <ul>
        {dataWithoutCurrentSong.map((song) => (
          <li key={song.id}>
            <Link href={`/traduzioni/${song.attributes.slug}`}>
              {song.attributes.songName}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OtherTranslationFromArtist;
