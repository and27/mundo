"use client";
import { useState } from "react";
import {
  ChevronDown,
  X,
  Tag,
  Mail,
  Share2,
  Bookmark,
  Download,
} from "lucide-react";

interface StoryData {
  id: string;
  title?: string;
  content?: string;
  tags?: string[];
  conversation?: {
    questions?: string[];
    validationPhrases?: string[];
  };
  activity?: {
    title?: string;
    description?: string;
    steps?: string[];
  };
}

interface StoryWithToolkitProps {
  story: StoryData;
}

interface PillarConfig {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  gradientFrom: string;
  gradientTo: string;
  bgAccent: string;
  borderAccent: string;
}

const StoryWithToolkit: React.FC<StoryWithToolkitProps> = ({ story }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [showNotice, setShowNotice] = useState(true);

  const handleSectionClick = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const handleStartTogether = () => {
    // Aquí iría la lógica para iniciar el journey juntos
    console.log("Iniciando journey colaborativo:", story.id);
  };

  const toolkitSections: PillarConfig[] = [
    {
      icon: <span className="text-sm">⚡</span>,
      title: "En el Momento",
      subtitle: "Scripts específicos para cuando surge la crisis",
      gradientFrom: "from-red-500",
      gradientTo: "to-orange-600",
      bgAccent: "bg-red-50",
      borderAccent: "border-red-200",
    },
    {
      icon: <span className="text-sm">💬</span>,
      title: "Después del Cuento",
      subtitle: "Cómo manejar conversaciones profundas que surgen",
      gradientFrom: "from-blue-500",
      gradientTo: "to-cyan-600",
      bgAccent: "bg-blue-50",
      borderAccent: "border-blue-200",
    },
    {
      icon: <span className="text-sm">📊</span>,
      title: "¿Está Funcionando?",
      subtitle: "Micro-indicadores de progreso y cuándo preocuparse",
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-600",
      bgAccent: "bg-green-50",
      borderAccent: "border-green-200",
    },
  ];

  const renderSectionContent = (index: number) => {
    switch (index) {
      case 0: // En el Momento
        return (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 text-sm mb-3">
                {`🚨 Si tu hijo dice "tengo miedo":`}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="bg-white p-3 rounded border-l-4 border-red-400">
                  <p className="font-medium text-red-800">{`✅ Di esto:`}</p>
                  <p className="text-red-700">
                    {`"Veo que sientes miedo. Es normal sentir miedo a veces. ¿Me puedes contar qué es lo que te asusta?"`}
                  </p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-gray-400">
                  <p className="font-medium text-gray-800">{`❌ Evita decir:`}</p>
                  <p className="text-gray-700">
                    {`"No tengas miedo" o "No hay nada que temer"`}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-900 text-sm mb-3">
                {`😤 Si tu hijo está en rabieta/frustración:`}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="bg-white p-3 rounded border-l-4 border-orange-400">
                  <p className="font-medium text-orange-800">{`Paso 1:`}</p>
                  <p className="text-orange-700">
                    {`Mantén la calma. Respira profundo 3 veces.`}
                  </p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-orange-400">
                  <p className="font-medium text-orange-800">{`Paso 2:`}</p>
                  <p className="text-orange-700">
                    {`"Veo que estás muy enojado/frustrado. Vamos a respirar juntos como Yachay."`}
                  </p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-orange-400">
                  <p className="font-medium text-orange-800">{`Paso 3:`}</p>
                  <p className="text-orange-700">
                    {`Cuando se calme: "¿Qué necesitabas? ¿Cómo te puedo ayudar?"`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // Después del Cuento
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 text-sm mb-3">
                {`🤔 Si te hace preguntas profundas:`}
              </h4>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded">
                  <p className="font-medium text-blue-800 mb-1">
                    {`Pregunta: "¿A ti también te da miedo no saber hacer las cosas?"`}
                  </p>
                  <p className="text-blue-700">
                    <strong>{`Respuesta sugerida:`}</strong>
                    {` "Sí, a veces a mí también me da miedo no saber algo. ¿Qué es lo que más te da miedo no saber hacer?"`}
                  </p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-medium text-blue-800 mb-1">
                    {`Pregunta: "¿Por qué Yachay era valiente si tenía miedo?"`}
                  </p>
                  <p className="text-blue-700">
                    <strong>{`Respuesta sugerida:`}</strong>
                    {` "Ser valiente no significa no tener miedo. Significa hacer lo que es importante aunque sientas miedo. ¿Tú has sido valiente alguna vez?"`}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
              <h4 className="font-medium text-cyan-900 text-sm mb-2">
                {`💡 Reglas de oro:`}
              </h4>
              <ul className="text-cyan-800 text-sm space-y-1">
                <li>{`• Las preguntas profundas son BUENAS señales`}</li>
                <li>{`• No necesitas la respuesta perfecta`}</li>
                <li>{`• Devuelve la pregunta: "¿Tú qué piensas?"`}</li>
                <li>{`• Valida sus emociones antes que sus ideas`}</li>
              </ul>
            </div>
          </div>
        );

      case 2: // ¿Está Funcionando?
        return (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 text-sm mb-3">
                {`✅ Señales de progreso (micro-cambios):`}
              </h4>
              <ul className="text-green-800 text-sm space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">{`📉`}</span>
                  <span>{`Las crisis duran menos tiempo (ej: de 20 min a 15 min)`}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">{`🗣️`}</span>
                  <span>{`Te cuenta lo que sintió después del conflicto`}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">{`🌱`}</span>
                  <span>{`A veces se calma solo (aunque sea por 2 minutos)`}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">{`🔄`}</span>
                  <span>{`Menciona conceptos del cuento en situaciones reales`}</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 text-sm mb-2">
                {`⏰ Dale tiempo:`}
              </h4>
              <p className="text-yellow-800 text-sm">
                {`Los cambios emocionales toman 2-4 semanas en ser visibles. No esperes resultados inmediatos.`}
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 text-sm mb-2">
                {`🚨 Considera ayuda profesional si:`}
              </h4>
              <ul className="text-red-800 text-sm space-y-1">
                <li>{`• Los miedos interfieren con actividades diarias por más de un mes`}</li>
                <li>{`• Las rabietas aumentan en intensidad o frecuencia`}</li>
                <li>{`• Aparecen síntomas físicos (dolor de estómago, insomnio)`}</li>
                <li>{`• Tu intuición de padre/madre te dice que algo más está pasando`}</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="cursor-pointer hover:text-indigo-600">{`← Guías`}</span>
        <span>›</span>
        <span className="text-gray-900">
          {story?.title || `El Cuento Generado`}
        </span>
      </div>

      {/* Closeable Notice */}
      {showNotice && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg relative">
          <button
            onClick={() => setShowNotice(false)}
            className="absolute top-2 right-2 text-amber-600 hover:text-amber-800"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start space-x-3">
            <span className="text-amber-600 text-lg flex-shrink-0">{`⚠️`}</span>
            <div>
              <h3 className="font-medium text-amber-800 text-sm">
                {`IMPORTANTE: Lee esto primero`}
              </h3>
              <p className="text-amber-700 text-sm mt-1">
                {`Revisa tu Caja de Herramientas antes de vivir el cuento junto a tu hijo/a. Te preparará para aprovechar cada momento.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-indigo-900 mb-4">
          {story?.title || `El Viaje de Yachay al Corazón de la Noche`}
        </h1>

        {story?.tags && story.tags.length > 0 && (
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
              <Tag className="w-3 h-3 text-indigo-600" />
            </div>
            <span className="text-sm text-slate-600">{`Temas abordados`}</span>
            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-indigo-50 text-indigo-600 border-purple-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button className="w-12 h-12 backdrop-blur-sm shadow-sm border border-indigo-500 rounded-lg hover:scale-110 transition-all duration-300 flex items-center justify-center">
            <Mail className="w-5 h-5 text-indigo-500" />
          </button>
          <button className="w-12 h-12 backdrop-blur-sm shadow-sm border border-indigo-500 rounded-lg hover:scale-110 transition-all duration-300 flex items-center justify-center">
            <Share2 className="w-5 h-5 text-indigo-500" />
          </button>
          <button className="w-12 h-12 backdrop-blur-sm shadow-sm border border-indigo-500 rounded-lg hover:scale-110 transition-all duration-300 flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-indigo-500" />
          </button>
          <button className="w-12 h-12 backdrop-blur-sm shadow-sm border border-indigo-500 rounded-lg hover:scale-110 transition-all duration-300 flex items-center justify-center">
            <Download className="w-5 h-5 text-indigo-500" />
          </button>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl overflow-hidden">
        <div className="p-4 md:p-8 bg-white/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white">{`📖`}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-indigo-900 mb-1">
                {`El cuento`}
              </h3>
              <p className="text-sm text-slate-600">
                {`Una historia que conecta con su mundo interior`}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="border-t border-slate-200 pt-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              {story?.content ||
                `En las montañas sagradas de los Andes, vivía Yachay, un joven puma que era el guardián de la oscuridad. Aunque era valiente, a veces sentía un pequeño escalofrío cuando el sol se ocultaba y la noche se extendía como un manto sobre la tierra...`}
            </p>
            <button
              onClick={handleStartTogether}
              className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              {`✨ Explorar Versión Completa`}
            </button>
          </div>
        </div>
      </div>

      {/* Toolkit Sections */}
      <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl overflow-hidden">
        <div className="p-4 md:p-8 bg-white/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white">{`🧰`}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-indigo-900 mb-1">
                {`Caja de Herramientas`}
              </h3>
              <p className="text-sm text-slate-600">
                {`Tu guía para la experiencia compartida`}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6 pt-0">
          <div className="border-t border-slate-200 pt-6">
            {toolkitSections.map((section, index) => (
              <div key={index} className="group mb-4">
                <div
                  className={`bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                    activeSection === index
                      ? `${section.borderAccent} shadow-xl scale-[1.01]`
                      : "hover:border-indigo-200 hover:shadow-lg"
                  }`}
                  onClick={() => handleSectionClick(index)}
                >
                  <div
                    className={`p-4 md:p-6 ${
                      activeSection === index ? section.bgAccent : "bg-white/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 bg-gradient-to-r ${section.gradientFrom} ${section.gradientTo} rounded-lg flex items-center justify-center shadow-lg`}
                      >
                        <div className="text-white">{section.icon}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-indigo-900 mb-1">
                          {section.title}
                        </h4>
                        <p className="text-xs text-slate-600">
                          {section.subtitle}
                        </p>
                      </div>
                      <div
                        className={`transition-transform duration-300 ${
                          activeSection === index ? "rotate-180" : ""
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                  {activeSection === index && (
                    <div className="p-6 pt-0 animate-in slide-in-from-top-2 duration-300">
                      <div className="border-t border-slate-200 pt-6">
                        {renderSectionContent(index)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryWithToolkit;
