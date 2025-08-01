import React from "react";
import ListingHeader from "@/app/components/Rent/ListingHeader";

export default function ListingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-gray-800">
      <ListingHeader />
      <main className="mt-20 mb-6">{children}</main>
    </div>
  );
}
