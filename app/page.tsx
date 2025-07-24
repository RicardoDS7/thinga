// app/renters/page.tsx (or /components/pages/RentersLanding.tsx)
import { Suspense } from "react";
import Categories from "./components/Rent/Categories";
import NewListings from "./components/Rent/NewListings"
import Hero from "./components/Rent/Hero";
import HowItWorks from "./components/Rent/HowItWorks";
import FaqSection from "./components/Rent/FAQ";
import WhyRentSection from "./components/Rent/WhyRent";
// import TestimonialsSection from "./components/Rent/Testimonials";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function RentersLandingPage() {
  return (
    <>
    <Header />
    <main className="bg-[var(--color-bg)] text-gray-900">
        <Hero />
        <Suspense fallback={<div>Loading categories...</div>}>
          <Categories />
        </Suspense>
        <NewListings />
        {/* <TestimonialsSection /> */}
        <HowItWorks />
        <WhyRentSection />
        <FaqSection />
        
    </main>
    <Footer />
    </>
  );
}
