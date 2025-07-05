"use client";

import Link from "next/link";

export default function Header() {
  return (
    <>
      {/* Desktop Header */}
      <div className="w-full fixed top-0 left-0 shadow-md rounded-br-[30px] rounded-bl-[30px] z-50">
        <div className="liquid-glass relative overflow-hidden rounded-br-[30px]! rounded-bl-[30px]!">
          
          {/* Blurred background layer */}
          <div className="liquid-glass--face absolute inset-0 z-0"></div>

          {/* Optional decorative elements */}
          <div className="liquid-glass--bend relative z-10"></div>
          <div className="liquid-glass--edge relative z-10"></div>

          {/* Header content stays crisp, not blurred */}
          <header className="relative z-10 mx-auto max-w-screen-xl flex justify-between items-center px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">
                thingo<span className="text-[var(--color-accent)]">.</span>
              </h1>
            </Link>
            <Link
              href="/lend"
              className="hidden md:block bg-[var(--color-primary)] text-white font-medium text-base py-2 px-6 rounded-full shadow-sm hover:brightness-110 transition"
            >
              Become a Lender
            </Link>
          </header>
        </div>
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
              className="block w-full text-center bg-[var(--color-primary)] text-white font-medium text-base py-3 rounded-full shadow-md hover:brightness-110 transition"
            >
              Become a Lender
            </Link>
          </div>
        </div>
      </div>

    </>
  );
}
