"use client";

import { useState } from "react";
import Image from "next/image";

const popularItems = [
  { label: "Tool Set", image: "/tool-set.png", dailyEarnings: 75 },
  { label: "Evening dress", image: "/dress.png", dailyEarnings: 300 },
  { label: "GoPro", image: "/camera.png", dailyEarnings: 200 },
  { label: "Camping Tent", image: "/camping-gear.png", dailyEarnings: 150 },
  { label: "Podcast Studio", image: "/podcast-studio.png", dailyEarnings: 1500 },
];

function getSliderBackground(days: number, min = 1, max = 30) {
  const percent = ((days - min) / (max - min)) * 100;
  return `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percent}%, var(--color-secondary) ${percent}%, var(--color-secondary) 100%)`;
}


export default function RentLandingPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [days, setDays] = useState(3);
  const selectedItem = popularItems[selectedIndex];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white text-gray-900">
      <section className="flex flex-col md:flex-row items-center md:items-start justify-between w-full px-6 pt-20 pb-10 max-w-7xl mx-auto">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl font-display font-bold mb-4">
            Turn your everyday items into everyday earnings
          </h1>
          <p className="text-lg max-w-xl md:mx-0 mx-auto mb-6">
            Join thousands of South Africans renting out tools, clothes, gear, and more. See what you could earn today.
          </p>

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

          {/* Earnings Estimator */}
          <div className="mt-6">
            
            <p className="mt-2 text-xl font-semibold">
              You could earn{" "}
              <span className="text-[var(--color-primary)] font-bold">
                R{selectedItem.dailyEarnings * days}
              </span>{" "}
              by renting out your{" "}
              <span className="text-[var(--color-primary)] font-bold">{selectedItem.label}</span> on <span className="font-bold">thingo.</span>
            </p>
            <input
              id="days"
              type="range"
              min={1}
              max={30}
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
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md overflow-hidden rounded-xl shadow-md">
            <Image
              src={selectedItem.image}
              alt={selectedItem.label}
              width={300}
              height={300}
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 p-4 rounded-md shadow-lg">
              <p className="text-lg font-semibold">
                <span className="text-[var(--color-primary)] font-bold">{selectedItem.label}'s</span> typically rent for
                <span className="text-[var(--color-primary)] font-bold"> R{selectedItem.dailyEarnings}/day</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
