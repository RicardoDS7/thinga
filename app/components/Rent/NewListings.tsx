"use client";

import { mockListings } from "@/app/data/mockListings";
import Image from "next/image";
import Link from "next/link";

export default function NewListings() {
  const newestListings = [...mockListings].slice(-10).reverse();

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-6">New Listings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {newestListings.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white"
          >
            <Link
              href={`/rent/${item.id}`}>
              <div className="aspect-square w-full overflow-hidden rounded-xl mb-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-1">
              <h3 className="font-semibold text-lg text-gray-800 truncate">{item.title}</h3>
              <p className="text-sm text-gray-500">
                {item.category} · {item.location}
              </p>
              <p className="text-primary font-bold mt-1">R{item.price}/day</p>
            
            </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
