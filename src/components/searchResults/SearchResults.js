import React from 'react';
import styles from './searchResults.module.css';
import Tracklist from '../tracklist/Tracklist';

const SearchResults = () => {
  return (
    <>
      <div className={styles.container}>
        <h2>Results</h2>
        <Tracklist isRemoval={true} />
      </div>
    </>
  );
};

export default SearchResults;
