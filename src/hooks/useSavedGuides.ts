import { useState, useEffect } from "react";
import { GuideWithCharacter } from "@/types/ai";

export interface SavedGuide extends GuideWithCharacter {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
  duration: string;
}

const STORAGE_KEY = "mundo-interior-saved-guides";

export function useSavedGuides() {
  const [savedGuides, setSavedGuides] = useState<SavedGuide[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar guías del localStorage al inicializar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const guides = JSON.parse(stored);
        setSavedGuides(guides);
      }
    } catch (error) {
      console.error("Error loading saved guides:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Guardar guías en localStorage cuando cambien
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedGuides));
      } catch (error) {
        console.error("Error saving guides:", error);
      }
    }
  }, [savedGuides, isLoaded]);

  // Función para guardar una nueva guía
  const saveGuide = (guide: GuideWithCharacter, customTitle?: string) => {
    // Generar título automático si no se proporciona
    const title = customTitle || generateTitleFromGuide(guide);

    const savedGuide: SavedGuide = {
      ...guide,
      id: generateId(),
      title,
      summary: generateSummary(guide),
      createdAt: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      duration: estimateReadingTime(guide),
    };

    setSavedGuides((prev) => [savedGuide, ...prev]); // Más recientes primero
    return savedGuide.id;
  };

  // Función para eliminar una guía
  const deleteGuide = (id: string) => {
    setSavedGuides((prev) => prev.filter((guide) => guide.id !== id));
  };

  // Función para obtener una guía por ID
  const getGuide = (id: string) => {
    return savedGuides.find((guide) => guide.id === id);
  };

  // Función para actualizar título de guía
  const updateGuideTitle = (id: string, newTitle: string) => {
    setSavedGuides((prev) =>
      prev.map((guide) =>
        guide.id === id ? { ...guide, title: newTitle } : guide
      )
    );
  };

  return {
    savedGuides,
    isLoaded,
    saveGuide,
    deleteGuide,
    getGuide,
    updateGuideTitle,
  };
}

// Utilidades
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function generateTitleFromGuide(guide: GuideWithCharacter): string {
  // Intentar extraer el tema principal de la metáfora o conversación
  if (guide.metaphor?.content) {
    const words = guide.metaphor.content.split(" ").slice(0, 6);
    return (
      words.join(" ") +
      (guide.metaphor.content.split(" ").length > 6 ? "..." : "")
    );
  }

  if (guide.conversation?.phrases && guide.conversation.phrases.length > 0) {
    const firstPhrase = guide.conversation.phrases[0];
    const words = firstPhrase.split(" ").slice(0, 6);
    return words.join(" ") + (firstPhrase.split(" ").length > 6 ? "..." : "");
  }

  return `Guía ${new Date().toLocaleDateString()}`;
}

function generateSummary(guide: GuideWithCharacter): string {
  const elements = [];

  if (guide.metaphor?.title) {
    elements.push(`Metáfora: ${guide.metaphor.title}`);
  }

  if (guide.conversation?.phrases?.length) {
    elements.push(`${guide.conversation.phrases.length} frases de apoyo`);
  }

  if (guide.activity?.title) {
    elements.push(`Actividad: ${guide.activity.title}`);
  }

  return elements.join(" • ") || "Guía emocional personalizada";
}

function estimateReadingTime(guide: GuideWithCharacter): string {
  let wordCount = 0;

  if (guide.metaphor?.content) {
    wordCount += guide.metaphor.content.split(" ").length;
  }

  if (guide.conversation?.phrases) {
    wordCount += guide.conversation.phrases.join(" ").split(" ").length;
  }

  if (guide.activity?.description) {
    wordCount += guide.activity.description.split(" ").length;
  }

  const minutes = Math.max(1, Math.ceil(wordCount / 200)); // 200 palabras por minuto
  return `${minutes} min lectura`;
}
