"use client";

import Link from "next/link";

export default function Header() {
  return (
    <>
      {/* Desktop Header */}
      <div className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
        <header className="mx-auto max-w-screen-xl flex justify-between items-center px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
            <h1 className="text-3xl">thingo<span className="text-[var(--color-accent)]">.</span></h1>
            </Link>
            <Link
            href="/lend"
            className="hidden md:block bg-[var(--color-primary)] text-white font-semibold py-2 px-6 rounded-full shadow-sm hover:brightness-110 transition"
            >
            Start Earning
            </Link>
        </header>
      </div>

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-white border-t border-gray-200 px-6 py-3 z-50">
        <Link
          href="/lend"
          className="block w-full text-center bg-[var(--color-primary)] text-white font-semibold py-3 rounded-full shadow-md hover:brightness-110 transition"
        >
          Start Earning
        </Link>
      </div>
    </>
  );
}
