"use client";

export default function HowItWorksSection() {
  const steps = [
    {
      title: "1. Search",
      description: "Find anything from power tools to party gear near you by searching what you need and when.",
      icon: "🔍",
    },
    {
      title: "2. Book & Pay",
      description: "Choose the item, pick your dates, and pay securely — all in a few taps. No awkward bank transfers.",
      icon: "💳",
    },
    {
      title: "3. Pick Up or Get It Delivered",
      description: "Collect it from the lender or have it delivered to your door (if the lender offers delivery).",
      icon: "📦",
    },
    {
      title: "4. Use & Return",
      description: "Use it like it’s yours, then return it clean and on time. Simple, fair, and flexible.",
      icon: "✅",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          How Thingo Works for Renters
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200 flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
