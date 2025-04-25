"use client";

import LastJourneys from "@/components/userHome/LastJourneys";
import UserHero from "@/components/userHome/UserHero";

export default function Dashboard() {
  return (
    <main className="px-4 md:px-8 min-h-screen text-white max-w-4xl mx-auto">
      <UserHero />
      <LastJourneys />
      {/* <Forest /> */}
      {/*  <FavoriteJourneys />
        <Recommended /> */}
      {/* <MoodTracker /> */}
      {/* <QuickStarButtons /> */}
    </main>
  );
}
