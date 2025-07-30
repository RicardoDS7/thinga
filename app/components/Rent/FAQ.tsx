"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What happens if someone damages or loses my item?",
    answer:
      "Lendaba provides platform-backed protection for eligible items covering accidental damage, loss, or theft—up to R50,000. To qualify, you must submit a claim with supporting details within 48 hours of the item’s expected return.",
  },
  {
    question: "Does Lendaba offer insurance for my item?",
    answer:
      "Yes. Every eligible rental is covered by our platform insurance, protecting lenders against theft, loss, or serious damage up to R50,000. Deposits still apply for minor issues and help prevent misuse.",
  },
  {
    question: "How do deposits work?",
    answer:
      "You can set a refundable deposit for your item. The renter pays it upfront and receives it back once the item is returned in good condition.",
  },
  {
    question: "Are renters verified?",
    answer:
      "Yes. Every renter must verify their ID, email, and contact number before they can book an item.",
  },
  {
    question: "Can I choose who rents my item?",
    answer:
      "Absolutely. You can review each rental request and only accept those you're comfortable with.",
  },
];

export default function FaqSection() {
  return (
    <section id="FAQ" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Frequently asked questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <Disclosure.Button className="flex justify-between items-center w-full text-left cursor-pointer">
                    <span className="font-medium text-gray-900 text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-2 text-sm text-gray-700">
                    {faq.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
