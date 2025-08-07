"use client";

import { Calendar, DollarSign, Star, Tag, Verified } from "lucide-react";
import { useState } from "react";

export default function WhyRentSplitSection() {
  const [activeTab, setActiveTab] = useState("renters");

  const renters = [
    {
      icon: <Tag className="w-8 h-8 text-white"/>,
      title: "Why Buy When You Can Borrow?",
      description: "Ideal for seldom-used tools, gadgets, or gear—access what you need at a fraction of the cost.",
      highlight: "60% cheaper than buying",
      color: "from-emerald-400 to-teal-500"
    },
    {
      icon: <Verified className="w-8 h-8 text-white"/>,
      title: "Verified Lenders, Reviewed Items",
      description: "All users and items are verified and reviewed. We safeguard every rental with secure payments, anti-fraud systems, and transparent community ratings.",
      highlight: "100% Verified",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: <Calendar className="w-8 h-8 text-white"/>,
      title: "Check Dates, Reserve, and Rent in Just a Few Clicks.",
      description: "See what’s available when you need it. Fast, simple, and stress-free booking.",
      highlight: "Seamless Booking",
      color: "from-purple-400 to-pink-500"
    },
  ];

  const lenders = [
    {
      icon: <DollarSign className="w-8 h-8 text-white"/>,
      title: "Earn More Over Time by Renting—Not Selling.",
      description: "Why sell once when you can earn again and again? List once, earn passively.",
      highlight: "3X More Earnings than Selling",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Verified className="w-8 h-8 text-white"/>,
      title: "Secure Rentals with Verified Renters and Dispute Support.",
      description: "We verify every renter and provide built-in safeguards to protect your items from loss or damage.",
      highlight: "Fully Secured",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: <Star className="w-8 h-8 text-white"/>,
      title: "Earn Trust, Get More Bookings, and Grow Your Side Hustle.",
      description: "Reviews and ratings help you stand out and attract more renters. The better your record, the more you earn.",
      highlight: "Grow Your Business",
      color: "from-rose-400 to-pink-500"
    },
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
          <div className="bg-white rounded-full p-2 shadow-lg border border-gray-100 space-x-2">
            <button
              onClick={() => setActiveTab("renters")}
              className={`cursor-pointer px-6 py-3 rounded-full font-semibold transition-all  ${
                activeTab === "renters"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              For Renters
            </button>
            <button
              onClick={() => setActiveTab("lenders")}
              className={`cursor-pointer px-6 py-3 rounded-full font-semibold transition-all  ${
                activeTab === "lenders"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              For Lenders
            </button>
          </div>
        </div>

        {/* Benefits Content - Enhanced Cards */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(activeTab === "renters" ? renters : lenders).map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                style={{
                  animationDelay: `${idx * 150}ms`,
                  animation: activeTab ? `fadeInUp 0.6s ease-out forwards` : 'none'
                }}
              >
                {/* Gradient background overlay */}
                {/* <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-all duration-500`}></div> */}
                
                {/* Decorative corner accent */}
                {/* <div className={`absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br ${item.color} rounded-full opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110`}></div> */}
                
                <div className="relative z-10">
                  {/* Icon container with improved styling */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Highlight badge */}
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${item.color} text-white shadow-lg opacity-90 group-hover:opacity-100 transition-all duration-300`}>
                      {item.highlight}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-4 group-hover:text-gray-800 transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute -bottom-2 left-0 h-1 w-0 bg-gradient-to-r ${item.color} group-hover:w-full transition-all duration-500 rounded-b-3xl`}></div>
                </div>

                {/* Floating elements for visual interest */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gray-200 rounded-full opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute bottom-8 left-6 w-1 h-1 bg-gray-300 rounded-full opacity-30 group-hover:opacity-70 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="relative z-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white">

            {/* Decorative corner accent */}
            <div className={`absolute -top-2 -right-2 w-30 h-30 bg-gradient-to-br bg-emerald-200 rounded-full opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110`}></div>

            <h3 className="text-2xl text-white! md:text-3xl font-bold mb-4">
              Ready to join the sharing revolution?
            </h3>
            <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
              Start saving money as a renter or earning income as a lender today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
              onClick={() => window.location.href = "/listings"}
              className="cursor-pointer bg-white text-pink-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 shadow-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Start Renting</span>
              </button>
              <button 
              onClick={() => window.location.href = "/lender-registration"}
              className="cursor-pointer bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Start Lending
              </button>
            </div>

            {/* Floating elements for visual interest */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-gray-200 rounded-full opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="absolute bottom-8 left-6 w-1 h-1 bg-gray-300 rounded-full opacity-30 group-hover:opacity-70 transition-all duration-300"></div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}