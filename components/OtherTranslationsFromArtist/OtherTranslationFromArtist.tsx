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

  return (
    <section className="other-translations-page">
      <h2>Altre traduzioni di METTI NOME</h2>
      <ul>
        {data.map((song) => (
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
