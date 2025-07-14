"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ListingHeader() {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <div
        className={`w-full fixed top-0 left-0 z-50 bg-[var(--color-bg)] transition-shadow ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <header className="mx-auto max-w-screen-xl flex justify-between items-center px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-3xl">
              thingo<span className="text-[var(--color-accent)]">.</span>
            </h1>
          </Link>
          <Link
            href="/lend"
            className="hidden md:block bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium text-base py-2 px-6 rounded-full shadow-sm hover:brightness-110 transition"
          >
            Become a Lender
          </Link>
        </header>
      </div>

    </>
  );
}
