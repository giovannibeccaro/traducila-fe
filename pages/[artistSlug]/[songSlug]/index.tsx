import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { artistType, songType } from "../../../types";
import { fetchedDataType, fetchedArtistDataType } from "../../../types";
import { dangerouslyHtmlLinkConvert, getQuery } from "../../../utils/utils";
import { setSongInfo } from "../../../store/songInfo/songInfoSlice";
import OtherTranslationFromArtist from "../../../components/OtherTranslationsFromArtist/OtherTranslationFromArtist";
import { useRouter } from "next/router";
import Link from "next/link";

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

  const otherSongs = songsFromArtist.filter(
    (el) => el.attributes.slug !== slug && el.attributes.translatedSong
  );

  const router = useRouter();
  function clickHandler(e: any) {
    if (!dangerouslyHtmlLinkConvert(e)) return;

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
          {otherSongs.length > 0 ? (
            <OtherTranslationFromArtist
              data={otherSongs}
              slug={slug}
              artistSlug={artist.data.attributes.slug}
            />
          ) : (
            <div className="suggest-song">
              <h2>Altre traduzioni di {artistName}</h2>
              <p>
                Non sono disponibili nei nostri archivi altre traduzioni di{" "}
                {artistName}. Cerchi la traduzione di una canzone in particolare
                di questo artista? <Link href="/">Scopri di più.</Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
export default SongTranslationPage;

export async function getStaticPaths() {
  //TODO filter data for translated song not null so that we have less less stress on api
  //TODO what happens on 101st song? Possible pagination problem, check back later
  const endpoint = getQuery("posts");
  if (!endpoint) return;
  const res = await fetch(
    endpoint +
      "?populate=artist&filters[translatedSong][$notNull]=true&pagination[limit]=-1"
  );
  const data = await res.json();

  const acceptedSongs = data.data.filter(
    (song: songType) => song.attributes.originalSong !== null
  );

  const paths = acceptedSongs.map((song: songType) => {
    return {
      params: {
        songSlug: song.attributes.slug + "-traduzione",
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
  const initialQuery = getQuery("artists");
  const searchBySlug = "?filters[slug][$eq]=";
  const songSlug = context.params.songSlug;
  const artistSlug = context.params.artistSlug;
  const songSlugWithoutTraduzione = songSlug.split("-traduzione")[0];
  console.log(songSlugWithoutTraduzione);

  const res = await fetch(
    `${initialQuery}${searchBySlug}${artistSlug}&populate[0]=songs.songImg&populate[1]=songs.album&populate[2]=songs.artist`
  );

  const artistData: fetchedArtistDataType = await res.json();
  const songData = artistData.data[0].attributes.songs.data.filter(
    (el) => el.attributes.slug === songSlugWithoutTraduzione
  );

  return {
    props: {
      songData: songData[0],
      songsFromArtist: artistData.data[0].attributes.songs.data,
    },
  };
};

//http://localhost:1337/api/artists?filters[slug][$eq]=blink-182&populate[0]=songs.songImg&populate[1]=songs.album
