import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onDownload }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(input);
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter Mastodon toot URL"
          className="search-input"
        />
      </form>
      <div className="buttons-container">
        <button className="button search-button" onClick={handleSearchClick}>
          Search
        </button>
        <button className="button download-button" onClick={onDownload}>
          Download as Image
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
