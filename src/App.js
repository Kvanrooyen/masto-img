import React, { useState, useRef } from 'react';
import MastodonToot from './components/MastodonToot';
import SearchBar from './components/SearchBar';
import * as htmlToImage from 'html-to-image';
import './App.css';

function App() {
  const [tootUrl, setTootUrl] = useState('');
  const [domain, setDomain] = useState('');
  const tootRef = useRef(null);

  const handleSearch = (url) => {
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

  const handleDownloadImage = () => {
    if (tootRef.current === null) {
      return;
    }

    htmlToImage.toPng(tootRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'toot.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Failed to download image', err);
      });
  };

  return (
    <div className="app">
      <h1 className="heading">Masto Img</h1>
      <SearchBar onSearch={handleSearch} onDownload={handleDownloadImage} />
      {tootUrl && (
        <div className="toot-card-container" ref={tootRef}>
          <MastodonToot url={tootUrl} domain={domain} />
        </div>
      )}
    </div>
  );
}

export default App;
