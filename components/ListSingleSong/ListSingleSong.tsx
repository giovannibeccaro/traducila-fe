import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  songName: string;
  artistName: string;
  songImage: string;
  position?: number;
  slug: string;
  artistSlug: string;
};

const ListSingleSong: React.FC<Props> = ({
  songName,
  artistName,
  songImage,
  slug,
  position,
  artistSlug,
}) => {
  return (
    <Link className="single-song-link" href={`/${artistSlug}/${slug}`}>
      <article className="single-most-searched">
        <div className="left-part">
          <Image src={songImage} alt="album-cover" width={120} height={120} />

          <section className="info">
            <div className="main-info">
              <h5>{songName}</h5>
              <p>{artistName}</p>
            </div>
            <p className="category">Testo e traduzione</p>
          </section>
        </div>
        {position?.toString() && <p className="position">{position + 1}°</p>}
      </article>
    </Link>
  );
};

export default ListSingleSong;
