import React from "react";
import type { Metadata } from "next";
import OnboardingHeader from "../components/Lend/OnboardingHeader";

export const metadata: Metadata = {
  title: "Lendaba - Rent anything, anywhere",
  description: "Rent anything, anywhere, anytime.",
};

export default function LendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-gray-800">
      <OnboardingHeader />
      
      {/* Main content area */}
      <main className="mt-20 mb-6">{children}</main>

    </div>
  );
}
