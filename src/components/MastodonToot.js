// MastodonToot.js
import React, { useState, useEffect } from 'react';

const MastodonToot = ({ url, domain }) => {
  const [tootData, setTootData] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTootData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching toot data: ${response.statusText}`);
        }
        const data = await response.json();
        setTootData(data);

        const accountId = data.account.id;
        const accountResponse = await fetch(`${domain}/api/v1/accounts/${accountId}`);
        if (!accountResponse.ok) {
          throw new Error(`Error fetching account data: ${accountResponse.statusText}`);
        }
        const accountData = await accountResponse.json();
        setAccountData(accountData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching Mastodon toot or account data:', error);
      }
    };

    fetchTootData();
  }, [url, domain]);

  const replaceEmojis = (text, emojis) => {
    if (!emojis || emojis.length === 0) {
      return text;
    }

    return text.replace(/:(\w+):/g, (match, p1) => {
      const emoji = emojis.find(e => e.shortcode === p1);
      return emoji ? `<img src="${emoji.url}" alt="${emoji.shortcode}" class="emoji" />` : match;
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tootData || !accountData) {
    return <div>Loading...</div>;
  }

  const { account, content, created_at, reblogs_count, favourites_count, replies_count, emojis } = tootData;
  const { avatar, acct } = account;
  const { display_name } = accountData;

  const displayNameWithEmojis = replaceEmojis(display_name, accountData.emojis);
  const contentWithEmojis = replaceEmojis(content, emojis);

  return (
    <div className="toot-card">
      <div className="toot-header">
        <img src={avatar} alt={display_name} className="profile-pic" />
        <div className="profile-info">
          <div
            className="display-name"
            dangerouslySetInnerHTML={{ __html: displayNameWithEmojis }}
          />
          <div className="handle">@{acct}</div>
        </div>
      </div>
      <div className="toot-content" dangerouslySetInnerHTML={{ __html: contentWithEmojis }}></div>
      <div className="toot-footer">
        <div className="publish-date">{new Date(created_at).toLocaleString()}</div>
        <div className="stats">
          {replies_count} Replies · {reblogs_count} Boosts · {favourites_count} Favourites
        </div>
      </div>
    </div>
  );
};

export default MastodonToot;
