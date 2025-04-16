"use client";

import UserHero from "@/components/userHome/UserHero";
import LastJourneys from "@/components/userHome/LastJourneys";
import Forest from "@/components/userHome/Forest";
import FavoriteJourneys from "@/components/userHome/FavoriteJourneys";
import Recommended from "@/components/userHome/Recommended";

export default function Dashboard() {
  return (
    <main className="px-4 md:px-8 min-h-screen  text-white">
      <UserHero />
      {/* <Forest /> */}
      {/* <LastJourneys />
        <FavoriteJourneys />
        <Recommended /> */}
      {/* <MoodTracker /> */}
      {/* <QuickStarButtons /> */}
    </main>
  );
}
