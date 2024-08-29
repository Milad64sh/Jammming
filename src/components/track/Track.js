import React from 'react';
import { useSpotify } from '../../context/spotifyContext';
import styles from './track.module.css';

const Track = ({ track, isRemoval }) => {
  const { addTrack, removeTrack } = useSpotify();
  const handleAction = () => {
    if (isRemoval) {
      removeTrack(track);
    } else {
      addTrack(track);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <img className={styles.img} src={track.image} alt='album cover' />
        <div className={styles.textContainer}>
          <h4 className={styles.h3}>{track.name}</h4>
          <p className={styles.p}>
            {track.artist} | {track.album}
          </p>
        </div>
        <div className={styles.actionContainer}>
          <button className={styles.btn} onClick={handleAction}>
            {isRemoval ? '-' : '+'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Track;
