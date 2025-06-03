"use client";

export default function WhyRentSplitSection() {
  const renters = [
    "Save money vs. buying new",
    "Avoid clutter and ownership burden",
    "Access quality items on-demand",
    "Try before you buy",
    "Reduce waste and live lighter",
  ];

  const lenders = [
    "Make passive income from idle items",
    "Turn clutter into cash",
    "Support the circular economy",
    "Meet local, trustworthy renters",
    "Help reduce overconsumption",
  ];

  const stats = [
    {
      value: "💸 Up to 80%",
      label: "Savings for Renters",
      description: "Renting items can be up to 80% cheaper than buying them outright.",
    },
    {
      value: "📈 3x More",
      label: "Earnings for Lenders",
      description: "Lenders can earn up to 3× more by renting items repeatedly instead of selling once.",
    },
    {
      value: "🌍 80kg+ Waste Reduced",
      label: "Circular Impact",
      description: "Each household can reduce over 80kg of waste yearly by participating in the rental economy.",
    },
  ];

  return (
    <section className="pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Why Rent Instead of Buy?
        </h2>

        {/* Benefits */}
        <div className="flex flex-col md:flex-row justify-evenly gap-12 mb-16">
          <div>
            <h3 className="text-xl font-semibold text-pink-600 mb-4">For Renters</h3>
            <ul className="space-y-3 text-gray-700">
              {renters.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-pink-500 text-lg">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-purple-600 mb-4">For Lenders</h3>
            <ul className="space-y-3 text-gray-700">
              {lenders.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-500 text-lg">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Supporting Stats */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <div className="text-2xl text-[var(--color-accent)] mb-2 font-display font-black">{stat.value}</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</h4>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
