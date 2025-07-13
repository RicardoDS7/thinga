// components/NewListings.tsx
import { getListings } from "@/app/lib/getListings";
import Image from "next/image";
import Link from "next/link";

export default async function NewListings() {
  const listings = await getListings();

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">New Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {listings.map((item) => (
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
    </section>
  );
}
