import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { artistType, songType } from "../../../types";
import { fetchedDataType, fetchedArtistDataType } from "../../../types";
import { getQuery } from "../../../utils/utils";
import { setSongInfo } from "../../../store/songInfo/songInfoSlice";
import OtherTranslationFromArtist from "../../../components/OtherTranslationsFromArtist/OtherTranslationFromArtist";

type Props = {
  songData: songType;
  artistData: songType[];
};

const SongTranslationPage: FC<Props> = ({ songData, artistData }) => {
  //? redux for isTranslation
  const { isTranslation } = useSelector((store: RootState) => store.swapButton);

  //? redux for songInfo state setting
  const dispatch = useDispatch();
  const {
    songName,
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

  const artistName = artist.data.attributes.artistName;
  const albumName = album.data.attributes.albumName;
  const songImgUrl = songImg.data.attributes.url;

  //? setting redux songInfo state with getStaticProps data
  useEffect(() => {
    dispatch(
      setSongInfo({
        songName,
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
    songName,
    artistName,
    albumName,
    songImgUrl,
    yearOfProduction,
    writtenBy,
    producedBy,
  ]);

  return (
    <main className="song-page-main">
      <section className="song-page-main-section">
        <h1>{`${
          isTranslation ? "Traduzione di " : "Testo di "
        } ${songName}`}</h1>
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
      <section className="song-page-secondary-section">
        <h2>Descrizione</h2>
        <p>{songDescription}</p>
        {artistData.length > 0 && (
          <OtherTranslationFromArtist data={artistData} slug={slug} />
        )}
      </section>
    </main>
  );
};
export default SongTranslationPage;

export async function getStaticPaths() {
  const endpoint = process.env.NEXT_PUBLIC_DEV_BACKEND_ENDPOINT;
  if (!endpoint) return;
  const res = await fetch(endpoint + "/api/posts?populate=*");
  const data = await res.json();
  const paths = data.data.map((song: songType) => {
    return {
      params: { songSlug: song.attributes.slug },
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
      artistData: artistData.data[0].attributes.songs.data,
    },
  };
};
