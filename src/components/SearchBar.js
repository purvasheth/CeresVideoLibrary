import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const searchResultsOnEnter = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?searchString=${encodeURI(searchString)}`);
    }
  };

  const clearSearchResults = () => {
    if (searchString) {
      navigate(-1);
    }
    setSearchString("");
  };

  return (
    <div className="search-input">
      <input
        className="input"
        type="text"
        placeholder="Search for videos"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        onKeyDown={searchResultsOnEnter}
      />
      <i
        className="fa fa-search search-icon font--primary"
        aria-hidden="true"
      />
      <button
        className="btn-close close-icon btn-lg"
        onClick={clearSearchResults}
        disabled={!searchString}
      >
        <i className="fa fa-times" />
      </button>
    </div>
  );
};
