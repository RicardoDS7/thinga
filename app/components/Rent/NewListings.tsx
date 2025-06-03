"use client";

import { mockListings } from "@/app/data/mockListings";
import Image from "next/image";
import Link from "next/link";

export default function NewListings() {
  const newestListings = [...mockListings].slice(-6).reverse();

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-6">New Listings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {newestListings.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-2xl p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-xl mb-3">
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>

            <h3 className="font-semibold text-lg text-gray-800 truncate">{item.title}</h3>
            <p className="text-sm text-gray-500">
              {item.category} · {item.location}
            </p>
            <p className="text-primary font-bold mt-1">R{item.price}/day</p>

            <Link
              href={`/listings/${item.id}`}
              className="mt-4 inline-block w-full text-center bg-[var(--color-primary)] text-white font-medium py-2 rounded-lg hover:bg-[var(--color-primary)]/90 transition"
            >
              Rent Now
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
