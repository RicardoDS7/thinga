"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {

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
            <h1 className="text-4xl logo-display">
              <span className="italic">l</span>endaba
            </h1>
          </Link>
          <Link
            href="/lend"
            className="hidden md:block bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium text-base px-6 py-3 rounded-full shadow-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Become a Lender
          </Link>
        </header>
      </div>


      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full md:hidden z-50 rounded-tr-[30px]! rounded-tl-[30px]!">
        <div className="liquid-glass relative overflow-hidden w-full h-full px-6 py-3 rounded-tr-[30px]! rounded-tl-[30px]!">
          {/* Blurred background layer */}
          <div className="liquid-glass--face absolute inset-0 z-0"></div>
          <div className="liquid-glass--bend absolute inset-0 z-10"></div>
          <div className="liquid-glass--edge absolute inset-0 z-10"></div>

          {/* Header content stays crisp, not blurred */}
          <div className="relative z-20 px-6 py-4">
            <Link
              href="/lend"
              className="block w-full text-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium text-base py-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Become a Lender
            </Link>
          </div>
        </div>
      </div>

    </>
  );
}
