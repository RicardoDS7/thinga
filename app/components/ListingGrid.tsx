"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getListings } from "../lib/getListings";
import { Listing } from "../types/listings";
import Image from "next/image";
import Link from "next/link";

// Slugify function
const slugify = (text: string) =>
  text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-").trim();

export default function ListingsGrid() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Create unique categories
  const categories = Array.from(new Set(listings.map((item) => item.category)));

  // Filter based on slugified category
  const filteredListings = categoryParam
    ? listings.filter((item) => slugify(item.category) === categoryParam)
    : listings;

  if (loading) return <div className="text-center py-10">Loading listings...</div>;

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
              src={item.photos?.[0] || "/placeholder.jpg"}
              alt={item.title}
              width={300}
              height={200}
              className="rounded-lg w-full object-cover"
            />
            <h3 className="mt-2 font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-600">
              {item.category} · {item.city}
            </p>
            <p className="text-primary font-bold mt-1">
              R{Number(item.price)}/day
            </p>
            <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg">
              I want to rent this
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
