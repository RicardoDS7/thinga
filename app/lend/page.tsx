"use client";

import { useState } from "react";
import Image from "next/image";

const popularItems = [
  { label: "Tool Set", image: "/tool-set.png", dailyEarnings: 75 },
  { label: "Evening Dress", image: "/dress.png", dailyEarnings: 300 },
  { label: "GoPro", image: "/camera.png", dailyEarnings: 200 },
  { label: "Tent", image: "/camping-gear.png", dailyEarnings: 150 },
  { label: "Podcast Studio", image: "/podcast-studio.png", dailyEarnings: 1500 },
];

function getSliderBackground(days: number, min = 1, max = 10) {
  const percent = ((days - min) / (max - min)) * 100;
  return `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percent}%, var(--color-secondary) ${percent}%, var(--color-secondary) 100%)`;
}


export default function RentLandingPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [days, setDays] = useState(3);
  const selectedItem = popularItems[selectedIndex];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white text-gray-900">
      <section className="flex flex-col md:flex-row items-center md:items-start justify-between w-full px-6 pt-20 pb-10 max-w-7xl mx-auto gap-0">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            
            <p className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-[900] leading-tight text-center w-[15ch] mx-auto">
                You could earn{" "}
                <span className="text-[var(--color-primary)] font-[900]">
                    R{selectedItem.dailyEarnings * days}
                </span>{" "}
                by renting out your{" "}
                <span className="text-[var(--color-accent)] font-[900]">
                    {selectedItem.label}
                </span>{" "}
                on <span className="font-[900] text-[var(--color-primary)]">thingo.</span>
            </p>

            <input
              id="days"
              type="range"
              min={1}
              max={10}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="custom-slider w-full"
              style={{
                    background: getSliderBackground(days),
                }}
            />
            <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-2">
              Estimated earnings over
              <span className="font-semibold text-primary"> {days} day{days !== 1 ? "s" : ""}</span>
            </label>
        

        
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
            {popularItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => setSelectedIndex(index)}
                className={`px-4 py-2 rounded-full border text-sm transition-colors font-medium ${
                  index === selectedIndex
                    ? "bg-primary text-white border-primary selected"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

        </div>

        <div className="w-full: md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-md">
            <Image
              src={selectedItem.image}
              alt={selectedItem.label}
              width={300}
              height={300}
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-2xl shadow-lg">
              <p className="text-md font-bold">
                <span className="font-bold">{selectedItem.label}'s</span> typically rent for
                <span className="text-[var(--color-primary)] font-bold"> R{selectedItem.dailyEarnings}/day</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
