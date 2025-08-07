import React, { useRef, useEffect } from 'react';

interface Props {
  text: string;
  fontSize?: number;
  skew?: number; // in degrees
  color?: string;
  onImageReady?: (dataUrl: string) => void;
}

const TextToImage: React.FC<Props> = ({
  text,
  fontSize = 128,
  skew = -20, // simulate italic
  color = '#000000',
  onImageReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = 1000 * dpr;
    const canvasHeight = 1000 * dpr;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = '512px';
    canvas.style.height = '512px';
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set font first to measure text
    ctx.font = `${fontSize}px 'Paytone One', sans-serif`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    // Apply fake italic skew
    const skewRadians = (skew * Math.PI) / 180;
    ctx.setTransform(1, 0, Math.tan(skewRadians), 1, 0, 0);

    // Draw text at center of canvas
    const centerX = (canvasWidth / dpr) / 2;
    const centerY = (canvasHeight / dpr) / 2;
    ctx.fillText(text, centerX, centerY);

    // Emit PNG data URL
    const dataUrl = canvas.toDataURL('image/png', 1.0); // high quality
    if (onImageReady) onImageReady(dataUrl);
  }, [text, fontSize, skew, color, onImageReady]);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
};

export default TextToImage;