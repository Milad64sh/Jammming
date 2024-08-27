import React from 'react';
import { useSpotify } from '../../context/spotifyContext';
import styles from './header.module.css';

const Header = () => {
  const { userName } = useSpotify();
  return (
    <div>
      <div className={styles.username}>
        <h2>Welcome {userName}</h2>
        <p className={styles.p}>
          Browse Spotify, search by music title, the artist or both, and create
          your own playlist
        </p>
      </div>
    </div>
  );
};

export default Header;
