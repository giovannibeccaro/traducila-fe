import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { albumType, artistType, songType } from "../../../types";
import { fetchedArtistDataType } from "../../../types";
import { dangerouslyHtmlLinkConvert, getQuery } from "../../../utils/utils";
import { setSongInfo } from "../../../store/songInfo/songInfoSlice";
import OtherTranslationFromArtist from "../../../components/OtherTranslationsFromArtist/OtherTranslationFromArtist";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

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
    title,
    originalSong,
    translatedSong,
    writtenBy,
    producedBy,
    releaseDate,
    songDescription,
    slug,
    albumName,
    artistName,
    artistSlug,
    imageUrl,
  } = songData.attributes;

  //? setting redux songInfo state with getStaticProps data
  useEffect(() => {
    dispatch(
      setSongInfo({
        title,
        artistName,
        songImg: imageUrl,
        albumName,
        releaseDate,
        writtenBy,
        producedBy,
      })
    );
  }, [
    dispatch,
    title,
    artistName,
    albumName,
    imageUrl,
    releaseDate,
    writtenBy,
    producedBy,
  ]);

  useEffect(() => {
    function updateCount() {
      fetch(`${getQuery("posts")}/${artistSlug}/${songData.id}`, {
        method: "PATCH",
      });
    }
    updateCount();
  }, [artistSlug, songData.id]);

  const router = useRouter();
  function clickHandler(e: any) {
    if (!dangerouslyHtmlLinkConvert(e)) return;

    router.push(dangerouslyHtmlLinkConvert(e));
  }

  return (
    <>
      <Head>
        <title>{`Testo e traduzione di ${title} - Traducila`}</title>
        <meta
          name="description"
          content={`Clicca per leggere il testo e la traduzione di ${title}, di ${artistName}. Oltre a testo e traduzione troverai anche altre informazioni interessanti sulla canzone.`}
        />
      </Head>
      <main className="song-page-main">
        <section className="song-page-first-section">
          <h1>{`${
            isTranslation ? "Traduzione di " : "Testo di "
          } ${title}`}</h1>
          {isTranslation
            ? translatedSong && (
                <div
                  className="translated-text"
                  dangerouslySetInnerHTML={{ __html: translatedSong }}
                />
              )
            : originalSong && (
                <div
                  className="original-text"
                  dangerouslySetInnerHTML={{ __html: originalSong }}
                />
              )}
        </section>
        {originalSong && translatedSong && (
          <section className="desktop-only-section">
            <div className="original-text-container">
              <h1>{`Testo di ${title}`}</h1>
              <div
                className="translated-text"
                dangerouslySetInnerHTML={{ __html: originalSong }}
              />
            </div>
            <div className="translated-text-container">
              <h1>{`Traduzione di ${title}`}</h1>
              <div
                className="translated-text"
                dangerouslySetInnerHTML={{ __html: translatedSong }}
              />
            </div>
          </section>
        )}
        <section className="song-page-secondary-section">
          <div className="secondary-section-content">
            <div className="secondary-section-description">
              <h2>Descrizione</h2>
              {songDescription && (
                <div
                  className="description"
                  onClick={clickHandler}
                  dangerouslySetInnerHTML={{ __html: songDescription }}
                />
              )}
            </div>
            {songsFromArtist.length > 0 ? (
              <OtherTranslationFromArtist
                data={songsFromArtist}
                slug={slug}
                artistSlug={artistSlug}
              />
            ) : (
              <div className="suggest-song">
                <h2>Altre traduzioni di {artistName}</h2>
                <p>
                  Non sono disponibili nei nostri archivi altre traduzioni di{" "}
                  {artistName}. Cerchi la traduzione di una canzone in
                  particolare di questo artista?{" "}
                  <Link href="/">Scopri di più.</Link>
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};
export default SongTranslationPage;

export async function getStaticPaths() {
  //TODO filter data for translated song not null so that we have less less stress on api
  //TODO what happens on 101st song? Possible pagination problem, check back later
  const endpoint = getQuery("posts");
  if (!endpoint) return;
  const res = await fetch(endpoint + "?filters[translatedSong][$notNull]=true");
  const data = await res.json();

  const acceptedSongs = data.data.filter(
    (song: songType) => song.attributes.originalSong !== null
  );

  const paths = acceptedSongs.map((song: songType) => {
    return {
      params: {
        songSlug: song.attributes.slug,
        artistSlug: song.attributes.artistSlug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context: any) => {
  // //? request single song data
  // const initialQuery = getQuery("artists");
  const songQuery = getQuery("posts");
  const searchBySlug = "?filters[slug][$eq]=";
  const songSlug = context.params.songSlug;
  // const artistSlug = context.params.artistSlug;
  // console.log(songSlug, artistSlug);

  // const songSlugWithoutTraduzione = songSlug.split("-traduzione")[0];
  // console.log(songSlugWithoutTraduzione);

  // const res = await fetch(
  //   `${initialQuery}${searchBySlug}${artistSlug}&populate=*`
  // );
  // console.log(res);

  // const artistData: fetchedArtistDataType = await res.json();
  // console.log(artistData);

  // const songData = artistData.data[0].attributes.songs.data.filter(
  //   (el) => el.attributes.slug === songSlugWithoutTraduzione
  // );
  // console.log(songData);

  const songRes = await fetch(`${songQuery}${searchBySlug}${songSlug}`);
  const songData: { data: songType[] } = await songRes.json();
  const currSong: songType = songData.data[0];

  const songsFromArtistRes = await fetch(
    `${songQuery}?filters[artistId][$eq]=${currSong.attributes.artistId}&filters[translatedSong][$notNull]=true&filters[id][$ne]=${currSong.id}`
  );
  const songsFromArtist: { data: songType[] } = await songsFromArtistRes.json();

  return {
    props: {
      songData: currSong,
      songsFromArtist: songsFromArtist.data,
    },
  };
};

//http://localhost:1337/api/artists?filters[slug][$eq]=blink-182&populate[0]=songs.songImg&populate[1]=songs.album
