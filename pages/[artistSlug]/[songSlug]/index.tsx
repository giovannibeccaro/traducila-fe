import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { artistType, songType } from "../../../types";
import { fetchedDataType, fetchedArtistDataType } from "../../../types";
import { dangerouslyHtmlLinkConvert, getQuery } from "../../../utils/utils";
import { setSongInfo } from "../../../store/songInfo/songInfoSlice";
import OtherTranslationFromArtist from "../../../components/OtherTranslationsFromArtist/OtherTranslationFromArtist";
import { useRouter } from "next/router";

type Props = {
  songData: songType;
  songsFromArtist: songType[];
};

const SongTranslationPage: FC<Props> = ({ songData, songsFromArtist }) => {
  //? redux for isTranslation
  const { isTranslation } = useSelector((store: RootState) => store.swapButton);

  //? redux for songInfo state setting
  const dispatch = useDispatch();
  const {
    name,
    originalSong,
    translatedSong,
    writtenBy,
    producedBy,
    yearOfProduction,
    songDescription,
    slug,
    album,
    artist,
    songImg,
  } = songData.attributes;

  const artistName = artist.data.attributes.name;
  const albumName = album.data.attributes.name;
  const songImgUrl = songImg.data.attributes.url;

  //? setting redux songInfo state with getStaticProps data
  useEffect(() => {
    dispatch(
      setSongInfo({
        name,
        artistName,
        songImg: songImgUrl,
        albumName,
        yearOfProduction,
        writtenBy,
        producedBy,
      })
    );
  }, [
    dispatch,
    name,
    artistName,
    albumName,
    songImgUrl,
    yearOfProduction,
    writtenBy,
    producedBy,
  ]);

  useEffect(() => {
    function updateCount() {
      const artistSlug = artist.data.attributes.slug;
      fetch(`${getQuery("posts")}/${artistSlug}/${songData.id}`, {
        method: "PATCH",
      });
    }
    updateCount();
  }, [artist.data.attributes.slug, songData.id]);

  const router = useRouter();
  function clickHandler(e: any) {
    router.push(dangerouslyHtmlLinkConvert(e));
  }

  return (
    <main className="song-page-main">
      <section className="song-page-first-section">
        <h1>{`${isTranslation ? "Traduzione di " : "Testo di "} ${name}`}</h1>
        {isTranslation ? (
          <div
            className="translated-text"
            dangerouslySetInnerHTML={{ __html: translatedSong }}
          />
        ) : (
          <div
            className="original-text"
            dangerouslySetInnerHTML={{ __html: originalSong }}
          />
        )}
      </section>
      <section className="desktop-only-section">
        <div className="original-text-container">
          <h1>{`Testo di ${name}`}</h1>
          <div
            className="translated-text"
            dangerouslySetInnerHTML={{ __html: originalSong }}
          />
        </div>
        <div className="translated-text-container">
          <h1>{`Traduzione di ${name}`}</h1>
          <div
            className="translated-text"
            dangerouslySetInnerHTML={{ __html: translatedSong }}
          />
        </div>
      </section>
      <section className="song-page-secondary-section">
        <div className="secondary-section-content">
          <div className="secondary-section-description">
            <h2>Descrizione</h2>
            <div
              className="description"
              onClick={clickHandler}
              dangerouslySetInnerHTML={{ __html: songDescription }}
            />
          </div>
          {songsFromArtist.length > 0 && (
            <OtherTranslationFromArtist
              data={songsFromArtist}
              slug={slug}
              artistSlug={artist.data.attributes.slug}
            />
          )}
        </div>
      </section>
    </main>
  );
};
export default SongTranslationPage;

export async function getStaticPaths() {
  const endpoint = getQuery("posts");
  if (!endpoint) return;
  const res = await fetch(endpoint + "?populate=*");
  const data = await res.json();
  const acceptedSongs = data.data.filter(
    (song: songType) => song.attributes.originalSong !== null
  );
  const paths = acceptedSongs.map((song: songType) => {
    return {
      params: {
        songSlug: song.attributes.slug,
        artistSlug: song.attributes.artist.data.attributes.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context: any) => {
  //? request single song data
  const initialQuerySong = getQuery("posts");
  const searchBySlug = "?filters[slug][$eq]=";
  const songSlug = context.params.songSlug;
  const res = await fetch(
    `${initialQuerySong}${searchBySlug}${songSlug}&populate=*`
  );
  const songData: fetchedDataType = await res.json();

  //? request album data for otherTranslations component
  const initialQueryArtist = getQuery("artists");
  const artistSlug = songData.data[0].attributes.artist.data.attributes.slug;

  const artistRes = await fetch(
    `${initialQueryArtist}${searchBySlug}${artistSlug}&populate=*`
  );
  const artistData: fetchedArtistDataType = await artistRes.json();

  return {
    props: {
      songData: songData.data[0],
      songsFromArtist: artistData.data[0].attributes.songs.data,
    },
  };
};
