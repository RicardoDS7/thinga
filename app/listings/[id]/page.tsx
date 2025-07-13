// app/listings/[id]/page.tsx
import { getListingById } from "@/app/lib/getListings";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { FaMapMarkerAlt, FaUserCircle, FaTag } from "react-icons/fa";
import ListingGallery from "@/app/components/Rent/ListingGallery";
import DescriptionBox from "@/app/components/Rent/DescriptionBox";

/* --- param type reused everywhere --- */
type ListingParams = { id: string };

// Props type for Next.js 15 with async params and searchParams
type ListingPageProps = {
  params: Promise<ListingParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

/* --------------------------------------------------------- */
/* 1️⃣  Let Next know the params shape (even if you return []) */
export async function generateStaticParams(): Promise<ListingParams[]> {
  // For a fully dynamic route, returning an empty array is correct.
  // Next.js will then render this page on demand for any ID.
  return [];
}

/* --------------------------------------------------------- */
/* 2️⃣  Metadata – use the correct async types */
export async function generateMetadata(
  { params, searchParams }: ListingPageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  // Await the params object to get the resolved ListingParams
  const resolvedParams = await params;
  const listing = await getListingById(resolvedParams.id);
  return { title: listing?.title || "Listing Not Found" };
}

/* --------------------------------------------------------- */
/* 3️⃣  Page component – use the correct async types */
export default async function ListingPage({
  params,
  searchParams,
}: ListingPageProps) {
  // Await the params object to get the resolved ListingParams
  const resolvedParams = await params;
  const listing = await getListingById(resolvedParams.id);
  
  // If the listing is not found, use Next.js's notFound() function
  // which will render the closest not-found.tsx or a default 404 page.
  if (!listing) return notFound();

  // Use placeholder image if no photos are available.
  const images = listing.photos?.length ? listing.photos : ["/placeholder.jpg"];

  return (
    <main className="container mx-auto px-4 py-10 font-sans">
      <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-8 rounded-xl bg-white shadow-lg">

        {/* Left column: gallery */}
        <ListingGallery images={images} title={listing.title} />

        {/* Right column: info */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
              {listing.title}
            </h1>

            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              R{listing.price}/day
            </h2>

            <p className="flex items-center gap-2 text-gray-700 mb-2 text-lg">
              <FaTag className="text-blue-500" />
              {listing.category}
            </p>

            <p className="flex items-center gap-2 text-gray-700 mb-2 text-lg">
              <FaMapMarkerAlt className="text-blue-500" />
              {listing.city}, {listing.province}
            </p>

            <p className="flex items-center gap-2 text-gray-700 mb-4 text-lg">
              <FaUserCircle className="text-blue-500" />
              {listing.firstName} {listing.lastName}
            </p>

            <DescriptionBox description={listing.description} maxLength={250} />
          </div>

          <button className="mt-auto cursor-pointer bg-blue-600 text-white py-3 px-8 rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
            Request to Rent
          </button>
        </div>
      </div>
    </main>
  );
}