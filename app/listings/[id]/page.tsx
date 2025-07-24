// app/listings/[id]/page.tsx (Server Component)
import { getListingById } from "@/app/lib/getListings";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { FaMapMarkerAlt, FaUserCircle, FaStar } from "react-icons/fa";
import { Verified } from "lucide-react";
import { getCategoryIcon } from "@/app/components/categoryIcons";
import ListingGallery from "@/app/components/Rent/ListingGallery";
import DescriptionBox from "@/app/components/Rent/DescriptionBox";
import BookingClient from "@/app/components/Rent/BookingCalculatorClient";
import MobileReserveButton from "@/app/components/Rent/MobileReserveButton";

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
  return { 
    title: listing?.title || "Listing Not Found",
    description: listing?.description || "Property listing"
  };
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
    <main className="min-h-screen bg-[var(--color-bg)]">

      {/* Container */}
      <div className="max-w-7xl mx-auto">
        {/* Desktop Header */}
        <div className="hidden lg:block px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900 truncate">
              {listing.title}
            </h1>
          </div>
          
          {/* Desktop Rating and Location */}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">{getCategoryIcon(listing.category)}</span>
              <span className="font-medium text-emerald-600">
                {listing.category}
              </span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="w-4 h-4" />
              <span>{listing.city}, {listing.province}</span>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="px-4 lg:px-6">
          <div className="lg:rounded-xl overflow-hidden">
            <ListingGallery images={images} title={listing.title} />
          </div>
        </div>

        {/* Content Grid */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-12 lg:px-6 lg:py-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Mobile Title and Basic Info */}
            <div className="lg:hidden px-4 py-6 border-b border-gray-200 bg-white">
              <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                {listing.title}
              </h1>
              
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <FaStar className="w-4 h-4 text-yellow-400" />
                  <span className="font-medium">4.8</span>
                  <span>(124 reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="w-4 h-4" />
                  <span>{listing.city}, {listing.province}</span>
                </div>
              </div>

              <div className="text-2xl font-bold text-gray-900">
                R{listing.price.toLocaleString()}
                <span className="text-base font-normal text-gray-600"> per day</span>
              </div>
            </div>

            {/* Host Info */}
            <div className="px-4 lg:px-0 py-6 border-b border-gray-200 bg-white lg:bg-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUserCircle className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Lended by {listing.firstName} {listing.lastName}
                  </h3>
                  <div className="flex items-center gap-1 text-sm font-bold text-gray-600 mt-1">
                    <Verified className="w-4 h-4 text-emerald-500" />
                    <p className="text-sm text-gray-600">Verified Lender</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 lg:px-0 py-6 bg-white lg:bg-transparent">
              <DescriptionBox description={listing.description} />
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            {/* Desktop Booking Card */}
            <div className="hidden lg:block sticky top-24">
              <BookingClient
                pricePerDay={listing.price}
                depositAmount={listing.depositAmount || 0}
                currency="ZAR"
                serviceFeeRate={0.1}
                taxRate={15}
                listingId={resolvedParams.id}
                listingTitle={listing.title}
                category={listing.category}
                location={`${listing.city}, ${listing.province}`}
                ownerName={`${listing.firstName} ${listing.lastName}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Reserve Button - Now properly linked */}
      <MobileReserveButton 
        price={listing.price}
        category={listing.category}
      />

      {/* Mobile Booking Section */}
      <div id="mobile-booking" className="lg:hidden mb-20">
        <div className="px-4 py-6 bg-white border-t border-gray-200">
          <BookingClient
            pricePerDay={listing.price}
            depositAmount={listing.depositAmount || 0}
            currency="ZAR"
            serviceFeeRate={0.1}
            taxRate={15}
            listingId={resolvedParams.id}
            listingTitle={listing.title}
            category={listing.category}
            location={`${listing.city}, ${listing.province}`}
            ownerName={`${listing.firstName} ${listing.lastName}`}
          />
        </div>
      </div>
    </main>
  );
}