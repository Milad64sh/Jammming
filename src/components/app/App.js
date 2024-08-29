import React from 'react';
import styles from './app.module.css';
import SearchBar from '../searchBar/SearchBar';
import SearchResults from '../searchResults/SearchResults';
import Playlist from '../playlist/Playlist';
import { useSpotify } from '../../context/spotifyContext';
import { SiSoundcloud } from 'react-icons/si';
import Header from '../header/Header';

function App() {
  const {
    isLogged,
    isLoading,
    playlistName,
    savePlaylist,
    updatePlaylistName,
    playlistTracks,
    searchResults,
    removeTrack,
    getAuth,
  } = useSpotify();

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (!isLogged) {
    return (
      <>
        <div className={styles.loginContainer}>
          <div className={styles.login}>
            <div className={styles.logo}>
              <SiSoundcloud />
            </div>
            <h2>
              jam<span>m</span>ming
            </h2>
            <p>Make your own playlist</p>
            <button className={styles.loginBtn} onClick={() => getAuth()}>
              Login
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className={styles.App}>
        <SearchBar />
        <Header />
        <div className={styles.containers}>
          <div className={styles.container}>
            <SearchResults searchResults={searchResults} />
          </div>
          <div className={styles.container}>
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onNameChange={updatePlaylistName}
              onRemove={removeTrack}
              onSave={savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
