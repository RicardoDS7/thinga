// app/listings/[id]/page.tsx
import { mockListings } from "@/app/data/mockListings";
import { notFound } from "next/navigation";
import { Metadata } from "next";

/* static params stay the same */
export function generateStaticParams() {
  return mockListings.map(({ id }) => ({ id }));
}

/* now async, and params is awaited */
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const listing = mockListings.find((l) => l.id === id);
  return { title: listing?.title ?? "Listing Not Found" };
}

/* make page async, await params */
export default async function ListingPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const listing = mockListings.find((l) => l.id === id);
  if (!listing) return notFound();

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
      <p className="text-gray-600">R{listing.price}/day</p>
    </main>
  );
}
