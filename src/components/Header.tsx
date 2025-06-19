import React from 'react'
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <nav className={styles.header}>
      <Link href="">Home</Link>
      <Link href="/favorites">Favourites</Link>
    </nav>
  );
}

export default Header