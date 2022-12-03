import React from "react";
import { artistType } from "../../types";

type Props = {
  data: artistType[];
};

const OtherTranslationFromArtist: React.FC<Props> = ({ data }) => {
  console.log(data);

  return (
    <section>
      <h2>Altre traduzioni di blink-182</h2>
      <ul>
        <li>
          <a href="#">Always</a>
        </li>
        <li>
          <a href="#">All the small things</a>
        </li>
        <li>
          <a href="#">What&apos;s my age again</a>
        </li>
      </ul>
    </section>
  );
};

export default OtherTranslationFromArtist;
