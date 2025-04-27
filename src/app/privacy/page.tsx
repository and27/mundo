"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PrivacyPolicyDisplay: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/legal/privacy.md")
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
        console.error("Error fetching privacy policy:", err);
        setError(
          "No se pudo cargar la política de privacidad en este momento."
        );
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
          <ReactMarkdown remarkPlugins={remarkGfm ? [remarkGfm] : []}>
            {markdown}
          </ReactMarkdown>
        )}
      </article>
    </div>
  );
};

export default PrivacyPolicyDisplay;
