"use client";

import PersonalizedHeader from "@/components/userHome/PersonalizedHeader"; // Ajusta las rutas de importación
import DynamicSuggestion from "@/components/userHome/DynamicSuggestion";
import OverallProgress from "@/components/userHome/OverallProgress";
import MoodTracker from "@/components/userHome/MoodTracker";
import CoreNavigation from "@/components/userHome/NavigationCore";

// import MoodTrackerPreview from "@/components/userHome/MoodTrackerPreview"; // Mantén tu ruta actual

export default function ChildDashboardPage() {
  return (
    <main
      className="max-w-3xl mx-auto min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col text-white px-4 py-6 md:py-8"
      style={{
        backgroundImage: "url('/backgrounds/refugio-andino-atardecer.jpg')",
      }}
    >
      <div className="flex items-center">
        <PersonalizedHeader />
        <OverallProgress />
      </div>
      <div className="w-full flex flex-col justify-center flex-grow mt-6 md:mt-8">
        <CoreNavigation />

        <div className="max-w-3xl mx-auto w-full flex flex-col justify-center items-center gap-6 md:gap-16 mt-8 md:mt-20 px-2 md:px-0">
          <div className="w-full xl:w-auto flex flex-col xl:items-start">
            <DynamicSuggestion />
          </div>

          <div className="w-full flex flex-col gap-6 md:gap-8">
            {/* Aquí puedes decidir si MoodTrackerPreview es prominente en el dashboard */}
            {/* o si su contenido ya está bien representado al hacer clic en el ícono de Bitácora */}
            {/* Si lo incluyes, asegúrate que visualmente complemente los otros bloques */}
            <MoodTracker />
          </div>
        </div>
      </div>

      <footer className="mt-10 w-full text-center text-white/60 text-xs py-4 mt-auto">
        Mundo Interior &copy; {new Date().getFullYear()}
      </footer>
    </main>
  );
}
