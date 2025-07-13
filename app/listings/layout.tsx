import React from "react";
import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import LendHeader from "@/app/components/Lend/LendHeader";

export const metadata: Metadata = {
  title: "Lend on Thingo",
  description: "Earn money by renting out your items on Thingo.",
};

export default function LendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-gray-800">
      <LendHeader />
      <main className="mt-20 mb-6">{children}</main>
      <Footer />
    </div>
  );
}
