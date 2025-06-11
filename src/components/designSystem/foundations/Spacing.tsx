import React from "react";

// Componente para mostrar espaciado
const SpacingExample = ({
  size,
  label,
  description,
}: {
  size: string;
  label: string;
  description?: string;
}) => (
  <div className="flex items-center gap-4 mb-3 group">
    <div
      className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded flex-shrink-0"
      style={{ width: size, height: "16px" }}
    />
    <div className="flex-1">
      <span className="text-sm font-mono text-slate-300">
        {label} = {size}
      </span>
      {description && (
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      )}
    </div>
    <button
      onClick={() => navigator.clipboard.writeText(label)}
      className="opacity-0 group-hover:opacity-100 text-xs text-indigo-400 hover:text-indigo-300 transition-opacity"
    >
      Copiar
    </button>
  </div>
);

// Componente para mostrar radios
const RadiusExample = ({
  name,
  value,
  description,
}: {
  name: string;
  value: string;
  description?: string;
}) => (
  <div className="text-center group cursor-pointer">
    <div
      className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-2 transition-transform group-hover:scale-110"
      style={{ borderRadius: value }}
    />
    <p className="text-sm font-mono text-slate-300">rounded-{name}</p>
    <p className="text-xs text-slate-500">{value}</p>
    {description && (
      <p className="text-xs text-slate-400 mt-1">{description}</p>
    )}
  </div>
);

const Spacing = () => {
  return (
    <div className="space-y-8">
      <section className="section-container p-8">
        <h2 className="text-3xl font-bold mb-6">Sistema de Espaciado</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Espacios Básicos */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Espacios Básicos</h3>
            <p className="text-sm text-slate-400 mb-6">
              Usados para padding, margin, gaps pequeños y elementos internos.
            </p>
            <SpacingExample
              size="4px"
              label="space-1"
              description="Espaciado mínimo, ideal para elementos muy juntos"
            />
            <SpacingExample
              size="8px"
              label="space-2"
              description="Espaciado pequeño entre elementos relacionados"
            />
            <SpacingExample
              size="12px"
              label="space-3"
              description="Espaciado estándar para padding interno"
            />
            <SpacingExample
              size="16px"
              label="space-4"
              description="Espaciado base más usado en la aplicación"
            />
            <SpacingExample
              size="20px"
              label="space-5"
              description="Espaciado intermedio para separaciones claras"
            />
            <SpacingExample
              size="24px"
              label="space-6"
              description="Espaciado generoso para cards y contenedores"
            />
            <SpacingExample
              size="32px"
              label="space-8"
              description="Espaciado grande para secciones"
            />
            <SpacingExample
              size="40px"
              label="space-10"
              description="Espaciado extra grande"
            />
            <SpacingExample
              size="48px"
              label="space-12"
              description="Espaciado muy grande para layouts"
            />
          </div>

          {/* Espacios Grandes */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Espacios Grandes</h3>
            <p className="text-sm text-slate-400 mb-6">
              Usados para separar secciones, layouts principales y elementos
              estructurales.
            </p>
            <SpacingExample
              size="64px"
              label="space-16"
              description="Separación entre secciones principales"
            />
            <SpacingExample
              size="80px"
              label="space-20"
              description="Espaciado de headers y footers"
            />
            <SpacingExample
              size="96px"
              label="space-24"
              description="Separación de bloques de contenido"
            />
            <SpacingExample
              size="128px"
              label="space-32"
              description="Espaciado para layouts de página"
            />
            <SpacingExample
              size="160px"
              label="space-40"
              description="Espaciado muy grande para heros"
            />
            <SpacingExample
              size="192px"
              label="space-48"
              description="Espaciado masivo para páginas especiales"
            />
          </div>
        </div>

        {/* Ejemplos de Uso */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Ejemplos de Uso en Componentes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Example */}
            <div className="bg-slate-800/50 border border-white/10 rounded-xl backdrop-blur-sm p-6">
              <h4 className="font-semibold mb-2 text-white">Card Típica</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>
                  <code>p-6</code> - Padding interno general
                </p>
                <p>
                  <code>mb-2</code> - Margen bottom del título
                </p>
                <p>
                  <code>gap-6</code> - Espacio entre cards en grid
                </p>
              </div>
            </div>

            {/* Button Example */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
              <h4 className="font-semibold mb-2">Botón</h4>
              <div className="space-y-1 text-sm opacity-90">
                <p>
                  <code>px-4 py-2</code> - Padding horizontal y vertical
                </p>
                <p>
                  <code>gap-2</code> - Espacio entre icono y texto
                </p>
              </div>
            </div>

            {/* Form Example */}
            <div className="bg-slate-800/30 border border-white/10 rounded-xl p-4">
              <h4 className="font-semibold mb-3 text-white">Formulario</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Input con p-3"
                  className="w-full bg-slate-700/50 border border-white/20 rounded-lg p-3 text-white placeholder-slate-400"
                />
                <p className="text-xs text-slate-400">
                  <code>p-3</code> para inputs, <code>space-y-3</code> entre
                  elementos
                </p>
              </div>
            </div>

            {/* Layout Example */}
            <div className="bg-slate-800/30 border border-white/10 rounded-xl p-4">
              <h4 className="font-semibold mb-3 text-white">Layout</h4>
              <div className="text-sm text-slate-400 space-y-1">
                <p>
                  <code>p-6 md:p-12</code> - Padding responsive
                </p>
                <p>
                  <code>space-y-8</code> - Entre secciones
                </p>
                <p>
                  <code>mb-12</code> - Después del header
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Radios de Borde */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Radios de Borde
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <RadiusExample
              name="sm"
              value="0.125rem"
              description="Elementos pequeños"
            />
            <RadiusExample
              name="DEFAULT"
              value="0.25rem"
              description="Por defecto"
            />
            <RadiusExample
              name="md"
              value="0.375rem"
              description="Inputs básicos"
            />
            <RadiusExample name="lg" value="0.5rem" description="Botones" />
            <RadiusExample name="xl" value="0.75rem" description="Cards" />
            <RadiusExample name="2xl" value="1rem" description="Modales" />
            <RadiusExample
              name="3xl"
              value="1.5rem"
              description="Contenedores"
            />
            <RadiusExample
              name="full"
              value="9999px"
              description="Círculos y pills"
            />
          </div>
        </div>

        {/* Responsive Spacing */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Espaciado Responsive
          </h3>
          <div className="bg-slate-800/30 border border-white/10 rounded-xl p-6">
            <h4 className="font-semibold mb-4 text-white">Ejemplos Comunes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-slate-300 mb-2">
                  Padding de Container
                </h5>
                <code className="text-green-400 bg-black/30 p-2 rounded block">
                  p-4 md:p-8 lg:p-12
                </code>
                <p className="text-xs text-slate-500 mt-1">
                  16px móvil → 32px tablet → 48px desktop
                </p>
              </div>
              <div>
                <h5 className="font-medium text-slate-300 mb-2">
                  Espaciado de Secciones
                </h5>
                <code className="text-green-400 bg-black/30 p-2 rounded block">
                  space-y-6 md:space-y-8 lg:space-y-12
                </code>
                <p className="text-xs text-slate-500 mt-1">
                  24px móvil → 32px tablet → 48px desktop
                </p>
              </div>
              <div>
                <h5 className="font-medium text-slate-300 mb-2">Grid Gaps</h5>
                <code className="text-green-400 bg-black/30 p-2 rounded block">
                  gap-4 md:gap-6 lg:gap-8
                </code>
                <p className="text-xs text-slate-500 mt-1">
                  16px móvil → 24px tablet → 32px desktop
                </p>
              </div>
              <div>
                <h5 className="font-medium text-slate-300 mb-2">
                  Margins de Cards
                </h5>
                <code className="text-green-400 bg-black/30 p-2 rounded block">
                  m-3 md:m-4 lg:m-6
                </code>
                <p className="text-xs text-slate-500 mt-1">
                  12px móvil → 16px tablet → 24px desktop
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mejores Prácticas */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Mejores Prácticas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                ✓ Hacer
              </h4>
              <ul className="space-y-2 text-sm text-green-200">
                <li>• Usar escalas consistentes (4px, 8px, 12px, 16px...)</li>
                <li>• Espaciado responsive con breakpoints</li>
                <li>• space-y para elementos verticales</li>
                <li>• gap para grids y flex containers</li>
                <li>• p-6 como padding estándar para cards</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
                ✗ Evitar
              </h4>
              <ul className="space-y-2 text-sm text-red-200">
                <li>• Valores arbitrarios como m-[13px]</li>
                <li>• Mezclar margin y padding inconsistentemente</li>
                <li>• Espaciado demasiado apretado en móvil</li>
                <li>• Usar solo margin-top (preferir space-y)</li>
                <li>• Radios muy grandes en elementos pequeños</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CSS Variables para Copy/Paste */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Variables CSS para Copy/Paste
          </h3>
          <div className="bg-black/50 p-4 rounded-xl overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono">
              {`/* Spacing Variables */
--space-1: 4px;      /* Micro spacing */
--space-2: 8px;      /* Small spacing */
--space-3: 12px;     /* Default spacing */
--space-4: 16px;     /* Base spacing */
--space-5: 20px;     /* Medium spacing */
--space-6: 24px;     /* Large spacing */
--space-8: 32px;     /* XL spacing */
--space-10: 40px;    /* XXL spacing */
--space-12: 48px;    /* Section spacing */
--space-16: 64px;    /* Layout spacing */
--space-20: 80px;    /* Page spacing */
--space-24: 96px;    /* Hero spacing */

/* Border Radius Variables */
--radius-sm: 0.125rem;    /* 2px */
--radius-md: 0.375rem;    /* 6px */
--radius-lg: 0.5rem;      /* 8px */
--radius-xl: 0.75rem;     /* 12px */
--radius-2xl: 1rem;       /* 16px */
--radius-3xl: 1.5rem;     /* 24px */
--radius-full: 9999px;    /* Perfect circle */

/* Common Utility Classes */
.container-padding {
  padding: var(--space-4);
}

@media (min-width: 768px) {
  .container-padding {
    padding: var(--space-8);
  }
}

@media (min-width: 1024px) {
  .container-padding {
    padding: var(--space-12);
  }
}

.card-padding {
  padding: var(--space-6);
}

.button-padding {
  padding: var(--space-3) var(--space-6);
}

.input-padding {
  padding: var(--space-3) var(--space-4);
}`}
            </pre>
          </div>
        </div>

        {/* Cheat Sheet */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Cheat Sheet - Casos de Uso Frecuentes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-slate-800/30 border border-white/10 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">🎴 Cards</h4>
              <code className="text-xs text-green-400 block">
                p-6 rounded-xl
              </code>
            </div>

            <div className="bg-slate-800/30 border border-white/10 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">🔘 Botones</h4>
              <code className="text-xs text-green-400 block">
                px-6 py-3 rounded-lg
              </code>
            </div>

            <div className="bg-slate-800/30 border border-white/10 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">📝 Inputs</h4>
              <code className="text-xs text-green-400 block">
                p-3 rounded-lg
              </code>
            </div>

            <div className="bg-slate-800/30 border border-white/10 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">🏷️ Badges</h4>
              <code className="text-xs text-green-400 block">
                px-3 py-1 rounded-full
              </code>
            </div>

            <div className="bg-slate-800/30 border border-white/10 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">📱 Container</h4>
              <code className="text-xs text-green-400 block">
                p-4 md:p-8 lg:p-12
              </code>
            </div>

            <div className="bg-slate-800/30 border border-white/10 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">📋 Grid</h4>
              <code className="text-xs text-green-400 block">
                gap-6 md:gap-8
              </code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Spacing;
