"use client";
import React, { useState, useEffect } from "react";
import {
  HiSparkles,
  HiLightBulb,
  HiAcademicCap,
  HiBookOpen,
  HiUsers,
  HiChevronRight,
  HiPlay,
} from "react-icons/hi2";
import {
  FaCompass,
  FaMapMarkedAlt,
  FaHeart,
  FaGraduationCap,
} from "react-icons/fa";
import AdditionalResourcesLibrary from "./AdditionalResourcesLibrary";

const ResourcesPageLayout: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const learningPath = [
    {
      id: "methodology",
      title: "Metodología MIM",
      description: "Fundamentos y principios",
      icon: HiAcademicCap,
      color: "from-blue-500 to-indigo-600",
      progress: 100,
    },
    {
      id: "guides",
      title: "Guías de Viaje",
      description: "Herramientas prácticas",
      icon: FaCompass,
      color: "from-indigo-500 to-purple-600",
      progress: 75,
    },
    {
      id: "resources",
      title: "Biblioteca",
      description: "Recursos adicionales",
      icon: HiBookOpen,
      color: "from-purple-500 to-pink-600",
      progress: 50,
    },
    {
      id: "community",
      title: "Comunidad",
      description: "Conecta y comparte",
      icon: HiUsers,
      color: "from-pink-500 to-rose-600",
      progress: 25,
    },
  ];

  const stats = [
    { number: "12+", label: "Guías Especializadas", icon: FaMapMarkedAlt },
    { number: "150+", label: "Recursos Disponibles", icon: HiBookOpen },
    { number: "1000+", label: "Familias Transformadas", icon: FaHeart },
    { number: "95%", label: "Tasa de Éxito", icon: HiSparkles },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-200/15 to-pink-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Hero Section Rediseñado */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-700 font-medium text-sm mb-6 shadow-sm">
            <HiSparkles className="w-4 h-4" />
            <span>Centro de Formación para Guías</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent mb-6 leading-tight">
            Conviértete en un
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Faro de Luz
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Domina la <strong>Metodología Mundo Interior (MIM)</strong> y
            transforma vidas. Aquí encontrarás todo lo necesario para guiar a
            familias hacia el bienestar emocional auténtico.
          </p>

          {/* Stats mejoradas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isVisible
                    ? "animate-in slide-in-from-bottom duration-700"
                    : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-4 mx-auto">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ruta de Aprendizaje Visual */}
        <div
          className={`mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Tu Ruta de Transformación
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Sigue este camino estructurado para convertirte en un guía experto
              en bienestar emocional
            </p>
          </div>

          <div className="relative">
            {/* Línea conectora */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 -translate-y-1/2 hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {learningPath.map((step, index) => (
                <div
                  key={step.id}
                  className={`relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                    currentStep === index
                      ? "ring-2 ring-indigo-400 shadow-indigo-200/50"
                      : ""
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  {/* Número de paso */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icono */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-lg`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{step.description}</p>

                  {/* Barra de progreso */}
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                    <div
                      className={`h-2 bg-gradient-to-r ${step.color} rounded-full transition-all duration-700`}
                      style={{ width: `${step.progress}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      {step.progress}% completado
                    </span>
                    <HiChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secciones principales con diseño mejorado */}
        <div className="space-y-16">
          {/* Metodología Section */}
          <section
            id="metodologia-mim"
            className={`transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <HiAcademicCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      Metodología Mundo Interior
                    </h2>
                    <p className="text-white/80">
                      Los fundamentos que transforman vidas
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <HiPlay className="w-4 h-4" />
                  <span className="text-sm font-medium">Comenzar ahora</span>
                </div>
              </div>
              <div className="p-8">{/* <MethodologySection /> */}</div>
            </div>
          </section>

          {/* Biblioteca de Recursos Section */}
          <section
            id="biblioteca-recursos"
            className={`transition-all duration-1000 delay-900 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <HiBookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      Biblioteca de Recursos
                    </h2>
                    <p className="text-white/80">
                      Materiales complementarios y herramientas avanzadas
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <HiLightBulb className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Descubrir recursos
                  </span>
                </div>
              </div>
              <div className="p-8">
                <AdditionalResourcesLibrary />
              </div>
            </div>
          </section>

          {/* Comunidad Section (Preview) */}
          <section
            id="comunidad-soporte"
            className={`transition-all duration-1000 delay-1100 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-indigo-800 rounded-3xl shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
              <div className="relative p-8 text-white text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <HiUsers className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Conecta con Otros Guías
                </h2>
                <p className="text-white/80 mb-6 max-w-2xl mx-auto text-lg">
                  Próximamente: Una comunidad vibrante donde podrás compartir
                  experiencias, hacer preguntas y crecer junto a otros guías
                  especializados.
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium border border-white/20">
                  <HiSparkles className="w-4 h-4" />
                  <span>Próximamente</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action Final */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-1300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
            <FaGraduationCap className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para Transformar Vidas?
            </h2>
            <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
              Comienza tu viaje como Guía de Mundo Interior y ayuda a las
              familias a encontrar el bienestar emocional que merecen.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
              <HiPlay className="w-5 h-5" />
              Comenzar mi Formación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPageLayout;
