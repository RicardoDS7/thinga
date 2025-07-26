"use client";

import Link from "next/link";

export default function OnboardingHeader() {
  return (
    <>
      {/* Desktop Header */}
      <div className="w-full bg-[var(--color-bg)] glass fixed top-0 left-0 z-50">
        <header className="mx-auto max-w-screen-xl flex justify-between items-center px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
            <h1 className="text-3xl">LENDABA</h1>
            </Link>
            
        </header>
      </div>

    </>
  );
}
