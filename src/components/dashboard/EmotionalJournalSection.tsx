"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import {
  ExplorerNotFound,
  NoExplorers,
} from "../../components/dashboard/journal/EmptyStates";
import { JournalFooter } from "../../components/dashboard/journal/JournalFooter";
import { ExplorerJournalCard } from "./journal/ExploreJournalCard";

interface MoodEntry {
  day: string;
  emotionName?: string;
  intensity?: number;
  notes?: string;
  color: string;
}

interface ChildSummary {
  id: string;
  name: string;
  avatarUrl?: string;
  lastActivity: string;
  lastActivityDetail?: string;
  recentMoods: MoodEntry[];
  emotionalScore?: number;
  growthTrend?: "up" | "down" | "stable";
  totalActivities?: number;
  favoriteEmotion?: string;
}

// Mock data - esto vendría de tu API/store
const mockChildren: ChildSummary[] = [
  {
    id: "child-1",
    name: "Lucía Exploradora",
    avatarUrl: "/guides/yachay-transparent.png",
    lastActivity: "El Sendero del Puma Valiente",
    lastActivityDetail: "Emoción final: Calma",
    emotionalScore: 85,
    growthTrend: "up",
    totalActivities: 12,
    favoriteEmotion: "Feliz",
    recentMoods: [
      { day: "Lun", color: "#6B7280", emotionName: "Neutral", intensity: 3 },
      { day: "Mar", color: "#F59E0B", emotionName: "Contenta", intensity: 4 },
      { day: "Mié", color: "#3B82F6", emotionName: "Tranquila", intensity: 4 },
      { day: "Jue", color: "#8B5CF6", emotionName: "Curiosa", intensity: 5 },
      { day: "Hoy", color: "#10B981", emotionName: "Feliz", intensity: 5 },
    ],
  },
  {
    id: "child-2",
    name: "Mateo Curioso",
    avatarUrl: "/guides/kuntur-transparent.png",
    lastActivity: "Respiración del Cóndor",
    lastActivityDetail: "Se sintió más relajado",
    emotionalScore: 72,
    growthTrend: "up",
    totalActivities: 8,
    favoriteEmotion: "Concentrado",
    recentMoods: [
      { day: "Mié", color: "#EF4444", emotionName: "Frustrado", intensity: 2 },
      { day: "Jue", color: "#3B82F6", emotionName: "En Paz", intensity: 4 },
      {
        day: "Hoy",
        color: "#1D4ED8",
        emotionName: "Concentrado",
        intensity: 4,
      },
    ],
  },
];

export default function EmotionalJourneySection() {
  const searchParams = useSearchParams();
  const selectedChildId = searchParams.get("childId");
  // const [selectedPeriod, setSelectedPeriod] = useState("week");
  // const [showInsights, setShowInsights] = useState(false);
  // console.log(selectedPeriod);
  // Filtrar exploradores según selección
  const childrenToDisplay = selectedChildId
    ? mockChildren.filter((child) => child.id === selectedChildId)
    : mockChildren;

  // Handlers
  // const handlePeriodChange = (period: string) => {
  //   setSelectedPeriod(period);
  // };

  // const handleToggleInsights = () => {
  //   setShowInsights(!showInsights);
  // };

  // Estados de error/vacío
  if (selectedChildId && childrenToDisplay.length === 0) {
    return <ExplorerNotFound />;
  }

  if (mockChildren.length === 0) {
    return <NoExplorers />;
  }

  // Preparar props para componentes
  // const headerProps = {
  //   selectedChildId,
  //   childName:
  //     childrenToDisplay.length === 1 ? childrenToDisplay[0].name : undefined,
  //   totalExplorers: childrenToDisplay.length,
  //   selectedPeriod,
  //   onPeriodChange: handlePeriodChange,
  //   showInsights,
  //   onToggleInsights: handleToggleInsights,
  // };

  const isDetailView = Boolean(selectedChildId);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* <JournalHeader {...headerProps} /> */}

      {/* {showInsights && <InsightsPanel />} */}

      <div className="space-y-6">
        {childrenToDisplay.map((child) => (
          <ExplorerJournalCard
            key={child.id}
            child={child}
            isDetailView={isDetailView}
          />
        ))}
      </div>

      {!selectedChildId && <JournalFooter />}
    </div>
  );
}
