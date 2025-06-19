import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search/${searchTerm.trim()}`);
    }
  };

  return (
    <form
      className={styles.searchContainer}
      role='search'
      aria-label='Movie search form'
      onSubmit={handleSubmit}
    >
      {' '}
      <input
        type='text'
        placeholder='Search Movie Title...'
        className={styles.searchBar}
        onChange={handleSearchChange}
        aria-label='Search movies by title'
        aria-describedby='search-button'
        value={searchTerm}
      />
      <button
        className={styles.searchButton}
        id='search-button'
        aria-label='Search'
        type='submit'
        disabled={!searchTerm.trim()}
      >
        <SearchIcon />
      </button>
    </form>
  );
};

interface SearchIconProps {
  /** controls both width & height */
  size?: string | number;
}

export function SearchIcon({ size = '2em' }: SearchIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={styles.searchIcon}
      aria-hidden='true'
      focusable='false'
    >
      <circle cx='12' cy='12' r='7' stroke='currentColor' strokeWidth='3' />
      <line
        x1='17'
        y1='17'
        x2='22'
        y2='22'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
      />
    </svg>
  );
}

export default SearchBar;
