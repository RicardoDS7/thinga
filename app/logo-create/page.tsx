// pages/DownloadPage.tsx
"use client";
import React, { useState } from 'react';
import TextToImage from '@/app/components/TextToImage';

const DownloadPage = () => {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const downloadImage = () => {
    if (!imageDataUrl) return;
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = 'minimal-logo.png';
    link.click();
  };

  return (
    <div>
      <TextToImage
        text="l"
        onImageReady={setImageDataUrl}
        fontSize={720}
        skew={-15}
        color="#4CAF87"
      />
      <button onClick={downloadImage} disabled={!imageDataUrl}>
        Download PNG
      </button>
    </div>
  );
};

export default DownloadPage;
