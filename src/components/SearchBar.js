// SearchBar.js

import React from "react";

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
