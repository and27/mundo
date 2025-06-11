"use client";
import React, { useState } from "react";
import {
  Heart,
  Palette,
  Type,
  Ruler,
  Layers,
  FileText,
  Sparkles,
  Grid,
} from "lucide-react";

// Importar todos los módulos (estos serían los archivos que creamos)
import Colors from "../../components/designSystem/foundations/Colors";
import Typography from "../../components/designSystem/foundations/Typography";
import Spacing from "../../components/designSystem/foundations/Spacing";
import Containers from "../../components/designSystem/components/Containers";
import Buttons from "../../components/designSystem/components/Buttons";
import Forms from "../../components/designSystem/components/Forms";
// import Badges from "../../components/designSystem/components/Badges";
// import Icons from "../../components/designSystem/components/Icons";
// import Animations from "../../components/designSystem/patterns/Animations";

const DesignSystemPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: Grid,
      description: "Visión general del sistema",
    },
    {
      id: "colors",
      label: "Colores",
      icon: Palette,
      description: "Paleta y variables de color",
    },
    {
      id: "typography",
      label: "Tipografía",
      icon: Type,
      description: "Escalas y jerarquías de texto",
    },
    {
      id: "spacing",
      label: "Espaciado",
      icon: Ruler,
      description: "Sistema de espacios y radios",
    },
    {
      id: "containers",
      label: "Contenedores",
      icon: Layers,
      description: "Cards, sections y layouts",
    },
    {
      id: "buttons",
      label: "Botones",
      icon: Sparkles,
      description: "Sistema completo de botones",
    },
    {
      id: "forms",
      label: "Formularios",
      icon: FileText,
      description: "Inputs, selects y validaciones",
    },
  ];

  const stats = [
    {
      label: "Componentes",
      value: "12+",
      color: "from-indigo-500 to-purple-600",
    },
    {
      label: "Variables CSS",
      value: "50+",
      color: "from-green-500 to-emerald-600",
    },
    { label: "Estados", value: "25+", color: "from-pink-500 to-rose-600" },
    {
      label: "Ejemplos",
      value: "100+",
      color: "from-yellow-500 to-orange-600",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "colors":
        return <Colors />;
      case "typography":
        return <Typography />;
      case "spacing":
        return <Spacing />;
      case "containers":
        return <Containers />;
      case "buttons":
        return <Buttons />;
      case "forms":
        return <Forms />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Overview */}
            <section className="section-container p-8 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-6">
                  <Heart className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-700">
                    Design System
                  </span>
                </div>

                <h1 className="text-5xl font-bold mb-6">
                  Sistema de Diseño{" "}
                  <span className="text-gradient-primary">MIM</span>
                </h1>

                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Sistema modular y completo para la plataforma Mundo Interior.
                  Componentes, tokens y patrones listos para producción con
                  enfoque en bienestar emocional infantil.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                    >
                      <div
                        className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => setActiveTab("colors")}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Explorar Componentes
                  </button>
                  <button className="bg-slate-800/50 text-slate-300 hover:text-white border border-white/20 hover:border-white/40 font-medium py-3 px-6 rounded-lg transition-all duration-200">
                    Documentación
                  </button>
                </div>
              </div>
            </section>

            {/* Quick Access */}
            <section className="section-container p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Acceso Rápido
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tabs.slice(1).map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="group text-left p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-300/30 rounded-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                            {tab.label}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {tab.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Philosophy */}
            <section className="section-container p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    Enfoque Emocional
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Diseñado para crear conexiones emocionales positivas y
                    promover el bienestar infantil.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Modular</h3>
                  <p className="text-slate-400 text-sm">
                    Sistema organizado en módulos independientes para facilitar
                    el mantenimiento y escalabilidad.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    Cultura Andina
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Inspirado en la sabiduría ancestral y estética andina,
                    adaptado para la era digital.
                  </p>
                </div>
              </div>
            </section>

            {/* Recent Updates */}
            <section className="section-container p-8">
              <h2 className="text-2xl font-bold mb-6">
                Actualizaciones Recientes
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">
                      Sistema de Formularios
                    </h4>
                    <p className="text-sm text-slate-400">
                      Agregados inputs dark/light, estados de validación y
                      ejemplos funcionales.
                    </p>
                    <span className="text-xs text-slate-500">Junio 2025</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">
                      Sistema de Botones
                    </h4>
                    <p className="text-sm text-slate-400">
                      Botones premium con gradientes MIM, estados loading y
                      variantes completas.
                    </p>
                    <span className="text-xs text-slate-500">Junio 2025</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Foundations</h4>
                    <p className="text-sm text-slate-400">
                      Colores, tipografía y espaciado con variables CSS y
                      ejemplos copy/paste.
                    </p>
                    <span className="text-xs text-slate-500">Junio 2025</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen text-white p-6 md:p-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="section-container mb-8">
          <div className="flex flex-wrap gap-2 p-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white text-indigo-600 shadow-lg"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">{renderContent()}</div>

        {/* Footer */}
        <div className="section-container p-6 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-white">
                Sistema de Diseño MIM v1.0
              </h3>
              <p className="text-sm text-slate-400">
                Última actualización: Junio 2025 • {tabs.length - 1} módulos
                disponibles
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-slate-800/50 text-slate-300 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-lg transition-all duration-200 text-sm">
                Descargar Kit
              </button>
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm">
                Contribuir
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DesignSystemPage;
