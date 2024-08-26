import React, { useState } from 'react';
import { useSpotify } from '../context/spotifyContext';
import styles from './searchBtns.module.css';

const choices = ['Title', 'Artist', 'All'];
const SearchBtns = () => {
  const [isActive, setIsActive] = useState('');
  const { getFilterChoice, handleSearchChange } = useSpotify();

  const handleClick = (i) => {
    setIsActive(i);
  };
  return (
    <div>
      {choices.map((choice, i) => (
        <button
          key={choice}
          value={choice}
          onClick={() => {
            handleClick(i);
            getFilterChoice(choice);
            handleSearchChange();
          }}
          className={isActive === i ? styles.focus : styles.nonfocus}
        >
          {choice}
        </button>
      ))}
    </div>
  );
};

export default SearchBtns;
