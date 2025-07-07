interface ModuleHeaderProps {
  module: any;
  current: number;
}

export default function ModuleHeader({ module, current }: ModuleHeaderProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${module.colorPrimario}, ${module.colorSecundario})`,
          }}
        >
          <span className="text-2xl">{module.icono}</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{module.titulo}</h1>
          <p className="text-indigo-600">{module.subtitulo}</p>
        </div>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-3">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${((current + 1) / module.secciones.length) * 100}%`,
            background: `linear-gradient(90deg, ${module.colorPrimario}, ${module.colorSecundario})`,
          }}
        />
      </div>
    </div>
  );
}
