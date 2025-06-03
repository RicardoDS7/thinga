"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  Shirt,
  Tent,
  Truck,
  PartyPopper,
  Building,
  Hammer,
  Luggage,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const items = [
  { label: "Tools & DIY", icon: <Hammer size={24} /> },
  { label: "Cameras & Audio", icon: <Camera size={24} /> },
  { label: "Clothing & Fashion", icon: <Shirt size={24} /> },
  { label: "Studios & Spaces", icon: <Building size={24} /> },
  { label: "Camping & Outdoor", icon: <Tent size={24} /> },
  { label: "Party & Event Gear", icon: <PartyPopper size={24} /> },
  { label: "Vehicles & Trailers", icon: <Truck size={24} /> },
  { label: "Travel Essentials", icon: <Luggage size={24} /> },
];

const slugify = (text: string) =>
  text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-").trim();

export default function Categories() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClick = (label: string) => {
    const slug = slugify(label);
    router.push(`/listings?category=${slug}`);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-6">Explore Categories</h2>

      {/* Mobile/Tablet: Scrollable horizontally */}
      <div className="lg:hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2"
        >
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item.label)}
              className="flex-shrink-0 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-5 min-w-[110px] hover:shadow-md transition"
            >
              <div className="mb-2 text-gray-700">{item.icon}</div>
              <span className="text-xs font-medium text-center text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Chevron + Scrollable */}
      <div className="hidden lg:flex items-center gap-4 mt-4">
        <button
          onClick={() => scroll("left")}
          className="p-2 cursor-pointer border border-gray-300 rounded-full bg-white shadow hover:shadow-md transition"
        >
          <ChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth flex-1 py-2"
        >
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item.label)}
              className="flex-shrink-0 cursor-pointer flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-5 min-w-[110px] hover:shadow-md transition"
            >
              <div className="mb-2 text-gray-700">{item.icon}</div>
              <span className="text-xs font-medium text-center text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="p-2 cursor-pointer border border-gray-300 rounded-full bg-white shadow hover:shadow-md transition"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
