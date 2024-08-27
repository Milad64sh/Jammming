import React from 'react';
import { useSpotify } from '../../context/spotifyContext';
import styles from './header.module.css';

const Header = () => {
  const { userName } = useSpotify();
  return (
    <div>
      <div className={styles.username}>
        <h2>Welcome {userName}</h2>
      </div>
    </div>
  );
};

export default Header;
