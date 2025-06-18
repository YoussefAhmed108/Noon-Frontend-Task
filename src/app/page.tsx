"use client"
import Image from "next/image";
import Search from "./search/page";
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const[searchTerm, setSearchTerm] = useState("");
 
  return (
   <div>
    <SearchBar/>
   </div>
  );
}
