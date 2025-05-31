"use client";

import { useState } from "react";
import {
  Camera,
  Shirt,
  Tent,
  Truck,
  PartyPopper,
  Building,
  Hammer,
  Luggage,
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

export default function Categories() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <section className="py-10 max-w-7xl mx-auto mt-16">
      <h2 className="text-2xl font-semibold text-start px-6">
        Explore categories
      </h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 mt-6 w-max px-6">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => toggleItem(item.label)}
              className={`flex-shrink-0 flex cursor-pointer flex-col items-center justify-center p-4 border rounded-xl min-w-[100px] transition`}
            >
              <div className="mb-2">{item.icon}</div>
              <span className="text-xs font-medium text-center">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
