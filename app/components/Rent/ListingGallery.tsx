'use client';

import { useState } from "react";
import Image from "next/image";

export default function ListingGallery({ images, title }: { images: string[]; title: string }) {
  const [selectedImg, setSelectedImg] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Large Display Image */}
        <div
          className="rounded-xl overflow-hidden relative w-full"
          style={{
            aspectRatio: "16/10",
            minHeight: 300,
            maxHeight: 500,
            height: "auto",
          }}
        >
          {/* Blurred background */}
          <Image
            src={selectedImg}
            alt={title}
            fill
            sizes="(max-width: 800px) 100vw, 800px"
            className="object-cover blur-lg scale-105"
            aria-hidden="true"
            style={{ zIndex: 0, position: "absolute", top: 0, left: 0 }}
          />
          {/* Main image */}
          <Image
            src={selectedImg}
            alt={title}
            fill
            sizes="(max-width: 800px) 100vw, 800px"
            className="object-contain relative"
            priority
            style={{ zIndex: 1}}
          />
        </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImg(img)}
            className={`cursor-pointer rounded-xl overflow-hidden border-2 ${
              img === selectedImg ? 'border-[var(--color-primary)]' : 'border-transparent'
            }`}
          >

            <div className="relative w-20 h-20 bg-gray-100 overflow-hidden flex-shrink-0">
                {/* Blurred background */}
                <Image
                  src={img}
                  alt={`${title} ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain blur-lg scale-105"
                  aria-hidden="true"
                  style={{ zIndex: 0 }}
                />
                {/* Main image */}
                <Image
                  src={img}
                  alt={`${title} ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain"
                  priority
                  style={{ zIndex: 1, position: "absolute", top: 0, left: 0 }}
                />
            </div>
            
          </button>
        ))}
      </div>
    </div>
  );
}
