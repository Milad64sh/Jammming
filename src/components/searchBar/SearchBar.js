import React, { useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import styles from './searchBar.module.css';
import { useSpotify } from '../../context/spotifyContext';
import SearchBtns from '../../ui/SearchBtns';
const SearchBar = () => {
  const { trackSearch, searchInput, handleSearchChange } = useSpotify();

  useEffect(() => {
    const search = (event) => {
      if (event.key === 'Enter') {
        trackSearch(searchInput);
      }
      console.log(searchInput);
    };
    document.addEventListener('keydown', search);
    return () => {
      document.removeEventListener('keydown', search);
    };
  }, [searchInput, trackSearch]);

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
        <SearchBtns />
      </div>
    </>
  );
};

export default SearchBar;
