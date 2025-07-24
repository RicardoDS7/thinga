"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import debounce from "lodash.debounce";
import { saveSearchTerm } from "@/app/lib/saveSearch";

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const debouncedSaveSearch = useMemo(() =>
    debounce(async (term: string) => {
      await saveSearchTerm(term);
    }, 1000)
  , []);

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      
      try {
        // Use the debounced save function (existing functionality)
        debouncedSaveSearch(searchTerm);
        
        // Redirect to listings page with search query
        const searchParams = new URLSearchParams();
        searchParams.set('search', searchTerm.trim());
        
        // Navigate to listings page with search parameter
        router.push(`/listings?${searchParams.toString()}`);
      } catch (error) {
        console.error("Error during search:", error);
        // Still redirect even if save fails
        const searchParams = new URLSearchParams();
        searchParams.set('search', searchTerm.trim());
        router.push(`/listings?${searchParams.toString()}`);
      } finally {
        setIsSearching(false);
      }
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
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
    <section className="relative min-h-[600px] sm:max-h-screen text-white overflow-hidden flex items-center justify-center px-4">
      {/* Background image for all screens */}
      {["md:hidden", "hidden md:block"].map((className, idx) => (
        <div
          key={className}
          className={`absolute inset-0 z-0 ${className}`}
          style={{
            backgroundImage: "url('/Hero-Background.png')",
            backgroundPosition: idx === 0 ? "center bottom" : "right bottom",
            backgroundRepeat: idx === 0 ? "repeat-y" : "repeat-x",
            backgroundSize: idx === 0 ? "auto 50%" : "auto 100%",
            backgroundPositionX: idx === 0 ? "70%" : "-150px",
            backgroundPositionY: idx === 0 ? "50px" : "56px",
          }}
        />
      ))}
      
      {/* Overlay and content */}
      <div className="absolute inset-0 z-10 bg-[var(--color-primary)]/80" />
      <div className="relative z-20 w-full max-w-4xl mx-auto text-center space-y-6 pt-12">
        <h1 className="text-3xl !text-white sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Rent instead of buying
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white">
          Nearby and at times that suit you
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 px-2">
          <div className="flex w-full sm:w-auto flex-grow items-center bg-white rounded-full shadow-lg px-4 py-4 focus-within:ring-2 focus-within:ring-white/50 transition-all duration-200">
            <Search className="text-gray-400 mr-2 flex-shrink-0" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for what you want to rent"
              className="flex-grow text-gray-800 placeholder-gray-400 focus:outline-none text-sm sm:text-base"
              disabled={isSearching}
            />
            {isSearching && (
              <div className="ml-2 flex-shrink-0">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
              </div>
            )}
          </div>

          <button
            onClick={handleSearch}
            disabled={!searchTerm.trim() || isSearching}
            className={`w-full cursor-pointer sm:w-auto font-semibold px-6 py-4 rounded-full transition-all duration-200 ${
              !searchTerm.trim() || isSearching
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:brightness-110 hover:scale-105 active:scale-95'
            } text-white`}
          >
            {isSearching ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Searching...</span>
              </div>
            ) : (
              'Search'
            )}
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