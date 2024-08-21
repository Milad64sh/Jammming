import React from 'react';
import styles from './track.module.css';

const Track = (props) => {
  return (
    <>
      <h3 className={styles.h3}>{props.track.name}</h3>
      <p className={styles.p}>
        {props.track.artist} | {props.track.album}
      </p>
    </>
  );
};

export default Track;
