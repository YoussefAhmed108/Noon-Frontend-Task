import React from 'react'
import Link from 'next/link';

const Header = () => {
  return (
    <nav>
      <Link href="/search">Home</Link>
      <Link href="/favorites">Favourites</Link>
    </nav>
  );
}

export default Header