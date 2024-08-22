import React, { useCallback } from 'react';
import styles from './track.module.css';

const Track = (props) => {
  const addTrack = useCallback(
    (track) => {
      props.onAdd(props.track);
    },
    [props]
  );
  const removeTrack = useCallback(
    (track) => {
      props.onRemove(props.onAdd);
    },
    [props]
  );

  const renderAction = () => {
    if (props.isRemoval) {
      return <button onClick={removeTrack}>-</button>;
    }
    return <button onClick={addTrack}>+</button>;
  };

  return (
    <>
      <h3 className={styles.h3}>{props.track.name}</h3>
      <p className={styles.p}>
        {props.track.artist} | {props.track.album}
      </p>
      {renderAction()}
    </>
  );
};

export default Track;
