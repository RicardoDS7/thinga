"use client";

import { Box, Calendar, CheckCircle, Search } from "lucide-react";
import { useState } from "react";

export default function HowItWorksSection() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      title: "Search",
      description: "Find anything from power tools to party gear near you by searching what you need and when.",
      icon: <Search className="w-6 h-6 text-white" />,
      gradient: "from-rose-500 to-pink-500",
    },
    {
      title: "Book & Pay",
      description: "Choose the item, pick your dates, and pay securely — all in a few taps. No awkward bank transfers.",
      icon: <Calendar className="w-6 h-6 text-white" />,
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      title: "Pick Up or Delivery",
      description: "Collect it from the lender or have it delivered to your door (if the lender offers delivery).",
      icon: <Box className="w-6 h-6 text-white" />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Use & Return",
      description: "Use it like it's yours, then return it clean and on time. Simple, fair, and flexible.",
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="bg-[var(--color-bg)] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Rent what you need, when you need it. It&apos;s that simple.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group relative cursor-pointer transform transition-all duration-300 ${
                hoveredStep === index ? 'scale-105' : 'hover:scale-102'
              }`}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Card */}
              <div className="bg-white rounded-3xl p-8 h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Icon Container
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:rotate-3`}>
                  <span className="text-2xl filter brightness-110">{step.icon}</span>
                </div> */}

                {/* Step Number */}
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Step {index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>

                {/* Animated bottom border */}
                <div className={`absolute bottom-0 left-[10%] h-1 bg-gradient-to-r ${step.gradient} transition-all duration-300 ${
                  hoveredStep === index ? 'justifty-center align-center w-[80%]' : 'w-0'
                } rounded-b-3xl`}></div>
              </div>

              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200 transform -translate-y-1/2 z-10">
                  <div className={`h-full bg-gradient-to-r ${step.gradient} transition-all duration-500 ${
                    hoveredStep === index ? 'w-full' : 'w-0'
                  }`}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button 
          onClick={() => window.location.href = "/listings"}
          className="cursor-pointer bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Start Renting Now
          </button>
        </div>
      </div>
    </section>
  );
}