// app/listings/[id]/page.tsx
import { getListingById } from "@/app/lib/getListings";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { FaMapMarkerAlt, FaUserCircle, FaTag, FaStar, FaShare, FaHeart } from "react-icons/fa";
import ListingGallery from "@/app/components/Rent/ListingGallery";
import DescriptionBox from "@/app/components/Rent/DescriptionBox";
import BookingClient from "@/app/components/Rent/BookingCalculatorClient";

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
    <main className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40 lg:hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaShare className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaHeart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="max-w-7xl mx-auto">
        {/* Desktop Header */}
        <div className="hidden lg:block px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900 truncate">
              {listing.title}
            </h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaShare className="w-4 h-4" />
                <span className="font-medium">Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaHeart className="w-4 h-4" />
                <span className="font-medium">Save</span>
              </button>
            </div>
          </div>
          
          {/* Desktop Rating and Location */}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
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
        </div>

        {/* Gallery */}
        <div className="px-0 lg:px-6">
          <div className="aspect-square lg:aspect-[2/1] lg:rounded-xl overflow-hidden">
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
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUserCircle className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Hosted by {listing.firstName} {listing.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">Superhost • 3 years hosting</p>
                </div>
              </div>

              {/* Property Type */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <FaTag className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">{listing.category}</p>
                  <p className="text-sm text-gray-600">Entire place</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 lg:px-0 py-6 bg-white lg:bg-transparent">
              <DescriptionBox description={listing.description} />
            </div>

            {/* Reviews Section */}
            <div className="px-4 lg:px-0 py-6 bg-white lg:bg-transparent">
              <div className="flex items-center gap-2 mb-6">
                <FaStar className="w-5 h-5 text-yellow-400" />
                <span className="text-xl font-semibold">4.8 • 124 reviews</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((review) => (
                  <div key={review} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">Guest Name</p>
                        <p className="text-sm text-gray-600">March 2024</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      Great place to stay! The host was very responsive and the location was perfect.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            {/* Desktop Booking Card */}
            <div className="hidden lg:block sticky top-24">
              <BookingClient
                pricePerDay={listing.price}
                currency="ZAR"
                serviceFeeRate={0.1} // 10% service fee
                taxRate={15}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              R{listing.price.toLocaleString()}
              <span className="text-sm font-normal text-gray-600"> per day</span>
            </div>
            <div className="text-sm text-gray-600">
              Select dates for total price
            </div>
          </div>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all duration-200 shadow-lg">
            Reserve
          </button>
        </div>
      </div>

      {/* Mobile Booking Modal Trigger */}
      <div className="lg:hidden mb-20">
        <div className="px-4 py-6 bg-white border-t border-gray-200">
          <BookingClient
            pricePerDay={listing.price}
            currency="ZAR"
            serviceFeeRate={0.1}
            taxRate={15}
          />
        </div>
      </div>
    </main>
  );
}