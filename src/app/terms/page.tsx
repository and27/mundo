"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const TermsAndConditionsDisplay: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/legal/terms.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al cargar el archivo: ${response.statusText}`);
        }
        return response.text();
      })
      .then((text) => {
        setMarkdown(text);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching terms:", err);
        setError("No se pudieron cargar los términos y condiciones.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-black/30 backgropd-blur-md p-4 md:p-6 lg:p-8 max-w-3xl mx-auto text-left text-foreground">
      <article className="markdown-content">
        {isLoading && <p>Cargando...</p>}
        {error && <p className="text-red-500 font-semibold">{error}</p>}
        {!isLoading && !error && (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        )}
      </article>
    </div>
  );
};

export default TermsAndConditionsDisplay;
