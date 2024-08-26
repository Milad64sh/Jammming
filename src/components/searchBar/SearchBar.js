import React, { useCallback, useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import styles from './searchBar.module.css';
import { useSpotify } from '../../context/spotifyContext';
const SearchBar = (props) => {
  const { trackSearch } = useSpotify();
  const [term, setTerm] = useState('');

  const handleSearchChange = useCallback((e) => {
    setTerm(e.target.value);
  }, []);

  useEffect(() => {
    const search = (event) => {
      if (event.key === 'Enter') {
        trackSearch(term);
      }
      console.log(term);
    };
    document.addEventListener('keydown', search);
    return () => {
      document.removeEventListener('keydown', search);
    };
  }, [term]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2>
            jam<span className={styles.span}>m</span>ming
          </h2>
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type='text'
            placeholder='Search'
            onChange={handleSearchChange}
          />
          <div className={styles.icon}>
            <IoSearchSharp />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
