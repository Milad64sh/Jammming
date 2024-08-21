import React from 'react';
import styles from './tracklist.module.css';
import Track from '../track/Track';

const TrackList = (props) => {
  return (
    <>
      <div className={styles.container}>
        {props.tracks.map((track) => {
          return <Track track={track} key={track.id} onAdd={props.onAdd} />;
        })}
      </div>
    </>
  );
};

export default TrackList;
