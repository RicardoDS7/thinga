"use client";

import { useState } from "react";
import { mockListings } from "../data/mockListings";
import Image from "next/image";

export default function ListingsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = Array.from(new Set(mockListings.map((item) => item.category)));

  const filteredListings = selectedCategory
    ? mockListings.filter((item) => item.category === selectedCategory)
    : mockListings;

  return (
    <div className="px-4 pb-10 max-w-7xl mx-auto">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm border ${
            selectedCategory === null
              ? "bg-primary text-white border-primary"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm border ${
              selectedCategory === category
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
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
