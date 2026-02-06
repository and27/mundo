"use client";

import AboutSection from "@/components/tutorLanding/AboutSection";
import BenefitsBar from "@/components/tutorLanding/BenefitsBar";
import FAQs from "@/components/tutorLanding/Faqs";
import FinalCallToAction from "@/components/tutorLanding/FinalCTA";
import Footer from "@/components/tutorLanding/Footer";
import Hero from "@/components/tutorLanding/Hero";

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
