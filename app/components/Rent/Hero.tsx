"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import debounce from "lodash.debounce";
import Image from "next/image";
import { saveSearchTerm } from "@/app/lib/saveSearch";

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSaveSearch = useMemo(() =>
    debounce(async (term: string) => {
      await saveSearchTerm(term);
    }, 1000)
  , []);


  const handleSearch = () => {
    if (searchTerm.trim()) {
      debouncedSaveSearch(searchTerm);
    }
  };

  const [city, setCity] = useState<string>("...");

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Skip location fetch on localhost (common cause of failure)
        const isLocalhost = window.location.hostname === "localhost";
        if (isLocalhost) {
          setCity("your area");
          return;
        }

        const res = await fetch("https://ipwho.is/"); // Alternative to ipapi.co
        if (!res.ok) throw new Error("Location fetch failed");

        const data = await res.json();
        setCity(data.city || "your area");
      } catch (error) {
        console.error("Could not fetch IP location:", error);
        setCity("your area");
      }
    };

    getLocation();
  }, []);


  return (
    <section className="relative min-h-[600px] sm:min-h-[500px] text-white overflow-hidden flex items-center justify-center px-4">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-[var(--color-primary)]/80" />

      {/* Centered content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto text-center space-y-6 pt-12">
        <h1 className="text-3xl !text-white sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Rent instead of buying
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white">
          Nearby and at times that suit you
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 px-2">
          <div className="flex w-full sm:w-auto flex-grow items-center bg-white rounded-full shadow-lg px-4 py-4">
            <Search className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for what you want to rent"
              className="flex-grow text-gray-800 placeholder-gray-400 focus:outline-none text-sm sm:text-base"
            />
          </div>

          <button
            onClick={handleSearch}
            className="w-full cursor-pointer sm:w-auto bg-[var(--color-accent)] hover:brightness-110 text-white font-semibold px-6 py-4 rounded-full transition duration-200"
          >
            Search
          </button>
        </div>

        <div className="mt-2 text-sm sm:text-base text-white">
          <span className="inline-block w-2 h-2 bg-white rounded-full mr-1 align-middle" />
          Near <strong>{city}</strong>
        </div>
      </div>
    </section>
  );
}
