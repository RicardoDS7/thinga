// app/lend/layout.tsx

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lend on Thingo",
  description: "Earn money by renting out your items on Thingo.",
};

export default function LendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      
      <main>{children}</main>
      {/* Optional: Lend-specific footer */}
    </div>
  );
}
