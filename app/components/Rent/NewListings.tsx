"use client";

import { mockListings } from "@/app/data/mockListings";
import Image from "next/image";
import Link from "next/link";

export default function NewListings() {
  // Show only the 6 newest listings (assuming most recent are last in the array)
  const newestListings = [...mockListings].slice(-6).reverse();

  return (
    <section className="px-4 pb-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 px-2">New Listings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {newestListings.map((item) => (
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
            <Link
              href={`/listings/${item.id}`}
              className="block mt-3 w-full bg-primary text-white text-center py-2 rounded-lg"
            >
              I want to rent this
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
