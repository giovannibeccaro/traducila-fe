import React from "react";
import SearchIcon from "../svgs/SearchIcon";

type Props = {
  parentSection: string;
};

const SearchBar: React.FC<Props> = ({ parentSection }) => {
  return (
    <form className={parentSection} action="submit">
      <input
        type="text"
        placeholder="Cerca qualcosa (canzoni, artisti, album)"
      />
      <button type="submit">
        <SearchIcon color="white" />
      </button>
    </form>
  );
};

export default SearchBar;
