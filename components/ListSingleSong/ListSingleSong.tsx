import Image from "next/image";
import React from "react";

type Props = {
  songName: string;
  artistName: string;
  songImage: string;
  slug: string;
  position?: number;
};

const ListSingleSong: React.FC<Props> = ({
  songName,
  artistName,
  songImage,
  slug,
  position,
}) => {
  return (
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
  );
};

export default ListSingleSong;
