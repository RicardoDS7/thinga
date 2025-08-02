// components/NewListings.tsx
import { getListings } from "@/app/lib/getListings";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";

export default async function NewListings() {
  const listings = await getListings();

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">New Listings</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
        {listings.map((item) => (
          <div key={item.id} className="rounded-xl bg-white shadow hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col group">
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
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-200"
                  priority
                  style={{ zIndex: 1, position: "absolute", top: 0, left: 0 }}
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h3 className="text-md font-medium group-hover:text-emerald-600 transition-colors line-clamp-2">{item.title}</h3>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MapPin size={14} className="mr-1 flex-shrink-0" />
                  <span className="truncate">{item.city}, {item.province}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[var(--color-primary)] font-bold">R{item.price}/day</p>
                  <div className="hidden md:flex items-center text-xs text-gray-400">
                    <Calendar size={12} className="mr-1" />
                    <span>Available</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
