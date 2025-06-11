import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

// Hook para manejar copy to clipboard
const useCopyToClipboard = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return { copied, copyToClipboard };
};

// Componente para mostrar código copiable
const CodeBlock = ({
  code,
  id,
  title,
}: {
  code: string;
  id: string;
  title?: string;
}) => {
  const { copied, copyToClipboard } = useCopyToClipboard();

  return (
    <div className="relative">
      {title && <p className="text-sm text-slate-400 mb-2">{title}</p>}
      <div className="bg-black/50 rounded-lg p-3 relative group">
        <pre className="text-sm text-green-400 font-mono overflow-x-auto">
          {code}
        </pre>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="absolute top-2 right-2 p-1 bg-slate-800/80 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied === id ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>
    </div>
  );
};

const Containers = () => {
  return (
    <div className="space-y-8">
      <section className="section-container p-8">
        <h2 className="text-3xl font-bold mb-6">Sistema de Contenedores</h2>
        <p className="text-lg text-slate-300 mb-8">
          Componentes base para estructurar contenido con glassmorphism y
          efectos premium.
        </p>

        {/* Section Container */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-300">
              Section Container
            </h3>
            <p className="text-slate-400 mb-4">
              Contenedor principal para secciones con glassmorphism sutil. Ideal
              para agrupar contenido relacionado.
            </p>

            {/* Preview */}
            <div className="section-container p-6 mb-4">
              <h4 className="font-semibold mb-2 text-white">
                Ejemplo de Section Container
              </h4>
              <p className="text-slate-300">
                Este contenedor incluye backdrop-filter, bordes sutiles y
                efectos de glassmorphism que crean una sensación de profundidad
                y modernidad.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                  Premium
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  Glassmorphism
                </span>
              </div>
            </div>

            {/* CSS Code */}
            <CodeBlock
              id="section-container"
              title="CSS para section-container:"
              code={`.section-container {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-3xl);
  box-shadow: 
    0 8px 32px rgba(31, 38, 135, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  transition: all var(--duration-300) var(--ease-smooth);
}

.section-container:hover {
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 12px 40px rgba(31, 38, 135, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}`}
            />

            <CodeBlock
              id="section-container-usage"
              title="Uso en JSX:"
              code={`<div className="section-container p-8">
  <h2>Mi Contenido</h2>
  <p>Descripción del contenido...</p>
</div>`}
            />
          </div>

          {/* Card Primary - Estilo Oscuro */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-300">
              Card Primary (Estilo Oscuro)
            </h3>
            <p className="text-slate-400 mb-4">
              Tarjeta principal con fondo oscuro translúcido. Perfecta para
              contenido destacado sobre fondos oscuros.
            </p>

            {/* Preview */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-4 hover:border-indigo-200/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-semibold mb-2 text-white">
                Card Primary Example
              </h4>
              <p className="text-slate-300 mb-4">
                Esta tarjeta usa un fondo oscuro translúcido con efectos de
                hover elegantes. Ideal para tu InputForm y componentes
                principales.
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform">
                Acción Principal
              </button>
            </div>

            <CodeBlock
              id="card-primary"
              title="CSS para card-primary:"
              code={`.card-primary {
  background: rgba(30, 41, 59, 0.90);
  backdrop-filter: blur(16px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-2xl);
  box-shadow: 
    0 10px 15px rgba(0, 0, 0, 0.1), 
    0 4px 6px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  transition: all var(--duration-300) var(--ease-smooth);
}

.card-primary:hover {
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 
    0 20px 25px rgba(0, 0, 0, 0.15), 
    0 8px 10px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}`}
            />
          </div>

          {/* Card Light - Para ResourceCard */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-300">
              Card Light (Estilo ResourceCard)
            </h3>
            <p className="text-slate-400 mb-4">
              Tarjeta clara con glassmorphism. Perfecta para tu ResourceCard y
              contenido sobre fondos oscuros.
            </p>

            {/* Preview */}
            <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-6 mb-4 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-semibold mb-2 text-slate-800">
                Card Light Example
              </h4>
              <p className="text-slate-600 mb-4">
                Esta es la tarjeta que usas en tu ResourceCard. Fondo claro con
                glassmorphism que se ve elegante sobre fondos oscuros.
              </p>
              <div className="flex gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-medium rounded-full">
                  Video
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium rounded-full">
                  Herramienta
                </span>
              </div>
              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 hover:scale-105">
                Ver Recurso
              </button>
            </div>

            <CodeBlock
              id="card-light"
              title="CSS para card-light (ResourceCard style):"
              code={`.card-light {
  background: rgba(255, 255, 255, 0.90);
  backdrop-filter: blur(16px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.50);
  border-radius: var(--radius-xl);
  box-shadow: 
    0 10px 15px rgba(0, 0, 0, 0.08), 
    0 4px 6px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  position: relative;
  overflow: hidden;
  transition: all var(--duration-300) var(--ease-smooth);
}

.card-light:hover {
  border-color: rgba(102, 126, 234, 0.20);
  box-shadow: 
    0 20px 25px rgba(0, 0, 0, 0.10), 
    0 8px 10px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}`}
            />
          </div>

          {/* Glass Ultra */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-300">
              Glass Morphism Ultra
            </h3>
            <p className="text-slate-400 mb-4">
              Efecto de cristal premium con máximo blur y saturación. Para
              elementos especiales y overlays.
            </p>

            {/* Preview */}
            <div className="bg-white/5 backdrop-blur-[24px] saturate-[200%] brightness-[120%] border border-white/10 rounded-2xl p-6 mb-4">
              <h4 className="font-semibold mb-2 text-white">
                Glass Morphism Ultra
              </h4>
              <p className="text-slate-300">
                Efecto de cristal ultra premium con máximo blur, saturación y
                brillo. Perfecto para modales, overlays y elementos flotantes
                especiales.
              </p>
            </div>

            <CodeBlock
              id="glass-ultra"
              title="CSS para glass-morphism-ultra:"
              code={`.glass-morphism-ultra {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px) saturate(200%) brightness(120%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(31, 38, 135, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}`}
            />
          </div>

          {/* Input Dark */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-300">
              Input Dark Container
            </h3>
            <p className="text-slate-400 mb-4">
              Contenedor especial para inputs en modo oscuro, como el de tu
              InputForm exitoso.
            </p>

            {/* Preview */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-blue-400/50 rounded-2xl p-4 transition-all duration-300">
              <textarea
                placeholder="Ejemplo: Mi hijo de 4 años tiene miedo a la oscuridad..."
                className="w-full bg-transparent border-none outline-none resize-none text-white placeholder:text-slate-400 text-base leading-relaxed min-h-[80px]"
              />
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                <button className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                  🎤
                </button>
                <div className="text-xs text-slate-500">0/500</div>
              </div>
            </div>

            <CodeBlock
              id="input-dark"
              title="CSS para input-dark-container:"
              code={`.input-dark-container {
  background: linear-gradient(135deg, 
    rgba(30, 41, 59, 0.8) 0%, 
    rgba(15, 23, 42, 0.5) 100%);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-2xl);
  transition: all var(--duration-300) var(--ease-smooth);
}

.input-dark-container:focus-within {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1);
  transform: scale(1.01);
}

.input-dark-container textarea {
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  color: white;
  width: 100%;
}

.input-dark-container textarea::placeholder {
  color: rgba(148, 163, 184, 0.7);
}`}
            />
          </div>
        </div>

        {/* Ejemplos de Combinaciones */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Combinaciones Recomendadas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Combo 1 */}
            <div className="section-container p-6">
              <h4 className="font-semibold mb-3 text-white">
                Para Páginas Principales
              </h4>
              <div className="space-y-3 text-sm">
                <p className="text-slate-300">
                  ✓ section-container como wrapper
                </p>
                <p className="text-slate-300">✓ card-primary para contenido</p>
                <p className="text-slate-300">
                  ✓ Spacing: p-8 para el container
                </p>
              </div>
            </div>

            {/* Combo 2 */}
            <div className="section-container p-6">
              <h4 className="font-semibold mb-3 text-white">
                Para Resource Libraries
              </h4>
              <div className="space-y-3 text-sm">
                <p className="text-slate-300">✓ Fondo oscuro en body</p>
                <p className="text-slate-300">✓ card-light para cada recurso</p>
                <p className="text-slate-300">✓ Grid con gap-6 md:gap-8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kit Completo */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Kit Completo para Copy/Paste
          </h3>

          <CodeBlock
            id="complete-kit"
            title="CSS completo de containers:"
            code={`/* === CONTAINERS SYSTEM === */

/* Section Container - Main wrapper */
.section-container {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-3xl);
  box-shadow: 
    0 8px 32px rgba(31, 38, 135, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  transition: all var(--duration-300) var(--ease-smooth);
}

.section-container:hover {
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

/* Card Primary - Dark style */
.card-primary {
  background: rgba(30, 41, 59, 0.90);
  backdrop-filter: blur(16px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-2xl);
  box-shadow: 
    0 10px 15px rgba(0, 0, 0, 0.1), 
    0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all var(--duration-300) var(--ease-smooth);
}

.card-primary:hover {
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

/* Card Light - ResourceCard style */
.card-light {
  background: rgba(255, 255, 255, 0.90);
  backdrop-filter: blur(16px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.50);
  border-radius: var(--radius-xl);
  box-shadow: 
    0 10px 15px rgba(0, 0, 0, 0.08), 
    0 4px 6px rgba(0, 0, 0, 0.04);
  transition: all var(--duration-300) var(--ease-smooth);
}

.card-light:hover {
  border-color: rgba(102, 126, 234, 0.20);
  transform: translateY(-1px);
}

/* Glass Morphism Ultra */
.glass-morphism-ultra {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px) saturate(200%) brightness(120%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.12);
}

/* Input Dark Container */
.input-dark-container {
  background: linear-gradient(135deg, 
    rgba(30, 41, 59, 0.8) 0%, 
    rgba(15, 23, 42, 0.5) 100%);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-2xl);
  transition: all var(--duration-300) var(--ease-smooth);
}

.input-dark-container:focus-within {
  border-color: rgba(59, 130, 246, 0.5);
  transform: scale(1.01);
}`}
          />
        </div>
      </section>
    </div>
  );
};

export default Containers;
