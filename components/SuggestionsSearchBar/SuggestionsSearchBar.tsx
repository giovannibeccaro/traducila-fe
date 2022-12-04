import Link from "next/link";
import React, { useEffect, useState } from "react";
import { suggestionType } from "../../types";
import { getQuery, stringToSlug } from "../../utils/utils";
type Props = {
  searchedSong: string;
};

const SuggestionsSearchBar: React.FC<Props> = ({ searchedSong }) => {
  const [suggestions, setSuggestions] = useState<suggestionType[]>([]);
  const [backupSongs, setBackupSongs] = useState<suggestionType[]>([]);

  useEffect(() => {
    // we will fetch all categories from the most likely to least likely to contain user search
    function fetchSuggestions() {
      const categories = ["posts", "artists", "albums"];
      const slug = stringToSlug(searchedSong);

      // fetch data for each category
      categories.forEach(async (category) => {
        const endpoint = getQuery(category);
        const field = () => {
          if (category === "artists") return "artistName";
          if (category === "albums") return "albumName";
          if (category === "posts") return "songName";
        };
        const populate = () => {
          if (category === "artists") return "";
          return "&populate[0]=artist";
        };
        try {
          const res = await fetch(
            `${endpoint}?filters[slug][$startsWith]=${slug}${populate()}&fields[0]=${field()}`
          );
          const { data } = await res.json();

          // if nothing was fetched, don't update suggestions state
          if (data.length === 0) return;

          // suggestions is the array of results of category fetches
          const suggestionsFetched: suggestionType[] = data.map(
            ({ attributes }: any) => {
              if (category === "artists") {
                return {
                  entryName: attributes.artistName,
                  category: "artista",
                  slug: stringToSlug(attributes.artistName),
                };
              }
              if (category === "albums") {
                return {
                  entryName: attributes.albumName,
                  category: "album",
                  artist: attributes.artist.data.attributes.artistName,
                  slug: stringToSlug(attributes.albumName),
                };
              }
              if (category === "posts") {
                return {
                  entryName: attributes.songName,
                  category: "testo e traduzione",
                  artist: attributes.artist.data.attributes.artistName,
                  slug: stringToSlug(attributes.songName),
                };
              }
            }
          );
          // set suggestions inside state
          setSuggestions((prev) => {
            return [...prev, ...suggestionsFetched];
          });
        } catch (error) {
          return;
        }
      });
    }

    const timer = setTimeout(() => {
      // delete suggestions previous to new fetch on new user input
      setSuggestions([]);
      // only fetch results if query is longer than one character
      if (searchedSong.length > 1) {
        fetchSuggestions();
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [searchedSong]);

  return suggestions.length > 0 ? (
    <section className="suggestions-section">
      <ul>
        {suggestions.map(({ entryName, category, artist, slug }) => (
          <li key={Math.random()}>
            <Link href={slug}>
              <p className="suggestion-left-part">{entryName}</p>
              <div className="suggestion-right-part">
                <div className="category-tag">{category}</div>
                <p className="artist">{artist}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  ) : (
    <section className="suggestions-section-loading"></section>
  );
};

export default SuggestionsSearchBar;
