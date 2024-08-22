import React, { useCallback } from 'react';
import styles from './playlist.module.css';
import Tracklist from '../tracklist/Tracklist';
const Playlist = (props) => {
  const handleNameChange = useCallback(
    (event) => {
      props.onNameChange(event.target.value);
    },
    [props]
  );
  return (
    <>
      <div className={styles.container}>
        <input onChange={handleNameChange} defaultValue={'New Playlist'} />
        <Tracklist
          tracks={props.playlistTracks}
          isRemoval={true}
          onRemove={props.onRemove}
        />
        <button onClick={props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    </>
  );
};

export default Playlist;
