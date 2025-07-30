// app/lend/layout.tsx

import React from "react";
import type { Metadata } from "next";
import LendHeader from "@/app/components/Lend/LendHeader";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Become a Lender",
  description: "Earn money by renting out your items on Lendaba.",
};

export default function LendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      
      <LendHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
