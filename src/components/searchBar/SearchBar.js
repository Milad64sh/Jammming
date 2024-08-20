import React from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import styles from './searchBar.module.css';
const SearchBar = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2>
            jam<span className={styles.span}>m</span>ming
          </h2>
        </div>
        <div className={styles.inputContainer}>
          <input className={styles.input} type='text' placeholder='Search' />
          <div className={styles.icon}>
            <IoSearchSharp />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
