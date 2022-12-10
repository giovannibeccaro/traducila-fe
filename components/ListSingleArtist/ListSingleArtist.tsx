import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  artistName: string;
  slug: string;
  position?: number;
};

const ListSingleArtist: React.FC<Props> = ({ artistName, slug, position }) => {
  return (
    <Link href={`/${slug}`}>
      <article className="single-artist-article">
        <section className="info">
          <div className="main-info">
            <h5>{artistName}</h5>
          </div>
          <p className="category">Artista</p>
        </section>
        {position && <p className="position">{position + 1}°</p>}
      </article>
    </Link>
  );
};

export default ListSingleArtist;
