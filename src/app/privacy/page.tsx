"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
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

  const markdownComponents: Components = {
    h1: ({ children }) => (
      <h1 className="mi-text-title-lg text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mi-text-title text-white mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mi-text-subtitle text-white mt-6">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mi-text-body text-white/75 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-white/75 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-white/75 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="mi-text-body text-white/75">{children}</li>
    ),
    a: ({ children, ...props }) => (
      <a {...props} className="text-white underline underline-offset-4">
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="text-white">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-white/30 pl-4 text-white/70">
        {children}
      </blockquote>
    ),
  };

  return (
    <section className="mi-section px-4">
      <div className="max-w-4xl mx-auto mi-surface-dark rounded-3xl p-6 md:p-10">
        <header className="mi-section-header">
          <p className="mi-text-caption text-white/60">Legal</p>
          <h1 className="mi-text-title-lg text-white">
            Politica de privacidad
          </h1>
          <p className="mi-text-body text-white/70 max-w-2xl">
            Transparencia sobre como usamos y protegemos los datos.
          </p>
        </header>

        <article className="mi-stack-lg">
        {isLoading && <p>Cargando...</p>}
        {error && <p className="text-red-500 font-semibold">{error}</p>}
        {!isLoading && !error && (
          <ReactMarkdown
            remarkPlugins={remarkGfm ? [remarkGfm] : []}
            components={markdownComponents}
          >
            {markdown}
          </ReactMarkdown>
        )}
        </article>
      </div>
    </section>
  );
};

export default PrivacyPolicyDisplay;
