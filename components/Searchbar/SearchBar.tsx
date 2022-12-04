import React, { useState } from "react";
import SuggestionsSearchBar from "../SuggestionsSearchBar/SuggestionsSearchBar";
import SearchIcon from "../svgs/SearchIcon";

type Props = {
  parentSection: string;
};

const SearchBar: React.FC<Props> = ({ parentSection }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchedSong, setSearchedSong] = useState("");

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchedSong(e.target.value);
  }

  return (
    <>
      <form
        className={`${parentSection} ${isInputFocused ? "input-focused" : ""}`}
        action="submit"
      >
        <input
          type="text"
          placeholder="Cerca qualcosa (canzoni, artisti, album)"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onChange={(e) => {
            onChangeHandler(e);
          }}
          value={searchedSong}
        />
        <button type="submit">
          <SearchIcon color="white" />
        </button>
      </form>
      {searchedSong.length >= 2 && (
        <SuggestionsSearchBar searchedSong={searchedSong} />
      )}
    </>
  );
};

export default SearchBar;
