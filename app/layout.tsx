import type { Metadata } from "next";
import { Inter, MuseoModerno, Paytone_One } from "next/font/google";
import "./globals.css";
import MetaPixelWrapper from "./components/MetaPixelWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
// const museo_moderno = MuseoModerno({ subsets: ["latin"], style: ["normal","italic"], weight: ["400", "500", "700"], variable: "--font-display" , display: "swap"});
const paytone_one = Paytone_One({ subsets: ["latin"], style: ["normal"], weight: ["400"], variable: "--font-display" , display: "swap"});

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
      <body
        className={`${inter.variable} ${paytone_one.variable} antialiased`}
      >
        <MetaPixelWrapper pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID!}/>
        {children}
      </body>
    </html>
  );
}
