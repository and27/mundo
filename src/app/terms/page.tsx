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

  const markdownComponents = {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="mi-text-title-lg text-white">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="mi-text-title text-white mt-8">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="mi-text-subtitle text-white mt-6">{children}</h3>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
      <p className="mi-text-body text-white/75 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside text-white/75 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside text-white/75 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
      <li className="mi-text-body text-white/75">{children}</li>
    ),
    a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
      <a href={href} className="text-white underline underline-offset-4">
        {children}
      </a>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="text-white">{children}</strong>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
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
            Terminos y condiciones
          </h1>
          <p className="mi-text-body text-white/70 max-w-2xl">
            Condiciones para el uso responsable de Mundo Interior.
          </p>
        </header>

        <article className="mi-stack-lg">
        {isLoading && <p>Cargando...</p>}
        {error && <p className="text-red-500 font-semibold">{error}</p>}
        {!isLoading && !error && (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {markdown}
          </ReactMarkdown>
        )}
        </article>
      </div>
    </section>
  );
};

export default TermsAndConditionsDisplay;
