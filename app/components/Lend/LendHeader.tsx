"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LendHeader() {
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
            href="/lender-registration"
            className="hidden md:block bg-[var(--color-primary)] text-white font-medium text-base py-2 px-6 rounded-full shadow-sm hover:brightness-110 transition"
          >
            Get Started
          </Link>
        </header>
      </div>

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-[var(--color-bg)] border-t border-gray-200 px-6 py-3 z-50">
        <Link
          href="/lender-registration"
          className="block w-full text-center bg-[var(--color-primary)] text-white font-medium text-base py-3 rounded-full shadow-md hover:brightness-110 transition"
        >
          Get Started
        </Link>
      </div>
    </>
  );
}
