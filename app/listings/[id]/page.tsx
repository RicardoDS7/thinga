import { mockListings } from "@/app/data/mockListings";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return mockListings.map((listing) => ({
    id: listing.id,
  }));
}

export default function ListingPage({ params }: Props) {
  const listing = mockListings.find((item) => item.id === params.id);

  if (!listing) return notFound();

  return (
    <main className="container mx-auto px-4 mt-20 py-10">
      <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
      <p className="text-gray-600">{listing.price}</p>
    </main>
  );
}
