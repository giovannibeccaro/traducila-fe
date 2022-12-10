import React, { useEffect, useState } from "react";
import { suggestionType } from "../../types";
import { getQuery, stringToSlug } from "../../utils/utils";
import ListSingleArtist from "../ListSingleArtist/ListSingleArtist";
import ListSingleSong from "../ListSingleSong/ListSingleSong";
import { Bars } from "react-loader-spinner";

type Props = {
  query: string;
};

const ResultsSection: React.FC<Props> = ({ query }) => {
  //? get results from user search
  const [results, setResults] = useState<suggestionType[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    //! this works for dev environment
    if (window.location.origin === "http://localhost:3000") {
      let ignore = false;

      const fetchData = () => {
        const categories = ["artists", "posts"];

        // fetch data for each category
        categories.forEach(async (category) => {
          const endpoint = getQuery(category);
          const populate = () => {
            if (category === "artists") return "";
            return "&populate[0]=artist&populate[1]=songImg";
          };
          try {
            const res = await fetch(
              `${endpoint}?filters[slug][$contains]=${query}${populate()}&fields[0]=name&fields[1]=slug${
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
                  entryName: attributes.name,
                  category,
                  slug: attributes.slug,
                  artist: attributes.artist?.data.attributes.name,
                  artistSlug: attributes.artist?.data.attributes.slug,
                  image: attributes.songImg?.data?.attributes.url,
                };
              }
            );
            // set suggestions inside state

            if (!ignore) {
              setResults((prev) => {
                return [...prev, ...suggestionsFetched];
              });
            }
          } catch (error) {
            return;
          }
        });
      };
      setResults([]);
      if (query && query.length > 1) {
        setShowResults(false);
        fetchData();
      }
      const timer = setTimeout(() => {
        setShowResults(true);
      }, 500);
      return () => {
        ignore = true;
        clearTimeout(timer);
      };
    } else {
      const fetchData = () => {
        const categories = ["artists", "posts"];

        // fetch data for each category
        categories.forEach(async (category) => {
          const endpoint = getQuery(category);
          const populate = () => {
            if (category === "artists") return "";
            return "&populate[0]=artist&populate[1]=songImg";
          };
          try {
            const res = await fetch(
              `${endpoint}?filters[slug][$contains]=${query}${populate()}&fields[0]=name&fields[1]=slug${
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
                  entryName: attributes.name,
                  category,
                  slug: attributes.slug,
                  artist: attributes.artist?.data.attributes.name,
                  artistSlug: attributes.artist?.data.attributes.slug,
                  image: attributes.songImg?.data?.attributes.url,
                };
              }
            );
            // set suggestions inside state

            setResults((prev) => {
              return [...prev, ...suggestionsFetched];
            });
          } catch (error) {
            return;
          }
        });
      };
      setResults([]);
      if (query && query.length > 1) {
        setShowResults(false);
        fetchData();
      }
      const timer = setTimeout(() => {
        setShowResults(true);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [query]);

  return showResults ? (
    <div className="results-list">
      <h2 className="results-header">Risultati della ricerca:</h2>
      {results.length > 0 ? (
        results.map((result) => {
          if (
            result.category === "posts" &&
            result.artist &&
            result.image &&
            result.artistSlug
          ) {
            return (
              <ListSingleSong
                key={result.slug}
                songName={result.entryName}
                slug={result.slug}
                songImage={result.image}
                artistName={result.artist}
                artistSlug={result.artistSlug}
              />
            );
          } else if (result.category === "artists") {
            return (
              <ListSingleArtist
                key={result.slug}
                slug={result.slug}
                artistName={result.entryName}
              />
            );
          }
        })
      ) : (
        <p className="no-results-found">
          Ci dispiace, ma la ricerca non ha prodotto risultati. Controlla lo
          spelling oppure scrivici per richiedere una traduzione specifica!
        </p>
      )}
    </div>
  ) : (
    <div className="loader-spinner-traduzioni">
      <Bars
        height="20"
        width="20"
        color="hsl(338, 58%, 52%)"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      Caricamento dei dati...
    </div>
  );
};

export default ResultsSection;
