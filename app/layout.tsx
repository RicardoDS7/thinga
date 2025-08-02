import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import MetaPixelWrapper from "./components/MetaPixelWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-display" , display: "swap"});

export const metadata: Metadata = {
  title: "Lendaba",
  description: "South Africa's #1 rental platform. Rent anything, anywhere, anytime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MetaPixelWrapper pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID!}/>
      <body
        className={`${inter.variable}  ${ubuntu.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
