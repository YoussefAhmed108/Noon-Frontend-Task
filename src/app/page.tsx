"use client"
import Image from "next/image";
import Search from "./search/[term]/page";
import { useState } from "react";
import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar";


export default function Home() {
  const[searchTerm, setSearchTerm] = useState("");
 
  return (
   <div className={styles.container}>
    <h1 className={styles.title}>Browse over 100k movies</h1>
    <div style={{width: "100%", height: "100%" , display: "flex", justifyContent: "center", alignItems: "center"}}>
      <SearchBar/>
    </div>
    
   </div>
  );
}
