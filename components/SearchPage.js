// components/Search.js
import React, { useState, useEffect } from 'react';
import styles from './Search.module.css'; // Import the CSS module

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(savedSearches);
  }, []);

  // Handle search input
  const handleSearch = () => {
    if (searchTerm.trim() === '') return;

    const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    const newSearches = [searchTerm, ...savedSearches.filter((term) => term !== searchTerm)];

    // Limit to last 5 searches
    const limitedSearches = newSearches.slice(0, 5);

    // Save updated searches to localStorage
    localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));

    // Update state
    setRecentSearches(limitedSearches);
  };

  const handleClearSearches = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  return (
    <div className={styles['search-container']}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for books..."
        className={styles['search-input']}
      />
      <button onClick={handleSearch} className={styles['search-btn']}>Search</button>

      <div className={styles['recent-searches']}>
        <h3>Recent Searches</h3>
        <ul>
          {recentSearches.length === 0 ? (
            <li>No recent searches</li>
          ) : (
            recentSearches.map((term, index) => (
              <li key={index}>{term}</li>
            ))
          )}
        </ul>
        <button onClick={handleClearSearches} className={styles['clear-btn']}>Clear Search History</button>
      </div>
    </div>
  );
};

export default Search;
