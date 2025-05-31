"use client";

import { useSearchParams } from "next/navigation";
import { mockListings } from "../data/mockListings";
import Image from "next/image";
import Link from "next/link";

// Slugify function
const slugify = (text: string) =>
  text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-").trim();

export default function ListingsGrid() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const categories = Array.from(new Set(mockListings.map((item) => item.category)));

  console.log("categoryParam from URL:", categoryParam);
  console.log("matching slugs from listings:", mockListings.map(item => slugify(item.category)));

  // ✅ This ensures we filter based on slug
  const filteredListings = categoryParam
    ? mockListings.filter(
        (item) => slugify(item.category) === categoryParam
      )
    : mockListings;

  return (
    <div className="px-4 pb-10 max-w-7xl mx-auto">
      
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <Link
          href="/listings"
          className={`px-4 py-2 rounded-full text-sm border ${
            categoryParam === null
              ? "bg-primary text-white border-primary"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          All
        </Link>

        {categories.map((category) => {
          const slug = slugify(category);
          return (
            <Link
              key={slug}
              href={`/listings?category=${slug}`}
              className={`px-4 py-2 rounded-full text-sm border ${
                categoryParam === slug
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {category}
          </Link>

          );
        })}
      </div>

      {/* Grid of Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="border rounded-3xl p-4 shadow hover:shadow-md transition"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={200}
              className="rounded-lg w-full object-cover"
            />
            <h3 className="mt-2 font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-600">
              {item.category} · {item.location}
            </p>
            <p className="text-primary font-bold mt-1">R{item.price}/day</p>
            <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg">
              I want to rent this
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
