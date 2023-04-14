import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <form className="search-form">
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLocaleLowerCase().replace(/ /g, ""))}
      />
      <div className="search-icon" style={{ opacity: search ? 0 : 0.3 }}>
        <span className="material-icons">
          <SearchIcon />
        </span>
        <span>search</span>
      </div>
      <div className="close-search">&times;</div>
    </form>
  );
};

export default Search;
