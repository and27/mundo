import React from "react";

// Componente para mostrar ejemplos de tipografía
const TypographyExample = ({
  className,
  children,
  label,
  copyCode,
}: {
  className: string;
  children: React.ReactNode;
  label: string;
  copyCode?: string;
}) => (
  <div className="mb-6 group">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-slate-400 font-mono">{label}</p>
      {copyCode && (
        <button
          onClick={() => navigator.clipboard.writeText(copyCode)}
          className="opacity-0 group-hover:opacity-100 text-xs text-indigo-400 hover:text-indigo-300 transition-opacity"
        >
          Copiar
        </button>
      )}
    </div>
    <div className={className}>{children}</div>
    {copyCode && (
      <code className="text-xs text-slate-500 mt-1 block">{copyCode}</code>
    )}
  </div>
);

const Typography = () => {
  return (
    <div className="space-y-8">
      <section className="section-container p-8">
        <h2 className="text-3xl font-bold mb-6">Sistema Tipográfico</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Jerarquía Principal */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Jerarquía de Textos</h3>

            <TypographyExample
              className="text-6xl font-bold text-gradient-primary"
              label="H1 - Título Principal"
              copyCode="text-6xl font-bold text-gradient-primary"
            >
              Mundo Interior
            </TypographyExample>

            <TypographyExample
              className="text-4xl font-bold text-white"
              label="H2 - Título de Sección"
              copyCode="text-4xl font-bold text-white"
            >
              Bienestar Emocional
            </TypographyExample>

            <TypographyExample
              className="text-2xl font-semibold text-slate-200"
              label="H3 - Subtítulo"
              copyCode="text-2xl font-semibold text-slate-200"
            >
              Herramientas para familias
            </TypographyExample>

            <TypographyExample
              className="text-xl font-medium text-slate-300"
              label="H4 - Texto Destacado"
              copyCode="text-xl font-medium text-slate-300"
            >
              Metodología MIM
            </TypographyExample>

            <TypographyExample
              className="text-base text-slate-300"
              label="Body - Texto Principal"
              copyCode="text-base text-slate-300"
            >
              Texto base regular para párrafos y contenido principal de la
              aplicación. Perfecto para descripciones largas y contenido de
              lectura.
            </TypographyExample>

            <TypographyExample
              className="text-sm text-slate-400"
              label="Small - Texto Secundario"
              copyCode="text-sm text-slate-400"
            >
              Texto pequeño para metadatos, fechas, información secundaria y
              ayudas contextuales.
            </TypographyExample>

            <TypographyExample
              className="text-xs font-mono text-slate-500"
              label="Code - Texto Monoespaciado"
              copyCode="text-xs font-mono text-slate-500"
            >
              {` const message = "Código y datos técnicos";`}
            </TypographyExample>
          </div>

          {/* Utilidades Especiales */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Utilidades Especiales
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-400 mb-2">
                  Gradiente Primario
                </p>
                <p className="text-3xl font-bold text-gradient-primary mb-2">
                  Mundo Interior
                </p>
                <code className="text-xs text-slate-500 font-mono block bg-black/30 p-2 rounded">
                  {` className="text-gradient-primary"`}
                </code>
              </div>

              <div>
                <p className="text-sm text-slate-400 mb-2">
                  Truncate - Línea única
                </p>
                <p className="text-base text-slate-300 truncate mb-2 bg-slate-800/30 p-2 rounded">
                  Este es un texto muy largo que se cortará con puntos
                  suspensivos cuando no tenga espacio suficiente
                </p>
                <code className="text-xs text-slate-500 font-mono block bg-black/30 p-2 rounded">
                  {` className="truncate"`}
                </code>
              </div>

              <div>
                <p className="text-sm text-slate-400 mb-2">
                  Line Clamp - Múltiples líneas
                </p>
                <p className="text-base text-slate-300 line-clamp-2 mb-2 bg-slate-800/30 p-2 rounded">
                  Este es un ejemplo de texto que se limitará a exactamente dos
                  líneas usando line-clamp-2. El texto adicional será cortado
                  automáticamente con puntos suspensivos al final.
                </p>
                <code className="text-xs text-slate-500 font-mono block bg-black/30 p-2 rounded">
                  {` className="line-clamp-2"`}
                </code>
              </div>

              <div>
                <p className="text-sm text-slate-400 mb-2">Colores de Estado</p>
                <div className="space-y-2">
                  <p className="text-green-400 font-medium">
                    ✓ Mensaje de éxito
                  </p>
                  <p className="text-yellow-400 font-medium">
                    ⚠ Mensaje de advertencia
                  </p>
                  <p className="text-red-400 font-medium">✗ Mensaje de error</p>
                  <p className="text-blue-400 font-medium">
                    ℹ Mensaje informativo
                  </p>
                </div>
                <code className="text-xs text-slate-500 font-mono block bg-black/30 p-2 rounded mt-2">
                  text-green-400 | text-yellow-400 | text-red-400 |
                  text-blue-400
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Pesos de Fuente */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Pesos de Fuente
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-lg font-normal text-white mb-1">Normal</p>
              <code className="text-xs text-slate-400">font-normal</code>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-white mb-1">Medium</p>
              <code className="text-xs text-slate-400">font-medium</code>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-white mb-1">Semibold</p>
              <code className="text-xs text-slate-400">font-semibold</code>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white mb-1">Bold</p>
              <code className="text-xs text-slate-400">font-bold</code>
            </div>
          </div>
        </div>

        {/* Tamaños de Fuente */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Tamaños de Fuente
          </h3>
          <div className="space-y-3">
            {[
              { size: "text-xs", label: "0.75rem (12px)" },
              { size: "text-sm", label: "0.875rem (14px)" },
              { size: "text-base", label: "1rem (16px)" },
              { size: "text-lg", label: "1.125rem (18px)" },
              { size: "text-xl", label: "1.25rem (20px)" },
              { size: "text-2xl", label: "1.5rem (24px)" },
              { size: "text-3xl", label: "1.875rem (30px)" },
              { size: "text-4xl", label: "2.25rem (36px)" },
              { size: "text-5xl", label: "3rem (48px)" },
              { size: "text-6xl", label: "3.75rem (60px)" },
            ].map(({ size, label }) => (
              <div key={size} className="flex items-center gap-4">
                <div className={`${size} text-white font-medium`}>
                  Ejemplo de texto
                </div>
                <code className="text-xs text-slate-400 font-mono">
                  {size} - {label}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* CSS Variables para Copy/Paste */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            CSS para Copy/Paste
          </h3>
          <div className="bg-black/50 p-4 rounded-xl overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono">
              {`/* Gradiente de texto primario */
.text-gradient-primary {
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-600) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Line clamp utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Truncate */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Typography;
