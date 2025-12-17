import HeroSection from "@/components/marketing/HeroSection";
import WhatIsSection from "@/components/marketing/WhatIsSection";
import HowItWorksSection from "@/components/marketing/HowItWorksSection";
import BenefitsBar from "@/components/marketing/BenefitsBar";
import FAQs from "@/components/marketing/FAQs";
import FinalCallToAction from "@/components/marketing/FinalCallToAction";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BenefitsBar />
      <WhatIsSection />
      <HowItWorksSection />
      <FAQs />
      <FinalCallToAction />
    </main>
  );
}
