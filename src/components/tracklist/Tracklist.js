import React from 'react';
import Track from '../track/Track';
import { useSpotify } from '../../context/spotifyContext';
import styles from './tracklist.module.css';

const TrackList = (props) => {
  const { searchResults } = useSpotify();
  return (
    <>
      <div className={styles.container}>
        {searchResults.map((track) => {
          return (
            <Track track={track} key={track.id} isRemoval={props.isRemoval} />
          );
        })}
      </div>
    </>
  );
};

export default TrackList;
