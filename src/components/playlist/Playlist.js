import React, { useCallback } from 'react';
import styles from './playlist.module.css';
import Tracklist from '../tracklist/Tracklist';
import { useSpotify } from '../../context/spotifyContext';
const Playlist = (props) => {
  const { savePlaylist } = useSpotify();
  const handleNameChange = useCallback(
    (event) => {
      props.onNameChange(event.target.value);
    },
    [props]
  );
  return (
    <>
      <div className={styles.container}>
        <input
          name='name'
          className={styles.input}
          onChange={handleNameChange}
          // defaultValue={'New Playlist'}
          placeholder='type your playlist name'
        />
        <Tracklist
          tracks={props.playlistTracks}
          isRemoval={true}
          onRemove={props.onRemove}
        />
        <button className={styles.saveBtn} onClick={savePlaylist}>
          SAVE TO SPOTIFY
        </button>
      </div>
    </>
  );
};

export default Playlist;
