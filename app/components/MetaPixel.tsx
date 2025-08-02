// components/MetaPixel.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface MetaPixelProps {
  pixelId: string;
}

// Define proper types for Meta Pixel
type FbqArgs = [string, ...unknown[]];

interface FbqFunction {
  (...args: FbqArgs): void;
  callMethod?: (...args: FbqArgs) => void;
  queue?: FbqArgs[];
  push?: FbqFunction;
  loaded?: boolean;
  version?: string;
}

// Declare fbq function globally with proper typing
declare global {
  interface Window {
    fbq: FbqFunction;
  }
}

export default function MetaPixel({ pixelId }: MetaPixelProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize Meta Pixel only if it doesn't exist
    if (typeof window.fbq === 'undefined') {
      // Load Facebook Pixel script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);

      // Initialize fbq function with proper typing
      const fbqFunction: FbqFunction = function(...args: FbqArgs): void {
        if (fbqFunction.callMethod) {
          fbqFunction.callMethod(...args);
        } else {
          fbqFunction.queue?.push(args);
        }
      };
      
      fbqFunction.push = fbqFunction;
      fbqFunction.loaded = true;
      fbqFunction.version = '2.0';
      fbqFunction.queue = [];

      window.fbq = fbqFunction;

      // Initialize the pixel
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }
  }, [pixelId]);

  useEffect(() => {
    // Track page views on route changes
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt="Meta Pixel"
      />
    </noscript>
  );
}