"use client";

import React, { useState, FormEvent, useEffect, useRef } from "react";
import ChatMessage, { Message } from "./ChatMessage";

const AiGuideChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy Amaru, tu guía en Mundo Interior. Estoy aquí para ayudarte a encontrar los mejores viajes y recursos para tus exploradores. ¿Qué te gustaría hacer o sobre qué tema te gustaría aprender hoy?",
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: inputQuery };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInputQuery("");

    // --- Simulación de llamada a la API de la IA ---
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // La respuesta real vendría de tu backend.
    // Aquí simulamos una respuesta basada en la pregunta.
    const mockResponse: Message = {
      role: "assistant",
      content: `¡Entendido! Buscando recursos sobre "${userMessage.content}". He encontrado esto que podría ser muy útil:`,
      resources: [
        {
          id: "primerViaje",
          title: "Guía para su Primer Viaje: El Sendero del Puma",
          description:
            "Todo para facilitar su primera experiencia y hablar sobre la valentía.",
          imageUrl: "/images/covers/sendero_puma_cover.png",
          type: "Guía de Viaje",
          tags: ["Autoestima", "Valentía"],
          actionLink:
            "/parentDashboard?section=centroGuias&tab=guias-viajes&storyId=sendero-puma",
          actionButtonLabel: "Ver Guía",
        },
        {
          id: "temaAnsiedad",
          title: "Recursos sobre Ansiedad Infantil",
          description:
            "Artículos y consejos prácticos para entender y apoyar a los niños.",
          imageUrl: "/images/icons/anxiety_resources_icon.png",
          type: "Artículo",
          tags: ["Ansiedad"],
          actionLink:
            "/parentDashboard?section=centroGuias&tab=conocimiento&topic=ansiedad",
          actionButtonLabel: "Aprender más",
        },
      ],
    };

    setMessages((prev) => [...prev, mockResponse]);
    setIsLoading(false);
    // --- Fin de la Simulación ---
  };

  return (
    <div className="bg-black/10 p-4 md:p-6 rounded-lg border border-condor/30 shadow-md flex flex-col h-[70vh] max-h-[700px]">
      <div className="flex-grow overflow-y-auto pr-2">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start gap-3 my-4">
            <div className="w-8 h-8 rounded-full bg-black/30 flex-shrink-0 mt-1"></div>
            <div className="p-4 rounded-lg bg-black/20 text-condor/90 animate-pulse">
              Amaru está pensando...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-4 pt-4 border-t border-condor/30">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ej: 'un cuento sobre la tristeza para un niño de 8 años'"
            className="flex-grow p-3 rounded-md border border-condor/30 bg-black/5 text-white focus:outline-none focus:ring-2 focus:ring-jaguar placeholder-condor/50 text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-jaguar hover:bg-jaguar/80 text-black font-bold py-3 px-5 rounded-md transition text-sm sm:w-auto disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiGuideChat;
