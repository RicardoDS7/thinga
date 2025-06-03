"use client";
import Image from "next/image";

const testimonials = [
  {
    timeAgo: "1 hour ago",
    rating: 5,
    text: "The lights were amazing and made our party super special 🎉",
    user: "Vlad B",
    item: { name: "Party Lights - Ledbar BossFx-1 Pro", url: "/listing/party-lights" },
  },
  {
    timeAgo: "22 minutes ago",
    rating: 5,
    text: "Fantastically satisfied. Easy pick-up & drop-off. Item in great condition!",
    user: "David S",
    item: { name: "Hearing protection for babies", url: "/listing/hearing-protection" },
  },
  {
    timeAgo: "28 minutes ago",
    rating: 4,
    text: "Smooth rental, friendly lender. Highly recommended.",
    user: "Klas K",
    item: { name: "Large space, Automatic, Light truck", url: "/listing/light-truck" },
  },
  {
    timeAgo: "34 minutes ago",
    rating: 4,
    text: "Very good 👍 Hassle-free process.",
    user: "Magnus W",
    item: { name: "Thule Travel Bag", url: "/listing/thule-travel-bag" },
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png" // Replace with your background path
          alt="Testimonials background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[var(--color-accent)]/90 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center !text-white mb-10">
          What our users are saying
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200 border border-gray-200 flex flex-col justify-between"
            >
              <p className="text-xs text-gray-400 mb-1">{t.timeAgo}</p>
              <div className="flex mb-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-pink-500 text-lg">❤️</span>
                ))}
              </div>
              <p className="text-sm text-gray-700 mb-4">{t.text}</p>
              <p className="text-xs text-gray-500 mt-auto">
                <strong>{t.user}</strong> rented{" "}
                <a href={t.item.url} className="text-[var(--color-primary)] underline">
                  {t.item.name}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
