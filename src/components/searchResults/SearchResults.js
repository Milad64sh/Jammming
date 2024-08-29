import React from 'react';
import styles from './searchResults.module.css';
import Tracklist from '../tracklist/Tracklist';
import { useSpotify } from '../../context/spotifyContext';

const SearchResults = (props) => {
  const { searchResults } = useSpotify();
  console.log(searchResults);
  return (
    <>
      <div className={styles.container}>
        <h2>Search Results</h2>
        <div className={styles.trackContainer}>
          <Tracklist tracks={props.searchResults} isRemoval={false} />
        </div>
      </div>
    </>
  );
};

export default SearchResults;
