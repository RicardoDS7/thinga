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
    <section className="bg-white py-20 px-6 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Whatever you rent, you&apos;re always protected
        </h2>

        <div className="space-y-8">
          {protectionItems.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <CheckCircle
                className="text-[var(--color-primary)] mt-1 flex-shrink-0"
                size={24}
                />

              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-normal text-gray-700 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
