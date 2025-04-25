"use client";

import AboutSection from "@/components/landing/AboutSection";
import Benefits from "@/components/landing/Benefits";
import FAQs from "@/components/landing/Faqs";
import FinalCallToAction from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import TestimonialCarousel from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <main className="bg-black/30 backdrop-blur-md  px-4 md:px-8 min-h-screen py-8 text-white">
      <div className="max-w-4xl mx-auto">
        <Hero />
        <Benefits />
        <AboutSection />
        <FAQs />
        <TestimonialCarousel />
        <FinalCallToAction />
        <Footer />
      </div>
    </main>
  );
}
