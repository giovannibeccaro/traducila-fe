import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ArtistSingleAlbum from "../../components/ArtistSingleAlbum.tsx/ArtistSingleAlbum";
import { artistType, fetchedArtistDataType } from "../../types";
import { getQuery } from "../../utils/utils";
import { RootState } from "../../store/store";
import { dangerouslyHtmlLinkConvert } from "../../utils/utils";
import { useRouter } from "next/router";
import Head from "next/head";

type Props = {
  data: artistType;
};
const ArtistPage: React.FC<Props> = ({ data }) => {
  const router = useRouter();

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

  function clickHandler(e: any) {
    if (dangerouslyHtmlLinkConvert(e)) {
      router.push(dangerouslyHtmlLinkConvert(e));
    }
  }

  const { name, slug, description, albums } = data.attributes;

  return (
    <>
      <Head>
        <title>{`${name} - Traducila`}</title>
        <meta
          name="description"
          content={`Scopri tutti gli album e le canzoni che abbiamo tradotto di ${name}`}
        />
      </Head>
      <main className="artist-page">
        <section
          className="artist-info"
          style={
            navbarHeight ? { paddingTop: navbarHeight } : { marginTop: "88px" }
          }
        >
          <h2 className="artist-name">{name}</h2>
          <div
            className="description"
            onClick={clickHandler}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </section>
        <h2 className="album-header">Album dell&apos;artista</h2>
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
    </>
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
    `${initialQuerySong}${searchBySlug}${slug}&populate[albums][populate][0]=songs&populate[albums][populate][1]=image`
  );
  const data: fetchedArtistDataType = await res.json();

  return {
    props: {
      data: data.data[0],
    },
  };
};

export default ArtistPage;
