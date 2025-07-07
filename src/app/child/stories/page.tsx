"use client";

import { useState } from "react";
import { Play, Heart, Clock } from "lucide-react";
import ModeToggle from "@/components/dashboard/ModeToggle";

interface Story {
  id: string;
  title: string;
  guide: string;
  duration: string;
  thumbnail: string;
  isDefault?: boolean;
  isFavorite?: boolean;
  isNew?: boolean;
}

// Data quemada para ejemplo
const stories: Story[] = [
  {
    id: "1",
    title: "El Sendero del Puma Valiente",
    guide: "Yachay Puma",
    duration: "8 min",
    thumbnail: "/backgrounds/sendero-puma.jpg",
    isDefault: true,
    isFavorite: true,
  },
  {
    id: "2",
    title: "El Río Sagrado de las Emociones",
    guide: "Amaru",
    duration: "10 min",
    thumbnail: "/backgrounds/rio-sagrado.jpg",
    isDefault: true,
  },
  {
    id: "3",
    title: "El Vuelo del Cóndor Sabio",
    guide: "Kuntur",
    duration: "7 min",
    thumbnail: "/backgrounds/vuelo-condor.jpg",
    isDefault: true,
    isNew: true,
  },
  {
    id: "4",
    title: "Mi cuento personalizado",
    guide: "Yachay Puma",
    duration: "6 min",
    thumbnail: "/backgrounds/cuento-personalizado.jpg",
    isFavorite: true,
  },
];

export default function ChildStoriesPage() {
  const [activeFilter, setActiveFilter] = useState("todos");

  const filteredStories = stories.filter((story) => {
    if (activeFilter === "favoritos") return story.isFavorite;
    if (activeFilter === "nuevos") return story.isNew;
    return true;
  });

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-amber-100 to-yellow-200">
      <div className="flex justify-between bg-gradient-to-l from-amber-500 to-yellow-600 px-6 py-8">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            ¡Hola, pequeño explorador!
          </h1>
          <p className="text-white/90 text-lg">
            ¿Qué cuento quieres escuchar hoy?
          </p>
        </div>
        <div className="bg-gray-700 h-fit rounded-md">
          <ModeToggle variant="header" />
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-amber-200 px-6 py-4 z-10">
        <div className="max-w-2xl mx-auto flex justify-center gap-2">
          {[
            { key: "todos", label: "Todos", icon: "📚" },
            { key: "favoritos", label: "Favoritos", icon: "❤️" },
            { key: "nuevos", label: "Nuevos", icon: "✨" },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.key
                  ? "bg-amber-400 text-white shadow-md"
                  : "bg-white text-amber-700 hover:bg-amber-50"
              }`}
            >
              {filter.icon} {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Feed - Single Column */}
      <div className="max-w-2xl mx-auto px-6 py-6 space-y-4">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
            onClick={() => console.log(`Playing story: ${story.id}`)}
          >
            <div className="flex items-center p-4">
              {/* Thumbnail */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
                <div
                  className="w-full h-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${story.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-1 line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-amber-600 text-sm font-medium mb-2">
                      Con {story.guide}
                    </p>
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {story.duration}
                      </span>
                      {story.isDefault && (
                        <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs">
                          Clásico
                        </span>
                      )}
                      {story.isNew && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                          ¡Nuevo!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-2 ml-4">
                    {story.isFavorite && (
                      <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                    )}
                    <div className="bg-amber-400 hover:bg-amber-500 text-white p-2 rounded-full transition-colors">
                      <Play className="w-4 h-4 fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State si no hay cuentos */}
      {filteredStories.length === 0 && (
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <div className="text-6xl mb-4">📖</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No hay cuentos aquí todavía
          </h3>
          <p className="text-gray-500">
            Pídele a papá o mamá que cree un cuento especial para ti
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-amber-600/60 text-sm">
        Mundo Interior &copy; {new Date().getFullYear()}
      </footer>
    </main>
  );
}
