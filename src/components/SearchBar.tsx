import React, { useState } from "react";
import styles from "./SearchBar.module.css"; // Assuming you have a CSS module for styling
import Link from "next/link";
const SearchBar = () => {
  const[searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search Movie Title..."
        className={styles.searchbar}
        onChange={handleSearchChange}
      />
      <button className={styles.searchButton}>
        <Link href={`/search/${searchTerm}`}>
          <SearchIcon/>
        </Link>
      </button>
    </div>
  );
};

interface SearchIconProps {
  /** controls both width & height */
  size?: string | number;
}

export function SearchIcon({ size = "2em" }: SearchIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28" /* larger canvas */
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.searchIcon} 
    >
      {/* main circle */}
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="3" />

      {/* longer handle */}
      <line
        x1="17"
        y1="17"
        x2="22" /* reaches bottom-right corner */
        y2="22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default SearchBar;
