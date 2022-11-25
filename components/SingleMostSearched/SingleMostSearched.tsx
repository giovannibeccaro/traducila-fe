import Image from "next/image";
import React from "react";

type Props = {
  songName: string;
  artistName: string;
  songImage: string;
  category: string;
};

const SingleMostSearched: React.FC<Props> = ({
  songName,
  artistName,
  songImage,
  category,
}) => {
  return (
    <article className="single-most-searched">
      <Image src={songImage} alt="album-cover" width={120} height={120} />
      <section className="info">
        <div className="main-info">
          <h5>{songName}</h5>
          <p>{artistName}</p>
        </div>
        <p className="category">{category}</p>
      </section>
    </article>
  );
};

export default SingleMostSearched;
