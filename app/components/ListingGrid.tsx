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
          className={`px-4 py-2 rounded-full text-sm ${
            categoryParam === null
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
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
              className={`px-4 py-2 rounded-full text-sm ${
                categoryParam === slug
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
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
          <div key={item.id} className="rounded-xl bg-white shadow hover:shadow-lg transition overflow-hidden flex flex-col">
            <Link href={`/listings/${item.id}`}>
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                  {/* Blurred background */}
                  <Image
                    src={item.photos[0]}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover w-full h-full blur-md scale-105"
                    aria-hidden="true"
                    style={{ zIndex: 0 }}
                  />
                  {/* Main image */}
                  <Image
                    src={item.photos[0]}
                    alt={item.title}
                    width={400}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain w-full h-full"
                    priority
                    style={{ zIndex: 1, position: "absolute", top: 0, left: 0 }}
                  />
                </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-medium truncate">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.category} · {item.city}, {item.province}</p>
                <p className="text-primary font-bold mt-1">R{item.price}/day</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
