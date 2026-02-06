"use client";

import { Clock } from "lucide-react";

export interface MoodEntry {
  day: string;
  emotionName?: string;
  intensity?: number;
  color: string;
}

interface MoodTimelineProps {
  moods: MoodEntry[];
  childName: string;
}

export function MoodTimeline({ moods, childName }: MoodTimelineProps) {
  if (moods.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
        <Clock className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <p className="text-slate-600 font-medium">
          Sin registros emocionales para {childName}
        </p>
        <p className="mi-text-caption text-slate-500 mt-1">
          Los registros aparecerán al completar viajes interiores
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {moods.map((mood, index) => (
          <div
            key={index}
            className="flex flex-col items-center mi-text-body-sm text-slate-600 group cursor-help"
            title={`${mood.day}: ${mood.emotionName || "Sin registro"} ${
              mood.intensity ? `(${mood.intensity}/5)` : ""
            }`}
          >
            <div
              className="w-12 h-12 rounded-full mb-2 border-2 border-white shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center"
              style={{ backgroundColor: mood.color }}
            >
              {mood.intensity && (
                <span className="mi-text-body-sm text-white font-bold">
                  {mood.intensity}
                </span>
              )}
            </div>
            <span className="font-medium">{mood.day}</span>
            {mood.emotionName && (
              <span className="mi-text-caption text-slate-500 text-center max-w-16 truncate">
                {mood.emotionName}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

