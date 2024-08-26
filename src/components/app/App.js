import React from 'react';
import styles from './app.module.css';
import SearchBar from '../searchBar/SearchBar';
import SearchResults from '../searchResults/SearchResults';
import Playlist from '../playlist/Playlist';
import { useSpotify } from '../../context/spotifyContext';
import { FaHeadphones } from 'react-icons/fa';

function App() {
  const {
    isLogged,
    isLoading,
    userName,
    playlistName,
    playlistTracks,
    savePlaylist,
    updatePlaylistName,
    removeTrack,
    getAuth,
    logout,
  } = useSpotify();
  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (!isLogged) {
    return (
      <>
        <div className={styles.logo}>
          <FaHeadphones />
        </div>
        <h2>jammming</h2>
        <p>Make your own playlist</p>
        <button onClick={() => getAuth()}>Login</button>
      </>
    );
  } else {
    return (
      <div className={styles.App}>
        <h2>Welcome {userName}</h2>
        <SearchBar />
        <SearchResults />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onNameChange={updatePlaylistName}
          onRemove={removeTrack}
          onSave={savePlaylist}
        />
        <button onClick={() => logout()}>logout</button>
      </div>
    );
  }
}

export default App;
