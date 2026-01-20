import HeroSection from "@/components/landing/HeroSection";
import WhatIsSection from "@/components/landing/WhatIsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import BenefitsBar from "@/components/landing/BenefitsBar";
import FAQsComponent from "@/components/landing/FAQs";
import FinalCallToAction from "@/components/landing/FinalCallToAction";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <Link href="/" aria-label="Ir al inicio">
          <Image
            src="/images/logo-mundo.png"
            width={140}
            height={140}
            alt="Mundo Interior Logo"
            priority
          />
        </Link>
      </div>
      <HeroSection />
      <BenefitsBar />
      <WhatIsSection />
      <HowItWorksSection />
      <FAQsComponent />
      <FinalCallToAction />
    </main>
  );
}
