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

// Slugify helper
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
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-10 max-w-7xl mx-auto mt-16">
      <h2 className="text-2xl font-semibold text-start px-6">Explore categories</h2>

      {/* Mobile/Tablet: Swipeable */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide px-6">
        <div ref={scrollRef} className="flex gap-4 my-6 w-max">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item.label)}
              className="flex-shrink-0 flex flex-col items-center justify-center p-4 border rounded-xl min-w-[100px]"
            >
              <div className="mb-2">{item.icon}</div>
              <span className="text-xs font-medium text-center">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Chevron Scroll */}
      <div className="hidden lg:flex items-center gap-4 px-6 mt-6">
        <button onClick={() => scroll("left")} className="p-2 border rounded-full">
          <ChevronLeft />
        </button>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item.label)}
              className="flex-shrink-0 flex flex-col items-center justify-center p-4 border rounded-xl min-w-[100px]"
            >
              <div className="mb-2">{item.icon}</div>
              <span className="text-xs font-medium text-center">{item.label}</span>
            </button>
          ))}
        </div>
        <button onClick={() => scroll("right")} className="p-2 border rounded-full">
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
