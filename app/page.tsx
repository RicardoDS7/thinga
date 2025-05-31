// app/renters/page.tsx (or /components/pages/RentersLanding.tsx)
import { Suspense } from "react";
import Categories from "./components/Rent/Categories";
import NewListings from "./components/Rent/NewListings"
import Hero from "./components/Rent/Hero";
import HowItWorks from "./components/Rent/HowItWorks";
import Protection from "./components/Lend/Insurance";
import FaqSection from "./components/Rent/FAQ";

export default function RentersLandingPage() {
  return (
    <main className="bg-white text-gray-900">
        <Hero />
        <Suspense fallback={<div>Loading categories...</div>}>
          <Categories />
        </Suspense>
        <NewListings />
        <HowItWorks />
        <Protection />
        <FaqSection />
    </main>
  );
}
