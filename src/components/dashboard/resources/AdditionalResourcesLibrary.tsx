"use client";

import React, { useState } from "react";
import ResourceCard from "./ResourceCard";
import SearchAndFilterBar from "./SearchAndFilterBar";
import TabNavigation from "@/components/ui/TabNavigation";

const sampleAdditionalResources = [
  {
    id: "article1",
    title: "Entendiendo la Ansiedad Infantil: Signos y Apoyo",
    description:
      "Una guía breve para padres y educadores sobre cómo reconocer y apoyar a niños con ansiedad.",
    imageUrl: "/images/article_anxiety.jpg",
    type: "Artículo",
    category: "articulos",
    tags: ["Ansiedad", "Apoyo Parental"],
    actionLink: "/articles/ansiedad-infantil",
  },
  {
    id: "video1",
    title: "Demostración: Ejercicio de Respiración MIM 'La Pluma Flotante'",
    description:
      "Un video corto mostrando cómo guiar a un niño en este ejercicio de calma.",
    imageUrl: "/images/video_breathing.jpg",
    type: "Video",
    category: "videos",
    tags: ["Respiración", "MIM"],
    actionLink: "https://youtube.com/link-al-video",
  },
  {
    id: "tool1",
    title: "Mi Diario de Gratitud (Plantilla Imprimible)",
    description:
      "Una plantilla PDF para que los niños practiquen la gratitud diariamente.",
    imageUrl: "/images/tool_gratitude_journal.jpg",
    type: "Herramienta",
    category: "descargables",
    tags: ["Gratitud", "Imprimible"],
    actionLink: "/downloads/diario_gratitud.pdf",
  },
];

const tabOptionsForLibrary = [
  { id: "todos", label: "Todos" },
  { id: "articulos", label: "Artículos" },
  { id: "videos", label: "Videos" },
  { id: "descargables", label: "Descargables" },
];

const filterOptionsForSearch = [
  { value: "todos", label: "Todas las Etiquetas" },
  { value: "Ansiedad", label: "Ansiedad" },
  { value: "Respiración", label: "Respiración" },
  { value: "Gratitud", label: "Gratitud" },
];

const AdditionalResourcesLibrary = () => {
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSearchFilter, setCurrentSearchFilter] = useState("todos");

  const filteredResources = sampleAdditionalResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "todos" ? true : resource.category === activeTab;
    const matchesTagFilter =
      currentSearchFilter === "todos" ||
      (resource.tags && resource.tags.includes(currentSearchFilter));

    return matchesSearch && matchesTab && matchesTagFilter;
  });

  return (
    <div className="mt-8 bg-black/10 p-5 md:p-6 rounded-lg border border-condor/30 shadow-md space-y-6">
      <header>
        <h2
          id="titulo-biblioteca-recursos"
          className="text-2xl font-bold text-white mb-1"
        >
          Amplía tus Herramientas como Guía
        </h2>
        <p className="text-condor/80 text-sm mb-4">
          Encuentra artículos, videos y herramientas prácticas para enriquecer
          tu acompañamiento.
        </p>
      </header>

      <TabNavigation
        tabs={tabOptionsForLibrary}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <SearchAndFilterBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        currentFilter={currentSearchFilter}
        onFilterChange={setCurrentSearchFilter}
        filterOptions={filterOptionsForSearch}
      />

      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              title={resource.title}
              description={resource.description}
              imageUrl={resource.imageUrl}
              type={resource.type}
              tags={resource.tags}
              actionButtonLabel={
                resource.category === "descargables" ? "Descargar" : "Ver Más"
              }
              actionLink={resource.actionLink}
            />
          ))}
        </div>
      ) : (
        <p className="text-condor/80 text-center py-8">
          No se encontraron recursos con los criterios actuales.
        </p>
      )}
    </div>
  );
};

export default AdditionalResourcesLibrary;
