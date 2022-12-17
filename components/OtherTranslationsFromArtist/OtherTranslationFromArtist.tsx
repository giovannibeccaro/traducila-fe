import React, { useEffect, useState } from "react";
import { songType } from "../../types";
import Link from "next/link";

type Props = {
  data: songType[];
  slug: string;
  artistSlug: string;
};

const OtherTranslationFromArtist: React.FC<Props> = ({
  data,
  slug,
  artistSlug,
}) => {
  //? don't render current song

  const [dataWithoutCurrentSong, setDataWithoutCurrentSong] = useState<
    songType[]
  >([]);

  useEffect(() => {
    const dataWithoutCurrentSong = data.filter(
      (song) => song.attributes.slug !== slug && song.attributes.originalSong
    );

    setDataWithoutCurrentSong(dataWithoutCurrentSong);
  }, [data, slug]);

  return (
    <section className="other-translations-page">
      <h2>Altre traduzioni di blink-182</h2>
      <ul>
        {dataWithoutCurrentSong.map((song) => (
          <li key={song.id}>
            <Link href={`/${artistSlug}/${song.attributes.slug}`}>
              {song.attributes.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OtherTranslationFromArtist;
