"use client";

import React, { useState, FormEvent, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { ActivityGuideline, ChatMessage as Message } from "@/types/ai"; // Importación singular
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { motion } from "framer-motion";
import Image from "next/image";

const AiGuideChat = () => {
  const initialMessageId = `assistant-${Date.now()}`;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: initialMessageId,
      role: "assistant",
      text: "¡Hola! Soy Amaru, tu guía en Mundo Interior. Estoy aquí para ayudarte a encontrar los mejores viajes y recursos para tus exploradores. ¿Sobre qué emoción o tema necesitas orientación hoy?",
      timestamp: Date.now(),
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const getAgentResponse = (
    query: string
  ): { text?: string; resources?: ActivityGuideline[] } => {
    // Tipo de retorno usa singular
    const lowerQuery = query.toLowerCase().trim();

    const autoestimaKeywords = [
      "autoestima",
      "confianza",
      "seguridad",
      "valor personal",
      "sentirse suficiente",
      "quererme",
      "aceptarme",
    ];

    if (
      lowerQuery.includes("ansiedad") ||
      lowerQuery.includes("nervios") ||
      lowerQuery.includes("preocupacion")
    ) {
      return {
        text: "¡Entendido! Para trabajar la ansiedad, he encontrado estas directrices que te podrían ser muy útiles:",
        resources: [
          {
            id: "explorando-la-ansiedad-tutor",
            title: "Directrices: El Misterio de las Mariposas Inquietas",
            description:
              "Objetivos, preparación y cómo guiar la historia interactiva sobre la ansiedad.",
            linkToDetail:
              "/parentDashboard/fichas/explorando-la-ansiedad-tutor", // Campo corregido
            type: "Ficha para Tutor",
            emotionalActivityPreview:
              "Cuento interactivo para niños sobre calmar las 'mariposas'.",
            imageUrl: "/images/covers/mariposas_cover_placeholder.png",
            tags: ["Ansiedad", "Calma", "Niños 6-8"],
          },
        ],
      };
    } else if (
      lowerQuery.includes("tristeza") ||
      lowerQuery.includes("pena") ||
      lowerQuery.includes("depresion")
    ) {
      return {
        text: "Para la tristeza, te recomiendo explorar estas directrices de actividad:",
        resources: [
          {
            id: "ficha-tristeza-tutor-1",
            title: "Directrices: Navegando la Nube Gris",
            description:
              "Consejos y actividades para acompañar la tristeza en exploradores.",
            linkToDetail: "/parentDashboard/fichas/navegando-tristeza-tutor", // Campo corregido
            type: "Ficha para Tutor",
            emotionalActivityPreview:
              "Actividades y cuento de apoyo para entender la tristeza.",
            imageUrl: "/images/covers/nube_gris_cover_placeholder.png",
            tags: ["Tristeza", "Acompañamiento", "Emociones"],
          },
        ],
      };
    } else if (
      autoestimaKeywords.some((keyword) => lowerQuery.includes(keyword))
    ) {
      return {
        text: "¡Absolutamente! Para ayudar a tu explorador a descubrir su valor y a fortalecer su autoestima, tengo estas directrices para una historia muy especial: 'El Reflejo de Yachay'.",
        resources: [
          {
            id: "el-reflejo-de-yachay-tutor",
            title: "Directrices: El Reflejo de Yachay",
            description:
              "Una guía para ayudar a tu explorador a reconocer su valor único y fortalecer su autoestima.",
            linkToDetail: "/parentDashboard/fichas/el-reflejo-de-yachay-tutor", // Campo corregido
            type: "Ficha para Tutor",
            emotionalActivityPreview:
              "Cuento interactivo sobre autoconfianza y valor propio.",
            imageUrl: "/images/covers/yachay_cover_placeholder.png",
            tags: ["Autoestima", "Confianza", "Valor personal", "Niños 4-10"],
          },
        ],
      };
    }

    return {
      text: "Aún estoy aprendiendo y organizando todos los tesoros de Mundo Interior. Por ahora, puedo ayudarte mejor si buscas por emociones clave como 'ansiedad', 'tristeza', o 'autoestima'. ¡También puedes visitar el Centro de Guías para explorar más!",
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = inputQuery.trim();
    if (!trimmedQuery || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmedQuery,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInputQuery("");

    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 600)
    );

    const agentResponseData = getAgentResponse(trimmedQuery);
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      text: agentResponseData.text,
      resources: agentResponseData.resources,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
    inputRef.current?.focus();
  };

  return (
    <div className="glass-strong sm:p-5 rounded-2xl shadow-xl flex flex-col h-[60vh] max-h-[600px] sm:max-h-[650px] border border-white/10">
      <div className="flex-grow overflow-y-auto pr-2 space-y-2.5 sm:space-y-3 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar-thumb-rounded-full">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start gap-2 sm:gap-3 my-2.5 sm:my-3"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-primary flex items-center justify-center overflow-hidden shadow-md mt-1">
              <Image
                src="/images/guides/amaru_avatar.png"
                alt="Amaru"
                width={36}
                height={36}
                className="object-contain scale-105"
              />
            </div>
            <div className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-md glass-light border border-white/5 text-foreground rounded-bl-none">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-foreground/40 rounded-full animate-pulse animation-delay-100"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-foreground/40 rounded-full animate-pulse animation-delay-200"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-foreground/40 rounded-full animate-pulse animation-delay-300"></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 sm:gap-3 items-stretch"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Pregunta a Amaru..."
            className="flex-grow p-2.5 sm:p-3 rounded-lg bg-black/30 border border-white/20 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-1 focus:ring-color-accent-magic transition-all text-sm sm:text-base"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-gradient-primary text-white font-semibold p-2.5 sm:p-3 rounded-lg hover:brightness-110 transition-all duration-300 shadow-md disabled:opacity-60 disabled:hover:brightness-100 flex items-center justify-center aspect-square"
            disabled={isLoading || !inputQuery.trim()}
            aria-label="Enviar mensaje"
          >
            {isLoading ? (
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
            ) : (
              <HiOutlinePaperAirplane className="w-4 h-4 sm:w-5 sm:h-5 transform rotate-90" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiGuideChat;
