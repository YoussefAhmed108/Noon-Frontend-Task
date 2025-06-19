"use client"
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Ensure animations run after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.heroContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.mainTitle}>
            The <span className={styles.accentText}>Movie</span> Database
          </h1>
          <h2 className={styles.subtitle}>
            Discover, explore and save your favorite movies from our collection of over 100,000 titles
          </h2>
        </div>
        
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>
        
        <div className={styles.featuresContainer}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>🔍</div>
            <h3 className={styles.featureTitle}>Search</h3>
            <p className={styles.featureText}>
              Find any movie by title, cast, or director
            </p>
          </div>
          
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>❤️</div>
            <h3 className={styles.featureTitle}>Favorites</h3>
            <p className={styles.featureText}>
              Save movies to your personal favorites list
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
