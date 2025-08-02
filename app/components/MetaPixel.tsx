'use client';

import { useEffect } from 'react';

// Define types first
type FbqFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
  push: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: unknown;
  }
}

export default function MetaPixel() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.fbq) return;

    (function (
        f: Window & { fbq?: FbqFunction; _fbq?: unknown },
        b: Document,
        e: string,
        v: string
    ) {
        const n: FbqFunction = function (...args: unknown[]) {
        if (n.callMethod) {
            n.callMethod(...args);
        } else {
            n.queue.push(args);
        }
        } as FbqFunction;

        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        f.fbq = n;

        const t = b.createElement(e) as HTMLScriptElement;
        t.async = true;
        t.src = v;
        const s = b.getElementsByTagName(e)[0];
        s?.parentNode?.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    // ✅ Explicitly typed fbq to avoid TypeScript errors
    const fbq = window.fbq as FbqFunction | undefined;
    fbq?.('init', '793610903238629');
    fbq?.('track', 'PageView');
    }, []);

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src="https://www.facebook.com/tr?id=793610903238629&ev=PageView&noscript=1"
        alt=""
      />
    </noscript>
  );
}
