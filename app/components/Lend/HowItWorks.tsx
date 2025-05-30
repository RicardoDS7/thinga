import { Calendar, Handshake, Tag } from "lucide-react";
import Image from "next/image";

const basePath = process.env.NODE_ENV === "production" ? "/thinga" : "";

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-5xl font-bold">
          It&apos;s easy to list your items on thingo
        </h2>

        {/* Mockups or phone visuals */}
        <div className="flex flex-col md:flex-row justify-center items-center h-128 overflow-hidden relative w-full md:w-2/3 align-center mx-auto mt-10 mb-16">
          <Image
            src={`${basePath}/Mock-up.png`}
            alt="List your item"
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Step Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Tag />
            </div>
            <h3 className="text-lg font-semibold mb-2">List your item in minutes</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Add your drill, dress, or GoPro and start receiving requests with no hassle.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Calendar />
            </div>
            <h3 className="text-lg font-semibold mb-2">Rent on your schedule</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Set your availability, pricing, and preferences at any time.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Handshake />
            </div>
            <h3 className="text-lg font-semibold mb-2">Support you can trust</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Get help from our team or chat with experienced users when needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
