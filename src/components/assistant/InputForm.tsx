"use client";

import React, { useState } from "react";
import {
  Lightbulb,
  Sparkles,
  MessageCircle,
  Send,
  Clock,
  ChevronDown,
  Settings,
} from "lucide-react";
import { SuggestionCard } from "./SuggestionCard";
import { getSuggestionsByMode } from "../../lib/suggestionsConfig";
import { TextareaWithCounter } from "./TextAreaWithCounter";
import { useQueryStore } from "@/store/useQueryStore";
import { useModeStore } from "@/store/useModeState";
import ContextPanel, { ContextData } from "./ContextPanel";
import { BaseModal } from "../ui/BaseModal";
import Button from "../ui/Button";

interface InputFormProps {
  isLoading: boolean;
  onSubmit: (query: string) => void;
  maxChars?: number;
}

export default function InputForm({
  isLoading,
  onSubmit,
  maxChars = 500,
}: InputFormProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [context, setContext] = useState<ContextData | null>(null);
  //todo use context
  if (false) console.log(context);
  const { mode } = useModeStore();
  const isSchoolMode = mode === "school";
  const setOriginalQuery = useQueryStore((s) => s.setOriginalQuery);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const suggestions = getSuggestionsByMode(isSchoolMode, 4);

  const placeholder = isSchoolMode
    ? "Ejemplo: Varios estudiantes de mi clase muestran ansiedad antes de los exámenes..."
    : "Ejemplo: Mi hijo de 4 años tiene miedo a la oscuridad y no quiere dormir solo...";

  const buttonText = isSchoolMode
    ? "Generar cuento para educadores"
    : "Generar cuento emocional";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    setOriginalQuery(query.trim());
    onSubmit(query.trim());
  };

  return (
    <div className="max-w-4xl px-5 md:px-20 mi-stack-md">
      {/* Suggestions header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-3 flex items-center gap-3 text-sm text-neutral-600 hover:text-neutral-800 transition"
      >
        <div className="w-8 h-8 rounded-lg mi-accent-gradient flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold">Ideas para empezar</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="mi-stack-md">
          <p className="text-neutral-600">
            Puedes comenzar con alguna de estas consultas frecuentes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestions.map((s) => (
              <SuggestionCard
                key={s.text}
                suggestion={s.text}
                onClick={(t) => {
                  setQuery(t);
                  setIsExpanded(false);
                }}
                icon={s.icon}
              />
            ))}
          </div>
        </div>
      )}

      {/* Input card */}
      <form
        onSubmit={handleSubmit}
        className={[
          "rounded-2xl transition-all",
          "bg-white/90 border border-white/60 backdrop-blur-sm",
          isFocused ? "shadow-lg border-primary-300" : "",
          isLoading ? "opacity-60" : "",
        ].join(" ")}
      >
        <div className="p-6 mi-stack-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg mi-accent-gradient flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-neutral-800">
              Crea un cuento personalizado
            </h3>
          </div>

          <p className="text-neutral-600 text-sm">
            A partir de lo que nos cuentes, crearemos una historia para
            acompañar esa emoción.
          </p>

          <div>
            <TextareaWithCounter
              value={query}
              onChange={setQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              disabled={isLoading}
              maxChars={maxChars}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsContextOpen(true)}
            >
              <span className="font-semibold">Agregar detalles (opcional)</span>
            </Button>
          </div>
        </div>
      </form>

      {/* CTA */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || !query.trim()}
        className={[
          "w-full py-4 rounded-xl font-semibold transition-all",
          isLoading || !query.trim()
            ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            : "mi-cta-primary hover:shadow-lg",
        ].join(" ")}
      >
        <div className="flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Creando tu cuento…</span>
              <Clock className="w-4 h-4 opacity-70" />
            </>
          ) : (
            <>
              <span>{buttonText}</span>
            </>
          )}
        </div>
      </button>
      <BaseModal open={isContextOpen} onOpenChange={setIsContextOpen}>
        <div className="bg-white rounded-2xl p-6 mi-stack-md">
          <header className="mi-stack-sm">
            <h3 className="text-lg font-semibold text-neutral-800">
              Contexto adicional
            </h3>
            <p className="text-sm text-neutral-600">
              Esta información ayuda a personalizar mejor el cuento.
            </p>
          </header>

          <ContextPanel onContextChange={setContext} />

          <div className="flex justify-end gap-3 pt-4">
            <Button onClick={() => setIsContextOpen(false)}>Cerrar</Button>
          </div>
        </div>
      </BaseModal>
    </div>
  );
}
