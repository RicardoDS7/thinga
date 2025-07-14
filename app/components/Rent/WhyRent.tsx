"use client";

import { useState } from "react";

export default function WhyRentSplitSection() {
  const [activeTab, setActiveTab] = useState("renters");

  const renters = [
    {
      icon: "💰",
      title: "Save money vs. buying new",
      description: "Access premium items at a fraction of the purchase price"
    },
    {
      icon: "🏠",
      title: "Avoid clutter and ownership burden",
      description: "Enjoy items without the hassle of storage and maintenance"
    },
    {
      icon: "⚡",
      title: "Access quality items on-demand",
      description: "Get exactly what you need, when you need it"
    },
    {
      icon: "🔄",
      title: "Try before you buy",
      description: "Test products before making a purchase commitment"
    },
    {
      icon: "🌱",
      title: "Reduce waste and live lighter",
      description: "Embrace sustainable living with conscious consumption"
    }
  ];

  const lenders = [
    {
      icon: "💵",
      title: "Make passive income from idle items",
      description: "Transform unused belongings into steady revenue streams"
    },
    {
      icon: "✨",
      title: "Turn clutter into cash",
      description: "Monetize items collecting dust in your home"
    },
    {
      icon: "🔄",
      title: "Support the circular economy",
      description: "Be part of the sustainable sharing movement"
    },
    {
      icon: "🤝",
      title: "Meet local, trustworthy renters",
      description: "Connect with verified community members nearby"
    },
    {
      icon: "🌍",
      title: "Help reduce overconsumption",
      description: "Make a positive environmental impact in your community"
    }
  ];

  const stats = [
    {
      value: "80%",
      suffix: "savings",
      label: "Cost Reduction",
      description: "Renters save up to 80% compared to buying new items outright",
      color: "from-emerald-500 to-teal-600"
    },
    {
      value: "3x",
      suffix: "more income",
      label: "Earning Potential",
      description: "Lenders earn 3× more through rentals vs. one-time sales",
      color: "from-blue-500 to-purple-600"
    },
    {
      value: "80kg+",
      suffix: "waste reduced",
      label: "Environmental Impact",
      description: "Each household reduces 80kg+ of waste yearly through sharing",
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Why choose the
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent"> sharing economy</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands who are already saving money, earning income, and reducing waste through smart sharing
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100 space-x-2">
            <button
              onClick={() => setActiveTab("renters")}
              className={`cursor-pointer px-8 py-3 rounded-xl font-semibold transition-all  ${
                activeTab === "renters"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              For Renters
            </button>
            <button
              onClick={() => setActiveTab("lenders")}
              className={`cursor-pointer px-8 py-3 rounded-xl font-semibold transition-all  ${
                activeTab === "lenders"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              For Lenders
            </button>
          </div>
        </div>

        {/* Benefits Content */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center items-center gap-6">
            {(activeTab === "renters" ? renters : lenders).map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Real impact, real results
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how our community is transforming the way we consume and share
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient background effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="text-center">
                  <div className={`text-5xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-medium mb-3">
                    {stat.suffix}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {stat.label}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl text-white! md:text-3xl font-bold mb-4">
              Ready to join the sharing revolution?
            </h3>
            <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
              Start saving money as a renter or earning income as a lender today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cursor-pointer bg-white text-pink-500 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg">
                <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Start Renting</span>
              </button>
              <button className="cursor-pointer bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-800 transition-colors">
                Start Lending
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}