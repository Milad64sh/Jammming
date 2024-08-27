import React from 'react';
import styles from './searchResults.module.css';
import Tracklist from '../tracklist/Tracklist';

const SearchResults = () => {
  return (
    <>
      <div className={styles.container}>
        <h2>Search Results</h2>
        <div className={styles.trackContainer}>
          <Tracklist isRemoval={true} />
        </div>
      </div>
    </>
  );
};

export default SearchResults;
