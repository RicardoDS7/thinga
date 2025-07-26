"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Calendar, TrendingUp } from "lucide-react";

const popularItems = [
  { label: "Tool Set", image: `/tool-set.png`, dailyEarnings: 200 },
  { label: "Evening Dress", image: `/dress.png`, dailyEarnings: 300 },
  { label: "GoPro", image: `/camera.png`, dailyEarnings: 200 },
  { label: "Tent", image: `/camping-gear.png`, dailyEarnings: 150 },
  { label: "Podcast Studio", image: `/podcast-studio.png`, dailyEarnings: 1500 },
];

interface GetSliderBackgroundOptions {
  days: number;
  min?: number;
  max?: number;
}

function getSliderBackground(days: number, min: number = 1, max: number = 10): string {
  const percent = ((days - min) / (max - min)) * 100;
  return `linear-gradient(to right, #10b981 0%, #10b981 ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`;
}

interface FormatCurrencyOptions {
  amount: number;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function HeroSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [days, setDays] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const selectedItem = popularItems[selectedIndex];
  const totalEarnings = selectedItem.dailyEarnings * days;

  interface PopularItem {
    label: string;
    image: string;
    dailyEarnings: number;
  }

  interface HandleItemChange {
    (index: number): void;
  }

  const handleItemChange: HandleItemChange = (index) => {
    if (index === selectedIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedIndex(index);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="w-full text-gray-900 bg-[var(--color-bg)]">
      <section className="flex flex-col md:flex-row items-center justify-between px-6 pt-24 md:pt-36 pb-12 max-w-7xl mx-auto gap-8">
        <div className="w-full md:w-1/2 text-center md:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm mb-6">
            <Sparkles className="w-4 h-4" />
            South Africa&apos;s #1 Rental Platform
          </div>

          {/* Main Headline */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl text-gray-700! md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight">
              You could earn{" "}
              <span className={`inline-block transition-all duration-500 ${isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent drop-shadow-sm">
                  {formatCurrency(totalEarnings)}
                </span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 leading-tight">
              by renting out your{" "}
              <span className={`inline-block transition-all duration-500 ${isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
                <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 bg-clip-text text-transparent">
                  {selectedItem.label.toLowerCase()}
                </span>
              </span>
              {" "}on{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent font-black">
                lendaba.
              </span>
            </p>
          </div>

          {/* Earnings Calculator */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg space-y-4 mb-6">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <Calendar className="w-5 h-5" />
              Calculate Your Earnings
            </div>
            
            <div className="space-y-3">
              <input
                id="days"
                type="range"
                min={1}
                max={10}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer slider"
                style={{ background: getSliderBackground(days) }}
              />
              
              <div className="flex justify-between items-center">
                <label htmlFor="days" className="text-gray-600 font-medium">
                  Rental period: <span className="text-emerald-600 font-bold">{days} day{days !== 1 ? "s" : ""}</span>
                </label>
                <div className="flex items-center gap-1 text-emerald-600 font-bold">
                  <TrendingUp className="w-4 h-4" />
                  {formatCurrency(selectedItem.dailyEarnings)}/day
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-6">
            {popularItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => handleItemChange(index)}
                className={`cursor-pointer text-white px-4 py-2 rounded-full border text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-gradient-to-r from-rose-500 to-pink-500"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 "
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:block w-full md:w-1/2 flex justify-center">
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

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </div>
  );
}