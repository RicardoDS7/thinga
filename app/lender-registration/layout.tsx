import React from "react";
import type { Metadata } from "next";
import OnboardingHeader from "@/app/components/Lend/OnboardingHeader";

export const metadata: Metadata = {
  title: "Lendaba Registration",
  description: "Register as a lender on Lendaba to start earning by renting out your items.",
};

export default function LendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <OnboardingHeader />
      <main className="mt-20 mb-6">{children}</main>
    </div>
  );
}
