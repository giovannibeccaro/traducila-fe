import React, { useState } from "react";
import SearchIcon from "../svgs/SearchIcon";

type Props = {
  parentSection: string;
};

const SearchBar: React.FC<Props> = ({ parentSection }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchedSong, setSearchedSong] = useState("");
  return (
    <form
      className={`${parentSection} ${isInputFocused ? "input-focused" : ""}`}
      action="submit"
    >
      <input
        type="text"
        placeholder="Cerca qualcosa (canzoni, artisti, album)"
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
      <button type="submit">
        <SearchIcon color="white" />
      </button>
    </form>
  );
};

export default SearchBar;
