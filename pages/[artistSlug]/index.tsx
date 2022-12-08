import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ArtistSingleAlbum from "../../components/ArtistSingleAlbum.tsx/ArtistSingleAlbum";
import { artistType, fetchedArtistDataType } from "../../types";
import { getQuery } from "../../utils/utils";
import { RootState } from "../../store/store";

type Props = {
  data: artistType;
};
const ArtistPage: React.FC<Props> = ({ data }) => {
  // load redux state for navbar height
  const { navbarHeight } = useSelector((store: RootState) => store.navbar);

  useEffect(() => {
    function updateCount() {
      const artistId = data.id;
      fetch(`${getQuery("artists")}/${artistId}`, {
        method: "PATCH",
      });
    }
    updateCount();
  }, [data.id]);

  const { name, slug, tags, description, songs, albums } = data.attributes;

  return (
    <main className="artist-page">
      <section
        className="artist-info"
        style={
          navbarHeight ? { marginTop: navbarHeight } : { marginTop: "88px" }
        }
      >
        <h2 className="artist-name">{name}</h2>
        <div className="tags">
          {tags?.data.map((tag) => (
            <p key={tag.attributes.genre}>{tag.attributes.genre}</p>
          ))}
        </div>
        <p className="description">{description}</p>
      </section>
      <div className="albums-section">
        {albums.data.map((album) => (
          <ArtistSingleAlbum
            key={album.id}
            albumData={album.attributes}
            artistSlug={slug}
          />
        ))}
      </div>
    </main>
  );
};

export async function getStaticPaths() {
  const endpoint = getQuery("artists");
  if (!endpoint) return;
  const res = await fetch(endpoint + "?populate=*");
  const data = await res.json();
  const paths = data.data.map((artist: artistType) => ({
    params: {
      artistSlug: artist.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context: any) => {
  //? request single song data
  const initialQuerySong = getQuery("artists");
  const searchBySlug = "?filters[slug][$eq]=";
  const slug = context.params.artistSlug;

  const res = await fetch(
    `${initialQuerySong}${searchBySlug}${slug}&fields[0]=name&fields[1]=slug&fields[2]=description&populate[tags][fields][0]=genre&populate[albums][populate][0]=songs`
  );
  const data: fetchedArtistDataType = await res.json();

  return {
    props: {
      data: data.data[0],
    },
  };
};

export default ArtistPage;

// http://localhost:1337/api/artists?filters[slug][$eq]=blink-182&fields[0]=name&fields[1]=slug&fields[2]=description&populate[tags][fields][0]=genre&populate[albums][fields][0]=name&populate[albums][fields][1]=slug&populate[songs][fields][0]=name&populate[songs][fields][1]=slug&populate[songs][fields][2]=originalSong&populate[songs][fields][3]=translatedSong&populate[songs][fields][4]=writtenBy&populate[songs][fields][5]=producedBy&populate[songs][fields][6]=yearOfProduction&populate[songs][fields][7]=songDescription&populate[songs][songImg][fields][0]=url

//http://localhost:1337/api/artists?filters[slug][$eq]=blink-182&populate[0]=songs.songImg&fields[0]=url
