"use client";

import React, { useState } from "react";
import { Lightbulb, Sparkles, MessageCircle, Send, Clock } from "lucide-react";
import { SuggestionCard } from "./SuggestionCard";
import { getSuggestionsByMode } from "../../lib/suggestionsConfig";
import { TextareaWithCounter } from "./TextAreaWithCounter";
import { useQueryStore } from "@/store/useQueryStore";
import { useModeStore } from "@/store/useModeState";
import ContextPanel, { ContextData } from "./ContextPanel";

interface InputFormProps {
  isLoading: boolean;
  onSubmit: (query: string) => void;
  maxChars?: number;
  showLoadingDetails?: boolean;
}

export default function InputForm({
  isLoading,
  onSubmit,
  maxChars = 500,
}: InputFormProps) {
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  const { mode } = useModeStore();
  const isSchoolMode = mode === "educator"; // Derived value

  const [context, setContext] = useState<ContextData | null>(null);
  console.log(context);
  const setOriginalQuery = useQueryStore((state) => state.setOriginalQuery);

  const suggestions = getSuggestionsByMode(isSchoolMode, 4);

  const placeholder = isSchoolMode
    ? "Ejemplo: Varios estudiantes de mi clase muestran ansiedad antes de los exámenes. Algunos se quedan paralizados, otros lloran, y otros se vuelven muy inquietos..."
    : "Ejemplo: Mi hijo de 4 años tiene miedo a la oscuridad y no quiere dormir solo. Se despierta llorando en la madrugada y viene a nuestra cama...";

  const buttonText = isSchoolMode
    ? "Generar Cuento para Educadores MIM"
    : "Generar Cuento Emocional MIM";

  const successMessage = isSchoolMode
    ? "Recibirás una cuento adaptado para aplicación grupal en el aula"
    : "Recibirás un cuento personalizado basada en la metodología MIM";

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim() && !isLoading) {
      setOriginalQuery(query.trim());
      onSubmit(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {!query && !isFocused && (
        <div className="px-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm md:text-lg font-semibold text-slate-800">
              Sugerencias populares
            </h3>
          </div>
          <p className="text-slate-600 text-sm md:text-base mb-4">
            Puedes empezar con alguna de estas consultas frecuentes o escribir
            tu propia pregunta.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.text}
                suggestion={suggestion.text}
                onClick={handleSuggestionClick}
                icon={suggestion.icon}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <ContextPanel onContextChange={setContext} />
        <div
          className={`bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl overflow-hidden transition-all duration-300 ${
            isFocused
              ? "border-indigo-300 shadow-xl scale-[1.01]"
              : "hover:border-indigo-200"
          } ${isLoading ? "opacity-60" : ""}`}
        >
          <div className="p-6">
            <div className="flex flex-col gap-3 mb-5">
              <div className="flex flex-start items-center gap-3 ">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm md:text-lg text-lg font-semibold text-slate-800">
                  Describe tu situación
                </h3>
              </div>
              <p className="text-sm md:text-base text-slate-600">
                Comparte los detalles para recibir un cuento personalizado
              </p>
            </div>

            <TextareaWithCounter
              value={query}
              onChange={setQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              disabled={isLoading}
              maxChars={maxChars}
            />
          </div>
        </div>

        <button
          onClick={handleFormSubmit}
          disabled={isLoading || !query.trim()}
          className={`mx-3 px-3 md:px-5 md:mx-0 md:w-full mt-6 py-4 text-base font-semibold rounded-lg transition-all duration-300 relative overflow-hidden group ${
            isLoading || !query.trim()
              ? "bg-slate-400 text-slate-600 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          }`}
        >
          {!isLoading && query.trim() && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          )}

          <div className=" relative flex items-center justify-center gap-3">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Creando tu cuento personalizado...</span>
                <Clock className="w-4 h-4 opacity-70" />
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>{buttonText}</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </div>
        </button>

        {query.trim() && !isLoading && (
          <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lightbulb className="w-3 h-3 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-indigo-800 font-medium mb-1">
                  ¡Perfecto! Tu consulta está lista
                </p>
                <p className="text-xs text-indigo-600">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
