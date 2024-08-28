import React, { useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import styles from './searchBar.module.css';
import { useSpotify } from '../../context/spotifyContext';
import SearchBtns from '../../ui/SearchBtns';
const SearchBar = () => {
  const { search, searchInput, choice, handleSearchChange, logout } =
    useSpotify();

  useEffect(() => {
    const searchEvent = async (event) => {
      if (event.key === 'Enter') {
        search(searchInput, choice);
      }
      console.log(searchInput);
    };
    document.addEventListener('keydown', searchEvent);
    return () => {
      document.removeEventListener('keydown', searchEvent);
    };
  }, [searchInput, search, choice]);

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
          <div className={styles.btns}>
            <SearchBtns />
          </div>
        </div>

        <button className={styles.logoutBtn} onClick={() => logout()}>
          logout
        </button>
      </div>
    </>
  );
};

export default SearchBar;
