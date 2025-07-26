import { CheckCircle } from "lucide-react";

const protectionItems = [
  {
    title: "Verified renters",
    description:
      "Every renter on thingo goes through ID and contact verification to ensure you're only lending to trusted individuals.",
  },
  {
    title: "Set your own deposit",
    description:
      "You choose the refundable deposit amount for your item — giving you peace of mind that it's returned in the same condition.",
  },
  {
    title: "24/7 support",
    description:
      "Our team is here around the clock to assist with any issues, disputes, or questions that come up before, during, or after a rental.",
  },
];

export default function Protection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl text-gray-700! sm:text-4xl lg:text-5xl font-bold text-center mb-12 lg:mb-16 leading-tight">
          Whatever you lend out, you&apos;re always{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            protected
          </span>
        </h2>

        <div className="space-y-6 lg:space-y-8">
          {protectionItems.map((item, index) => (
            <div 
              key={item.title} 
              className="flex items-start gap-4 p-4 sm:p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300 group"
            >
              <div className="p-1 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-300">
                <CheckCircle
                  className="text-emerald-600 flex-shrink-0"
                  size={24}
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl lg:text-2xl font-semibold mb-2 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}