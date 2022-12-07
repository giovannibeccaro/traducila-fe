import Image from "next/image";
import React from "react";

type Props = {
  artistName: string;
  slug: string;
  position: number;
};

const ListSingleArtist: React.FC<Props> = ({ artistName, slug, position }) => {
  return (
    <article className="single-artist-article">
      <section className="info">
        <div className="main-info">
          <h5>{artistName}</h5>
        </div>
        <p className="category">Artista</p>
      </section>
      <p className="position">{position + 1}°</p>
    </article>
  );
};

export default ListSingleArtist;
