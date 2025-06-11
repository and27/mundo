import React from "react";

const ColorSwatch = ({
  name,
  variable,
  description,
}: {
  name: string;
  variable: string;
  description?: string;
}) => (
  <div className="group cursor-pointer">
    <div
      className="w-16 h-16 rounded-xl border border-white/10 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
      style={{ backgroundColor: `var(${variable})` }}
    />
    <div>
      <p className="font-semibold text-white text-sm">{name}</p>
      <p className="text-xs text-slate-400 font-mono">{variable}</p>
      {description && (
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      )}
    </div>
  </div>
);

const Colors = () => {
  return (
    <div className="space-y-8">
      <section className="section-container p-8">
        <h2 className="text-3xl font-bold mb-6">Paleta de Colores</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Primary Colors */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-indigo-300">
              Colores Primarios
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <ColorSwatch name="Primary 50" variable="--color-primary-50" />
              <ColorSwatch name="Primary 100" variable="--color-primary-100" />
              <ColorSwatch name="Primary 200" variable="--color-primary-200" />
              <ColorSwatch name="Primary 300" variable="--color-primary-300" />
              <ColorSwatch name="Primary 400" variable="--color-primary-400" />
              <ColorSwatch
                name="Primary 500"
                variable="--color-primary-500"
                description="Base"
              />
              <ColorSwatch name="Primary 600" variable="--color-primary-600" />
              <ColorSwatch name="Primary 700" variable="--color-primary-700" />
              <ColorSwatch name="Primary 800" variable="--color-primary-800" />
              <ColorSwatch name="Primary 900" variable="--color-primary-900" />
            </div>
          </div>

          {/* Secondary Colors */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-300">
              Colores Secundarios
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <ColorSwatch
                name="Secondary 400"
                variable="--color-secondary-400"
              />
              <ColorSwatch
                name="Secondary 500"
                variable="--color-secondary-500"
                description="Base"
              />
              <ColorSwatch
                name="Secondary 600"
                variable="--color-secondary-600"
              />
              <ColorSwatch
                name="Secondary 700"
                variable="--color-secondary-700"
              />
            </div>
          </div>

          {/* Status Colors */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-300">
              Colores de Estado
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <ColorSwatch
                name="Success"
                variable="--color-success-500"
                description="Éxito"
              />
              <ColorSwatch
                name="Warning"
                variable="--color-warning-500"
                description="Advertencia"
              />
              <ColorSwatch
                name="Error"
                variable="--color-error-500"
                description="Error"
              />
            </div>
          </div>
        </div>

        {/* Neutrals */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Colores Neutrales
          </h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
              <ColorSwatch
                key={shade}
                name={`Neutral ${shade}`}
                variable={`--color-neutral-${shade}`}
              />
            ))}
          </div>
        </div>

        {/* Ejemplos de Uso */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Ejemplos de Uso
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Primary Examples */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl text-white">
              <h4 className="font-semibold mb-2">Gradiente Primario</h4>
              <code className="text-xs opacity-90">
                from-indigo-500 to-purple-600
              </code>
            </div>

            {/* Neutral Card */}
            <div className="bg-slate-800/50 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h4 className="font-semibold mb-2 text-white">Card Oscura</h4>
              <code className="text-xs text-slate-400">
                bg-slate-800/50 border-white/10
              </code>
            </div>

            {/* Success Badge */}
            <div className="bg-green-500/20 border border-green-500/30 p-4 rounded-xl">
              <h4 className="font-semibold mb-2 text-green-300">Badge Éxito</h4>
              <code className="text-xs text-green-400">
                bg-green-500/20 border-green-500/30
              </code>
            </div>
          </div>
        </div>

        {/* Código para Copy/Paste */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-300">
            Variables CSS para Copy/Paste
          </h3>
          <div className="bg-black/50 p-4 rounded-xl overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono">
              {`/* Primary Colors */
--color-primary-500: #667eea;
--color-primary-600: #5b6de8;

/* Secondary Colors */
--color-secondary-500: #c084fc;
--color-secondary-600: #a855f7;

/* Status Colors */
--color-success-500: #22c55e;
--color-warning-500: #f59e0b;
--color-error-500: #ef4444;

/* Neutrals */
--color-neutral-50: #f8fafc;
--color-neutral-100: #f1f5f9;
--color-neutral-800: #1e293b;
--color-neutral-900: #0f172a;`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Colors;
