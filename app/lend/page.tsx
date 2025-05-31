import HeroSection from "../components/Lend/Hero";
import React from "react";
import HowItWorks from "../components/Lend/HowItWorks";
import Protection from "../components/Lend/Insurance";
import FaqSection from "../components/Lend/FAQ";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <HowItWorks />

      <Protection />

      <FaqSection />

      
    </>
  );
}
