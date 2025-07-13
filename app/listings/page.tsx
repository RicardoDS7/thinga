// app/listings/page.tsx
import { Suspense } from "react";
import ListingsGrid from "../components/ListingGrid";

export default function ListingsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Browse Listings</h1>
            <p className="text-gray-600 mt-2">
              Find the best items available. Use filters to narrow your search.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            {/* Example filter/search bar */}
            <input
              type="text"
              placeholder="Search listings..."
              className="border rounded px-3 py-2 w-64"
            />
          </div>
        </header>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></span>
              <span className="ml-4 text-blue-500">Loading listings...</span>
            </div>
          }
        >
          <ListingsGrid />
        </Suspense>
      </section>
    </main>
  );
}
