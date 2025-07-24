"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getListings } from "../lib/getListings";
import { Listing } from "../types/listings";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, X, MapPin, Calendar } from "lucide-react";

// Slugify function
const slugify = (text: string) =>
  text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-").trim();

interface FilterState {
  searchTerm: string;
  priceRange: { min: number; max: number };
  location: string;
}

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under R100", min: 0, max: 100 },
  { label: "R100 - R300", min: 100, max: 300 },
  { label: "R300 - R500", min: 300, max: 500 },
  { label: "R500 - R1000", min: 500, max: 1000 },
  { label: "Over R1000", min: 1000, max: Infinity },
];

export default function ListingsGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: searchParam || "", // Initialize with URL search parameter
    priceRange: { min: 0, max: Infinity },
    location: "",
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Update search term when URL parameter changes
  useEffect(() => {
    if (searchParam && searchParam !== filters.searchTerm) {
      setFilters(prev => ({ ...prev, searchTerm: searchParam }));
    }
  }, [searchParam]);

  // Create unique categories and locations
  const categories = Array.from(new Set(listings.map((item) => item.category)));
  const locations = Array.from(new Set(listings.map((item) => `${item.city}, ${item.province}`)));

  // Apply all filters
  const filteredListings = useMemo(() => {
    let filtered = listings;

    // Apply category filter from URL
    if (categoryParam) {
      filtered = filtered.filter((item) => slugify(item.category) === categoryParam);
    }

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower) ||
        item.city.toLowerCase().includes(searchLower) ||
        item.province.toLowerCase().includes(searchLower)
      );
    }

    // Apply price filter
    if (filters.priceRange.max !== Infinity || filters.priceRange.min > 0) {
      filtered = filtered.filter((item) =>
        item.price >= filters.priceRange.min && item.price <= filters.priceRange.max
      );
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter((item) =>
        `${item.city}, ${item.province}`.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    return filtered;
  }, [listings, categoryParam, filters]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Update URL when search term changes
    if (key === 'searchTerm') {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      if (value && typeof value === 'string' && value.trim()) {
        newSearchParams.set('search', value.trim());
      } else {
        newSearchParams.delete('search');
      }
      // Preserve category parameter if it exists
      if (categoryParam) {
        newSearchParams.set('category', categoryParam);
      }
      
      // Update URL without causing a page reload
      const newUrl = `/listings${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
      router.replace(newUrl, { scroll: false });
    }
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      priceRange: { min: 0, max: Infinity },
      location: "",
    });
    
    // Clear search parameter from URL but preserve category
    const newSearchParams = new URLSearchParams();
    if (categoryParam) {
      newSearchParams.set('category', categoryParam);
    }
    
    const newUrl = `/listings${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
    router.replace(newUrl, { scroll: false });
  };

  const hasActiveFilters = filters.searchTerm || 
                          filters.priceRange.max !== Infinity || 
                          filters.priceRange.min > 0 ||
                          filters.location;

  if (loading) return <div className="text-center py-10">Loading listings...</div>;

  return (
    <div className="px-4 pb-10 max-w-7xl mx-auto">
      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search listings by title, category, or location..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg bg-white shadow-sm"
          />
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <div className="flex justify-center md:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                {[
                  filters.searchTerm,
                  filters.location,
                  filters.priceRange.min > 0 || filters.priceRange.max !== Infinity
                ].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        {/* Advanced Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block bg-white rounded-xl border border-gray-200 p-4 shadow-sm`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (per day)</label>
              <select
                value={JSON.stringify(filters.priceRange)}
                onChange={(e) => updateFilter('priceRange', JSON.parse(e.target.value) as { min: number; max: number })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {priceRanges.map((range) => (
                  <option key={range.label} value={JSON.stringify({ min: range.min, max: range.max })}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter city or province..."
                  value={filters.location}
                  onChange={(e) => updateFilter('location', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  list="locations"
                />
                <datalist id="locations">
                  {locations.map((location) => (
                    <option key={location} value={location} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors w-full justify-center"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.searchTerm && (
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                Search: &quot;{filters.searchTerm}&quot;
                <button onClick={() => updateFilter('searchTerm', '')}>
                  <X size={14} />
                </button>
              </span>
            )}
            {(filters.priceRange.max !== Infinity || filters.priceRange.min > 0) && (
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Price: {filters.priceRange.max === Infinity ? `R${filters.priceRange.min}+` : 
                        `R${filters.priceRange.min} - R${filters.priceRange.max}`}
                <button onClick={() => updateFilter('priceRange', { min: 0, max: Infinity })}>
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.location && (
              <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                Location: {filters.location}
                <button onClick={() => updateFilter('location', '')}>
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Counter */}
      <div className="text-center mb-4">
        <p className="text-gray-600">
          Showing {filteredListings.length} of {listings.length} listings
          {categoryParam && (
            <span className="ml-2 text-emerald-600 font-medium">
              in {categories.find(cat => slugify(cat) === categoryParam)}
            </span>
          )}
          {searchParam && (
            <span className="ml-2 text-blue-600 font-medium">
              for &quot;{searchParam}&quot;
            </span>
          )}
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <Link
          href="/listings"
          className={`px-4 py-2 rounded-full text-sm transition-all ${
            categoryParam === null
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          All Categories
        </Link>

        {categories.map((category) => {
          const slug = slugify(category);
          const categoryCount = listings.filter(item => slugify(item.category) === slug).length;
          return (
            <Link
              key={slug}
              href={`/listings?category=${slug}`}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                categoryParam === slug
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {category} ({categoryCount})
            </Link>
          );
        })}
      </div>

      {/* No Results State */}
      {filteredListings.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings found</h3>
          <p className="text-gray-600 mb-4">
            {hasActiveFilters || categoryParam
              ? "Try adjusting your filters or search terms to find what you're looking for."
              : "No listings are currently available."}
          </p>
          {(hasActiveFilters || categoryParam) && (
            <div className="space-x-4">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
              {categoryParam && (
                <Link
                  href="/listings"
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors inline-block"
                >
                  View All Categories
                </Link>
              )}
            </div>
          )}
        </div>
      )}

      {/* Grid of Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredListings.map((item) => (
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
                <h3 className="text-lg font-medium truncate group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin size={14} className="mr-1" />
                  <span>{item.city}, {item.province}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-emerald-600 font-bold">R{item.price}/day</p>
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar size={12} className="mr-1" />
                    <span>Available</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}