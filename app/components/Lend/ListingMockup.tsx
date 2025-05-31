"use client";

import { useState } from "react";
import { Camera, Shirt, Tent, Truck, PartyPopper, Building, Hammer, Luggage } from "lucide-react"; // Example icons

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

export default function AddableItemGrid() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <section className="py-10 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        What would you like to rent out?
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => toggleItem(item.label)}
            className={`flex flex-col items-center justify-center p-4 border rounded-xl transition ${
              selected.includes(item.label)
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                : "border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            <div className="mb-2">{item.icon}</div>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
