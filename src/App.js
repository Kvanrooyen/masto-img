// App.js
import React from 'react';
import MastodonToot from './components/MastodonToot';
import './App.css';


function App() {
  const testUrl = 'https://en.osm.town/api/v1/statuses/112240497294603916';
  const domain = 'https://en.osm.town';

  return (
    <div className="app">
      <h1 className="heading">Masto Img</h1>
      <MastodonToot url={testUrl} domain={domain} />
    </div>
  );
}

export default App;
