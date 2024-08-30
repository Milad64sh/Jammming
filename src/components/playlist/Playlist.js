import React, { useCallback } from 'react';
import styles from './playlist.module.css';
import { useSpotify } from '../../context/spotifyContext';
import TrackList from '../tracklist/Tracklist';
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
          placeholder='type your playlist name'
        />
        <div className={styles.trackContainer}>
          <TrackList tracks={props.playlistTracks} isRemoval={true} />
        </div>
        <button className={styles.saveBtn} onClick={savePlaylist}>
          SAVE TO SPOTIFY
        </button>
      </div>
    </>
  );
};

export default Playlist;
