import React from 'react';
import styles from './searchResults.module.css';
import Tracklist from '../tracklist/Tracklist';

const SearchResults = (props) => {
  return (
    <>
      <div className={styles.container}>
        <h2>Results</h2>
        <Tracklist tracks={props.searchResults} onAdd={props.onAdd} />
      </div>
    </>
  );
};

export default SearchResults;
