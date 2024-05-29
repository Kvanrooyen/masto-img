import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch, onDownload }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(input);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter Mastodon toot URL"
          className="search-input"
        />
        <button type="submit" className="search-button">
          <FaSearch />
        </button>
      </form>
      <button className="download-button" onClick={onDownload}>
        Download Toot as Image
      </button>
    </div>
  );
};

export default SearchBar;
