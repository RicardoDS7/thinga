// app/listings/[id]/page.tsx
import { getListingById } from "@/app/lib/getListings";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";

// Always fetch fresh data on each request
export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata(ctx: any): Promise<Metadata> {
  const { params } = ctx;
  const listing = await getListingById(params.id);
  return {
    title: listing?.title || "Listing Not Found",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ListingPage(props: any) {
  const { params } = props;
  const listing = await getListingById(params.id);
  if (!listing) return notFound();

  const imageUrl = listing.photos?.[0] ?? "/placeholder.jpg";

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="rounded-xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={listing.title}
            width={800}
            height={600}
            className="object-cover w-full h-full rounded-xl"
            priority
          />
        </div>

        {/* Details + CTA */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
            <p className="text-lg text-primary font-semibold mb-2">
              R{listing.price}/day
            </p>
            <p className="text-gray-600 mb-1">{listing.category}</p>
            <p className="text-gray-500 text-sm">
              {listing.city}, {listing.province}
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Listed by {listing.fullName}
            </p>
          </div>
          <button className="mt-6 w-full bg-primary text-white py-3 rounded-xl text-lg font-medium hover:bg-primary-dark transition">
            Request to Rent
          </button>
        </div>
      </div>
    </main>
  );
}
