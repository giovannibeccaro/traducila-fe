import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import SuggestionsSearchBar from "../SuggestionsSearchBar/SuggestionsSearchBar";
import SearchIcon from "../svgs/SearchIcon";

type Props = {
  parentSection: string;
  shouldFocus?: boolean;
};

const SearchBar: React.FC<Props> = ({ parentSection, shouldFocus }) => {
  // check where searchbar is shown (home, traduzioni or navbar).
  const router = useRouter();
  const route = router.pathname;

  const [searchedSong, setSearchedSong] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchedSong(e.target.value);
  }

  useEffect(() => {
    if (searchedSong.length > 0) {
      setShowSuggestions(true);
    }
  }, [searchedSong]);

  const suggestionsRef = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useOutsideAlerter(suggestionsRef, () => setShowSuggestions(false));

  //? focus this input element when rendered. This works because if it isn't shown on page it means that it is not rendered and it shuts off, so when it is shown it gets instant focus. This only happens when searchbar is in navbar

  useEffect(() => {
    if (parentSection === "from-navbar") {
      inputRef.current?.focus();
    }
  }, [parentSection]);

  return (
    <>
      <form className={parentSection} action="submit">
        <input
          ref={inputRef}
          type="text"
          placeholder="Cerca qualcosa (canzoni, artisti, album)"
          onFocus={() => {
            setShowSuggestions(true);
          }}
          onChange={(e) => {
            onChangeHandler(e);
          }}
          value={searchedSong}
        />
        <button type="submit">
          <SearchIcon color="white" />
        </button>
      </form>
      {searchedSong.length >= 2 && showSuggestions && (
        <div ref={suggestionsRef}>
          <SuggestionsSearchBar searchedSong={searchedSong} route={route} />
        </div>
      )}
    </>
  );
};

export default SearchBar;
