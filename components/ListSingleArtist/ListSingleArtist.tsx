import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  artistName: string;
  slug: string;
  position?: number;
  artistImage?: string;
};

const ListSingleArtist: React.FC<Props> = ({
  artistName,
  slug,
  position,
  artistImage,
}) => {
  return (
    <Link href={`/${slug}`}>
      <article className="single-artist-article">
        {artistImage && (
          <Image src={artistImage} alt="artist cover" width={60} height={60} />
        )}
        <section className="info">
          <div className="main-info">
            <h5>{artistName}</h5>
          </div>
          <p className="category">Artista</p>
        </section>
        {position?.toString() && <p className="position">{position + 1}°</p>}
      </article>
    </Link>
  );
};

export default ListSingleArtist;
