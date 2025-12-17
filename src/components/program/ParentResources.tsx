export default function ParentResources({
  resources,
}: {
  resources: string[];
}) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 space-y-4">
      <h2 className="text-xl font-bold text-neutral-700">Guía para padres</h2>

      <div className="space-y-3">
        {resources.map((text, idx) => (
          <p key={idx} className="text-neutral-800 leading-relaxed text-md">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
