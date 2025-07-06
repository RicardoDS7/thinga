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
          <div key={item.id} className="rounded-xl bg-white shadow hover:shadow-lg transition">
            <Link href={`/listings/${item.id}`}>
              <div className="aspect-square overflow-hidden rounded-t-xl">
                <Image
                  src={item.photos[0]}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium truncate">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.category} · {item.city},{item.province}</p>
                <p className="text-primary font-bold mt-1">R{item.price}/day</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
