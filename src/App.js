// App.js
import React, { useState } from 'react';
import MastodonToot from './components/MastodonToot';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [tootUrl, setTootUrl] = useState('');
  const [domain, setDomain] = useState('');

  const handleSearch = (url) => {
    // Extract the domain and toot ID from the URL
    const urlPattern = /https:\/\/(.*?)\/.*?\/(\d+)/;
    const match = url.match(urlPattern);

    if (match) {
      const extractedDomain = `https://${match[1]}`;
      const extractedUrl = `${extractedDomain}/api/v1/statuses/${match[2]}`;
      setDomain(extractedDomain);
      setTootUrl(extractedUrl);
    } else {
      alert('Invalid Mastodon URL');
    }
  };

  return (
    <div className="app">
      <h1 className="heading">Masto Img</h1>
      <SearchBar onSearch={handleSearch} />
      {tootUrl && <MastodonToot url={tootUrl} domain={domain} />}
    </div>
  );
}

export default App;
