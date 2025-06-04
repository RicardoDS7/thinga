import { mockListings } from "@/app/data/mockListings";
import { notFound } from "next/navigation";
import { Metadata } from "next";

/* ----------  Static Params  ---------- */
export function generateStaticParams() {
  return mockListings.map(({ id }) => ({ id }));
}

/* ----------  Metadata  ---------- */
export function generateMetadata(
  { params }: { params: { id: string } }
): Metadata {
  const listing = mockListings.find((l) => l.id === params.id);
  return { title: listing?.title ?? "Listing Not Found" };
}

/* ----------  Page Component  ---------- */
export default function ListingPage(
  { params }: { params: { id: string } }
) {
  const listing = mockListings.find((l) => l.id === params.id);
  if (!listing) return notFound();

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
      <p className="text-gray-600">R{listing.price}/day</p>
    </main>
  );
}
