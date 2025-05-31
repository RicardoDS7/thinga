// app/renters/page.tsx (or /components/pages/RentersLanding.tsx)

import Categories from "../components/Rent/Categories";
import ListingsGrid from "../components/ListingGrid";
import Hero from "../components/Rent/Hero";
import HowItWorks from "../components/Rent/HowItWorks";

export default function RentersLandingPage() {
  return (
    <main className="bg-white text-gray-900">
        <Hero />
        <Categories />
        <ListingsGrid />
        <HowItWorks />
      
    
        
    </main>
  );
}
