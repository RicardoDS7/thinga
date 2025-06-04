"use client";

import { useState } from "react";
import Image from "next/image";

const basePath = process.env.NODE_ENV === "production" ? "/thinga" : "";

const popularItems = [
  { label: "Tool Set", image: `${basePath}/tool-set.png`, dailyEarnings: 200 },
  { label: "Evening Dress", image: `${basePath}/dress.png`, dailyEarnings: 300 },
  { label: "GoPro", image: `${basePath}/camera.png`, dailyEarnings: 200 },
  { label: "Tent", image: `${basePath}/camping-gear.png`, dailyEarnings: 150 },
  { label: "Podcast Studio", image: `${basePath}/podcast-studio.png`, dailyEarnings: 1500 },
];

function getSliderBackground(days: number, min = 1, max = 10) {
  const percent = ((days - min) / (max - min)) * 100;
  return `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percent}%, var(--color-secondary) ${percent}%, var(--color-secondary) 100%)`;
}

export default function HeroSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [days, setDays] = useState(3);
  const selectedItem = popularItems[selectedIndex];

  return (
    <div className="w-full text-gray-900">
      <section className="flex flex-col md:flex-row items-center justify-between px-6 pt-24 md:pt-36 pb-12 max-w-7xl mx-auto gap-8">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black leading-tight max-w-[15ch] mx-auto md:mx-0">
            You could earn{" "}
            <span className="text-[var(--color-primary)]">
              R{selectedItem.dailyEarnings * days}
            </span>{" "}
            by renting out your{" "}
            <span className="text-[var(--color-accent)]">
              {selectedItem.label}
            </span>{" "}
            on <span className="text-[var(--color-primary)]">thingo<span className="text-[var(--color-accent)]">.</span></span>
          </p>

          <input
            id="days"
            type="range"
            min={1}
            max={10}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="custom-slider w-full mt-6"
            style={{ background: getSliderBackground(days) }}
          />
          <label htmlFor="days" className="block text-normal font-medium text-gray-700 mt-2">
            Estimated earnings over
            <span className="font-semibold text-primary"> {days} day{days !== 1 ? "s" : ""}</span>
          </label>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-6">
            {popularItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => setSelectedIndex(index)}
                className={`cursor-pointer text-white px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  index === selectedIndex
                    ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                    : "bg-[var(--color-primary)] border-[var(--color-primary)] hover:brightness-110"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
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
                <span className="font-bold">{selectedItem.label}&apos;s</span> typically rent for
                <span className="text-[var(--color-primary)] font-bold">
                  {" "}R{selectedItem.dailyEarnings}/day
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
