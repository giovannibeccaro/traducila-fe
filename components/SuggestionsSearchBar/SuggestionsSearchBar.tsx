import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsSearchbarVisible } from "../../store/navbar/navbarSlice";
import { suggestionType } from "../../types";
import { getQuery, stringToSlug } from "../../utils/utils";

type Props = {
  searchedSong: string;
  route: string;
};

const SuggestionsSearchBar: React.FC<Props> = ({ searchedSong, route }) => {
  //redux to remove searchbar after click on suggestion
  const dispatch = useDispatch();

  const isTraduzioniPage = route === "/traduzioni";
  const isHomePage = route === "/";

  const [suggestions, setSuggestions] = useState<suggestionType[]>([]);

  useEffect(() => {
    // we will fetch all categories from the most likely to least likely to contain user search
    function fetchSuggestions() {
      const categories = ["posts", "artists"];
      const slug = stringToSlug(searchedSong);
      // fetch data for each category
      if (slug.length > 1) {
        categories.forEach(async (category) => {
          const endpoint = getQuery(category);
          const populate = () => {
            if (category === "artists") return "";
            return "&populate[0]=artist";
          };
          try {
            const res = await fetch(
              `${endpoint}?filters[slug][$contains]=${slug}${
                category === "posts"
                  ? "&filters[translatedSong][$notNull]=true"
                  : ""
              }`
            );
            const { data } = await res.json();
            // if nothing was fetched, don't update suggestions state
            if (data.length === 0) return;

            // suggestions is the array of results of category fetches

            const suggestionsFetched: suggestionType[] = data.map(
              ({ attributes }: any) => {
                return {
                  entryName: attributes.title,
                  category,
                  slug: attributes.slug,
                  artist: attributes.artistName,
                  artistSlug: attributes.artistSlug,
                };
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
    <section
      className={`${isHomePage ? "suggestions-section" : ""}${
        isTraduzioniPage ? "suggestions-section traduzioni" : ""
      }${!isTraduzioniPage && !isHomePage ? "suggestions-section navbar" : ""}`}
    >
      <ul>
        {suggestions.map(
          ({ entryName, category, artist, slug, artistSlug }) => (
            <li key={Math.random()}>
              <Link
                href={
                  category === "artists" ? `/${slug}` : `/${artistSlug}/${slug}`
                }
                onClick={() => dispatch(setIsSearchbarVisible(false))}
              >
                <p className="suggestion-left-part">{entryName}</p>
                <div className="suggestion-right-part">
                  <div className="category-tag">
                    {category === "artists" ? "artista" : "testo e traduzione"}
                  </div>
                  {artist && <p className="artist">{artist}</p>}
                </div>
              </Link>
            </li>
          )
        )}
      </ul>
    </section>
  ) : null;
};

export default SuggestionsSearchBar;
