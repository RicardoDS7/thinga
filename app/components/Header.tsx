"use client";

import Link from "next/link";

export default function Header() {
  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-3xl">thingo<span className="text-[var(--color-accent)]">.</span></h1>
        </Link>
        <Link
          href="/rent"
          className="bg-[var(--color-primary)] text-white font-semibold py-2 px-6 rounded-full shadow-sm hover:brightness-110 transition"
        >
          Start Earning
        </Link>
      </header>

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-white border-t border-gray-200 px-6 py-3 z-50">
        <Link
          href="/rent"
          className="block w-full text-center bg-[var(--color-primary)] text-white font-semibold py-3 rounded-full shadow-md hover:brightness-110 transition"
        >
          Start Earning
        </Link>
      </div>
    </>
  );
}
