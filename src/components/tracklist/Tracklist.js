import React from 'react';
import Track from '../track/Track';
import styles from './tracklist.module.css';

const TrackList = ({ tracks, isRemoval }) => {
  return (
    <>
      <div className={styles.container}>
        {tracks.map((track) => {
          return <Track track={track} key={track.id} isRemoval={isRemoval} />;
        })}
      </div>
    </>
  );
};

export default TrackList;
