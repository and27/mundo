"use client";

import AboutSection from "@/components/landing/AboutSection";
import BenefitsBar from "@/components/landing/BenefitsBar";
import FAQs from "@/components/landing/Faqs";
import FinalCallToAction from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";

export default function Tutor() {
  return (
    <main className="bg-black/30 backdrop-blur-sm  min-h-screen py-8 text-white">
      <Hero />
      <BenefitsBar />
      <AboutSection />
      <FAQs />
      <FinalCallToAction />
      <Footer />
    </main>
  );
}
