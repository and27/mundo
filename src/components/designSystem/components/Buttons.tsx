import React, { useState } from "react";
import {
  Copy,
  Check,
  Play,
  Download,
  Heart,
  ArrowRight,
  Sparkles,
  Send,
  Mic,
  Square,
  ExternalLink,
} from "lucide-react";

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

const Buttons = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="space-y-8">
      <section className="section-container p-8">
        <h2 className="text-3xl font-bold mb-6">Sistema de Botones</h2>
        <p className="text-lg text-slate-300 mb-8">
          Botones premium con gradientes MIM, efectos de hover y estados
          interactivos.
        </p>

        {/* Button Primary */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-300">
              Button Primary
            </h3>
            <p className="text-slate-400 mb-4">
              Botón principal con gradiente índigo-púrpura. Tu estilo signature
              para acciones principales.
            </p>

            {/* Preview */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Botón Normal
              </button>

              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Con Icono
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleLoadingDemo}
                disabled={isLoading}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Estado Loading
                  </>
                )}
              </button>

              <button
                disabled
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-2.5 px-4 rounded-lg opacity-50 cursor-not-allowed"
              >
                Deshabilitado
              </button>
            </div>

            <CodeBlock
              id="btn-primary"
              title="CSS para btn-primary:"
              code={`.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-600) 100%);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  padding: var(--space-2_5) var(--space-4);
  font-weight: 600;
  font-size: var(--fontSize-sm);
  line-height: 1.5;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all var(--duration-300) var(--ease-smooth);
  box-shadow: 
    0 4px 6px rgba(102, 126, 234, 0.25), 
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-secondary-700) 100%);
  transform: translateY(-1px) scale(1.02);
  box-shadow: 
    0 8px 15px rgba(102, 126, 234, 0.35), 
    0 4px 6px rgba(0, 0, 0, 0.15);
}

.btn-primary:active {
  transform: translateY(0) scale(1);
  transition: var(--duration-75) var(--ease-out);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}`}
            />

            <CodeBlock
              id="btn-primary-usage"
              title="Uso en JSX:"
              code={`{/* Botón básico */}
<button className="btn-primary">
  Acción Principal
</button>

{/* Con iconos */}
<button className="btn-primary flex items-center gap-2">
  <Sparkles className="w-4 h-4" />
  Generar Guía MIM
  <Send className="w-4 h-4" />
</button>

{/* Con estado loading */}
<button 
  className="btn-primary flex items-center gap-2"
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      Procesando...
    </>
  ) : (
    <>
      <Send className="w-4 h-4" />
      Enviar
    </>
  )}
</button>`}
            />
          </div>

          {/* Button Secondary */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-300">
              Button Secondary
            </h3>
            <p className="text-slate-400 mb-4">
              Botón secundario con fondo translúcido. Para acciones secundarias
              o de apoyo.
            </p>

            {/* Preview */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button className="bg-slate-800/50 text-slate-300 hover:text-white border border-white/20 hover:border-white/40 hover:bg-slate-700/50 font-medium py-2.5 px-4 rounded-lg transition-all duration-200">
                Secundario
              </button>

              <button className="bg-slate-800/50 text-slate-300 hover:text-white border border-white/20 hover:border-white/40 hover:bg-slate-700/50 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Descargar
              </button>

              <button className="bg-slate-800/50 text-slate-300 hover:text-white border border-white/20 hover:border-white/40 hover:bg-slate-700/50 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Grabar
              </button>
            </div>

            <CodeBlock
              id="btn-secondary"
              title="CSS para btn-secondary:"
              code={`.btn-secondary {
  background: rgba(30, 41, 59, 0.5);
  color: var(--color-neutral-300);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-2_5) var(--space-4);
  font-weight: 500;
  transition: all var(--duration-200) var(--ease-smooth);
  backdrop-filter: blur(8px);
}

.btn-secondary:hover {
  background: rgba(30, 41, 59, 0.7);
  border-color: rgba(255, 255, 255, 0.4);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}`}
            />
          </div>

          {/* Button Outline */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-300">
              Button Outline
            </h3>
            <p className="text-slate-400 mb-4">
              Botón con borde y fondo transparente. Para acciones alternativas o
              enlaces importantes.
            </p>

            {/* Preview */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button className="bg-transparent text-indigo-400 border-2 border-indigo-400 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200">
                Outline Normal
              </button>

              <button className="bg-transparent text-indigo-400 border-2 border-indigo-400 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Ver mas"bg-transparent text-green-400 border-2 border-green-400 hover:bg-green-500 hover:text-white hover:border-green-500 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200">
                Success
              </button>

              <button className="bg-transparent text-red-400 border-2 border-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200">
                Danger
              </button>
            </div>

            <CodeBlock
              id="btn-outline"
              title="CSS para btn-outline:"
              code={`.btn-outline {
  background: transparent;
  color: var(--color-primary-400);
  border: 2px solid var(--color-primary-400);
  border-radius: var(--radius-lg);
  padding: var(--space-2_5) var(--space-4);
  font-weight: 600;
  transition: all var(--duration-200) var(--ease-smooth);
}

.btn-outline:hover {
  background: var(--color-primary-500);
  color: white;
  border-color: var(--color-primary-500);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* Variantes de color */
.btn-outline-success {
  color: var(--color-success-500);
  border-color: var(--color-success-500);
}

.btn-outline-success:hover {
  background: var(--color-success-500);
  border-color: var(--color-success-500);
}

.btn-outline-danger {
  color: var(--color-error-500);
  border-color: var(--color-error-500);
}

.btn-outline-danger:hover {
  background: var(--color-error-500);
  border-color: var(--color-error-500);
}`}
            />
          </div>

          {/* Button Icon Only */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-300">
              Button Icon Only
            </h3>
            <p className="text-slate-400 mb-4">
              Botones circulares o cuadrados solo con iconos. Para toolbars y
              acciones compactas.
            </p>

            {/* Preview */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button className="w-10 h-10 bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </button>

              <button className="w-10 h-10 bg-indigo-500/20 hover:bg-indigo-500 text-indigo-400 hover:text-white border border-indigo-400/30 hover:border-indigo-500 rounded-lg transition-all duration-200 flex items-center justify-center">
                <Play className="w-4 h-4" />
              </button>

              <button className="w-10 h-10 bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-white border border-green-400/30 hover:border-green-500 rounded-full transition-all duration-200 flex items-center justify-center">
                <Check className="w-4 h-4" />
              </button>

              <button className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5" />
              </button>
            </div>

            <CodeBlock
              id="btn-icon"
              title="CSS para btn-icon:"
              code={`.btn-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(30, 41, 59, 0.5);
  color: var(--color-neutral-400);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  transition: all var(--duration-200) var(--ease-smooth);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background: rgba(30, 41, 59, 0.7);
  color: white;
  border-color: rgba(255, 255, 255, 0.4);
}

.btn-icon-round {
  border-radius: var(--radius-full);
}

.btn-icon-large {
  width: 3rem;
  height: 3rem;
}

.btn-icon-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-600));
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-icon-primary:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}`}
            />
          </div>

          {/* Button Sizes */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-300">
              Tamaños de Botones
            </h3>
            <p className="text-slate-400 mb-4">
              Diferentes tamaños para distintos contextos y jerarquías visuales.
            </p>

            {/* Preview */}
            <div className="flex flex-wrap items-end gap-4 mb-6">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-2 py-1 text-xs rounded transition-all duration-300 hover:scale-105">
                Extra Small
              </button>

              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-3 py-1.5 text-sm rounded-md transition-all duration-300 hover:scale-105">
                Small
              </button>

              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 hover:scale-105">
                Medium (Default)
              </button>

              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 text-lg rounded-lg transition-all duration-300 hover:scale-105">
                Large
              </button>

              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 text-xl rounded-xl transition-all duration-300 hover:scale-105">
                Extra Large
              </button>
            </div>

            <CodeBlock
              id="btn-sizes"
              title="CSS para tamaños de botones:"
              code={`.btn-xs {
  padding: var(--space-1) var(--space-2);
  font-size: var(--fontSize-xs);
  border-radius: var(--radius-sm);
}

.btn-sm {
  padding: var(--space-1_5) var(--space-3);
  font-size: var(--fontSize-sm);
  border-radius: var(--radius-md);
}

.btn-md {
  padding: var(--space-2_5) var(--space-4);
  font-size: var(--fontSize-sm);
  border-radius: var(--radius-lg);
}

.btn-lg {
  padding: var(--space-3) var(--space-6);
  font-size: var(--fontSize-lg);
  border-radius: var(--radius-lg);
}

.btn-xl {
  padding: var(--space-4) var(--space-8);
  font-size: var(--fontSize-xl);
  border-radius: var(--radius-xl);
}`}
            />
          </div>

          {/* Button States */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-300">
              Estados Especiales
            </h3>
            <p className="text-slate-400 mb-4">
              Estados loading, success, error y otros feedback visuales.
            </p>

            {/* Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Cargando...
              </button>

              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                ¡Completado!
              </button>

              <button className="bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2">
                <Square className="w-4 h-4" />
                Error
              </button>

              <button className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 animate-pulse">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                Procesando
              </button>
            </div>

            <CodeBlock
              id="btn-states"
              title="Estados especiales:"
              code={`/* Loading State */
.btn-loading {
  position: relative;
  color: transparent;
}

.btn-loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin-left: -8px;
  margin-top: -8px;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

/* Success State */
.btn-success {
  background: linear-gradient(135deg, var(--color-success-500), #059669);
}

/* Error State */
.btn-error {
  background: linear-gradient(135deg, var(--color-error-500), #dc2626);
}

/* Warning State */
.btn-warning {
  background: linear-gradient(135deg, var(--color-warning-500), #d97706);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}`}
            />
          </div>

          {/* Button Groups */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-300">
              Grupos de Botones
            </h3>
            <p className="text-slate-400 mb-4">
              Agrupaciones para acciones relacionadas o alternativas.
            </p>

            {/* Preview */}
            <div className="space-y-4 mb-6">
              {/* Horizontal Group */}
              <div className="flex rounded-lg overflow-hidden border border-white/20">
                <button className="bg-slate-800/50 hover:bg-indigo-500 text-slate-300 hover:text-white px-4 py-2 border-r border-white/20 transition-colors flex-1">
                  Opción 1
                </button>
                <button className="bg-slate-800/50 hover:bg-indigo-500 text-slate-300 hover:text-white px-4 py-2 border-r border-white/20 transition-colors flex-1">
                  Opción 2
                </button>
                <button className="bg-indigo-500 text-white px-4 py-2 flex-1">
                  Activa
                </button>
              </div>

              {/* Floating Group */}
              <div className="flex gap-2">
                <button className="bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white border border-white/20 hover:border-white/40 p-2 rounded-lg transition-all">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white border border-white/20 hover:border-white/40 p-2 rounded-lg transition-all">
                  <Download className="w-4 h-4" />
                </button>
                <button className="bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white border border-white/20 hover:border-white/40 p-2 rounded-lg transition-all">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Action Group */}
              <div className="flex gap-3">
                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex-1">
                  Acción Principal
                </button>
                <button className="bg-slate-800/50 text-slate-300 hover:text-white border border-white/20 hover:border-white/40 hover:bg-slate-700/50 font-medium py-2.5 px-4 rounded-lg transition-all duration-200">
                  Cancelar
                </button>
              </div>
            </div>

            <CodeBlock
              id="btn-groups"
              title="CSS para grupos de botones:"
              code={`/* Button Group - Connected */
.btn-group {
  display: flex;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-group button {
  background: rgba(30, 41, 59, 0.5);
  color: var(--color-neutral-300);
  border: none;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding: var(--space-2) var(--space-4);
  transition: all var(--duration-200) var(--ease-smooth);
  flex: 1;
}

.btn-group button:last-child {
  border-right: none;
}

.btn-group button:hover {
  background: var(--color-primary-500);
  color: white;
}

.btn-group button.active {
  background: var(--color-primary-500);
  color: white;
}

/* Button Group - Floating */
.btn-group-floating {
  display: flex;
  gap: var(--space-2);
}

/* Button Group - Actions */
.btn-group-actions {
  display: flex;
  gap: var(--space-3);
}

.btn-group-actions .btn-primary {
  flex: 1;
}

.btn-group-actions .btn-secondary {
  flex: 0 0 auto;
}`}
            />
          </div>
        </div>

        {/* Kit Completo */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Kit Completo para Copy/Paste
          </h3>

          <CodeBlock
            id="complete-button-kit"
            title="CSS completo del sistema de botones:"
            code={`/* === BUTTONS SYSTEM === */

/* Base Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-weight: 600;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: all var(--duration-300) var(--ease-smooth);
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-600) 100%);
  color: white;
  padding: var(--space-2_5) var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: 
    0 4px 6px rgba(102, 126, 234, 0.25), 
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-secondary-700) 100%);
  transform: translateY(-1px) scale(1.02);
  box-shadow: 
    0 8px 15px rgba(102, 126, 234, 0.35), 
    0 4px 6px rgba(0, 0, 0, 0.15);
}

.btn-primary:active {
  transform: translateY(0) scale(1);
  transition: var(--duration-75) var(--ease-out);
}

/* Secondary Button */
.btn-secondary {
  background: rgba(30, 41, 59, 0.5);
  color: var(--color-neutral-300);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: var(--space-2_5) var(--space-4);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(8px);
}

.btn-secondary:hover {
  background: rgba(30, 41, 59, 0.7);
  border-color: rgba(255, 255, 255, 0.4);
  color: white;
  transform: translateY(-1px);
}

/* Outline Button */
.btn-outline {
  background: transparent;
  color: var(--color-primary-400);
  border: 2px solid var(--color-primary-400);
  padding: var(--space-2_5) var(--space-4);
  border-radius: var(--radius-lg);
}

.btn-outline:hover {
  background: var(--color-primary-500);
  color: white;
  border-color: var(--color-primary-500);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* Icon Only Button */
.btn-icon {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: var(--radius-lg);
  background: rgba(30, 41, 59, 0.5);
  color: var(--color-neutral-400);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-icon:hover {
  background: rgba(30, 41, 59, 0.7);
  color: white;
  border-color: rgba(255, 255, 255, 0.4);
}

/* Sizes */
.btn-xs { padding: var(--space-1) var(--space-2); font-size: var(--fontSize-xs); }
.btn-sm { padding: var(--space-1_5) var(--space-3); font-size: var(--fontSize-sm); }
.btn-md { padding: var(--space-2_5) var(--space-4); font-size: var(--fontSize-sm); }
.btn-lg { padding: var(--space-3) var(--space-6); font-size: var(--fontSize-lg); }
.btn-xl { padding: var(--space-4) var(--space-8); font-size: var(--fontSize-xl); }

/* States */
.btn-success {
  background: linear-gradient(135deg, var(--color-success-500), #059669);
}

.btn-error {
  background: linear-gradient(135deg, var(--color-error-500), #dc2626);
}

.btn-warning {
  background: linear-gradient(135deg, var(--color-warning-500), #d97706);
}`}
          />
        </div>
      </section>
    </div>
  );
};

export default Buttons;

