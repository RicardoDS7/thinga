// components/MetaPixelWrapper.tsx
'use client';

import { Suspense } from 'react';
import MetaPixel from './MetaPixel';

interface MetaPixelWrapperProps {
  pixelId: string;
}

export default function MetaPixelWrapper({ pixelId }: MetaPixelWrapperProps) {
  return (
    <Suspense fallback={null}>
      <MetaPixel pixelId={pixelId} />
    </Suspense>
  );
}