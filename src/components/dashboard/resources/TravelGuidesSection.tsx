"use client";
import React, { useState, useMemo } from "react";
import ResourceCard from "./ResourceCard";
import SearchAndFilterBar from "./SearchAndFilterBar";
import { stories } from "@/lib/stories";
import {
  FiCompass,
  FiBookOpen,
  FiUsers,
  FiFilter,
  FiGrid,
  FiList,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const TravelGuidesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("title");
  const [isLoading, setIsLoading] = useState(false);

  // Opciones de filtro dinámicas con conteo
  const dynamicFilterOptions = useMemo(() => {
    const categoryCounts = new Map<string, number>();

    stories.forEach((story) => {
      const category = story.category || "sin-categoria";
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
    });

    const options = Array.from(categoryCounts.entries()).map(
      ([category, count]) => ({
        value: category,
        label:
          category === "sin-categoria"
            ? "Sin Categoría"
            : category.charAt(0).toUpperCase() + category.slice(1),
        count,
      })
    );

    return [
      { value: "todos", label: "Todas las Categorías", count: stories.length },
      ...options.sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, []);

  // Opciones de ordenamiento
  const sortOptions = [
    { value: "title", label: "Título A-Z" },
    { value: "title-desc", label: "Título Z-A" },
    { value: "category", label: "Categoría" },
    { value: "recent", label: "Más Recientes" },
  ];

  // Historias filtradas y ordenadas
  const filteredAndSortedStories = useMemo(() => {
    const filtered = stories.filter((story) => {
      const combinedTextForSearch = `${story.title} ${
        story.description || ""
      } ${story.category || ""} ${story.guideId || ""}`.toLowerCase();

      const matchesSearchTerm = combinedTextForSearch.includes(
        searchTerm.toLowerCase()
      );

      const matchesFilter =
        currentFilter === "todos" ? true : story.category === currentFilter;

      return matchesSearchTerm && matchesFilter;
    });

    // Aplicar ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "category":
          return (a.category || "").localeCompare(b.category || "");
        case "recent":
          return (b.id || "").localeCompare(a.id || ""); // Asumiendo que IDs más altos = más recientes
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, currentFilter, sortBy]);

  const handleClearAll = () => {
    setSearchTerm("");
    setCurrentFilter("todos");
    setSortBy("title");
  };

  const handleSearch = (term: string) => {
    setIsLoading(true);
    setSearchTerm(term);
    // Simular delay de búsqueda
    setTimeout(() => setIsLoading(false), 300);
  };

  const stats = useMemo(() => {
    const totalGuides = stories.length;
    const categories = new Set(stories.map((s) => s.category).filter(Boolean))
      .size;
    const characters = new Set(stories.map((s) => s.guideId).filter(Boolean))
      .size;

    return { totalGuides, categories, characters };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-condor/10">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-jaguar to-jaguar/80 rounded-xl flex items-center justify-center flex-shrink-0">
            <FiCompass className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-condor mb-2">
              Guías para Acompañar los{" "}
              <span className="bg-gradient-to-r from-jaguar to-jaguar/80 bg-clip-text text-transparent">
                Viajes Interiores
              </span>
            </h2>
            <p className="text-condor/70 text-base leading-relaxed">
              Encuentra aquí el material de apoyo para facilitar cada historia y
              actividad de Mundo Interior con tus niños o estudiantes.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-condor/10 text-center">
            <div className="w-8 h-8 bg-gradient-to-br from-jaguar/20 to-jaguar/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiBookOpen className="w-4 h-4 text-jaguar" />
            </div>
            <div className="text-xl font-bold text-condor">
              {stats.totalGuides}
            </div>
            <div className="text-xs text-condor/60">Guías Totales</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-condor/10 text-center">
            <div className="w-8 h-8 bg-gradient-to-br from-jaguar/20 to-jaguar/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiFilter className="w-4 h-4 text-jaguar" />
            </div>
            <div className="text-xl font-bold text-condor">
              {stats.categories}
            </div>
            <div className="text-xs text-condor/60">Categorías</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-condor/10 text-center">
            <div className="w-8 h-8 bg-gradient-to-br from-jaguar/20 to-jaguar/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiUsers className="w-4 h-4 text-jaguar" />
            </div>
            <div className="text-xl font-bold text-condor">
              {stats.characters}
            </div>
            <div className="text-xs text-condor/60">Personajes</div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      {stories.length > 3 && (
        <SearchAndFilterBar
          searchTerm={searchTerm}
          onSearchTermChange={handleSearch}
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          filterOptions={dynamicFilterOptions}
          searchInputId="search-story-guides-input"
          selectInputId="filter-story-guides-select"
          searchPlaceholder="Buscar guía por título, tema o personaje..."
          showResultsCount={true}
          resultsCount={filteredAndSortedStories.length}
          onClearAll={handleClearAll}
          isLoading={isLoading}
        />
      )}

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        {/* Sort Options */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-condor/70">
            Ordenar por:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-condor/20 bg-white/60 backdrop-blur-sm text-condor text-sm focus:outline-none focus:ring-2 focus:ring-jaguar/50 focus:border-jaguar/50 transition-all duration-200"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-white/60 backdrop-blur-sm border border-condor/20 rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-all duration-200 ${
              viewMode === "grid"
                ? "bg-jaguar text-white shadow-sm"
                : "text-condor/60 hover:text-condor hover:bg-white/50"
            }`}
            title="Vista en cuadrícula"
          >
            <FiGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-all duration-200 ${
              viewMode === "list"
                ? "bg-jaguar text-white shadow-sm"
                : "text-condor/60 hover:text-condor hover:bg-white/50"
            }`}
            title="Vista en lista"
          >
            <FiList className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-condor/10 min-h-96">
        {filteredAndSortedStories.length > 0 ? (
          <>
            {/* Featured Guide - Mostrar el primero como destacado si hay búsqueda */}
            {searchTerm && filteredAndSortedStories.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <HiSparkles className="w-5 h-5 text-jaguar" />
                  <h3 className="text-lg font-semibold text-condor">
                    Resultado Destacado
                  </h3>
                </div>
                <div className="bg-gradient-to-r from-jaguar/5 to-jaguar/10 rounded-xl p-4 border border-jaguar/20">
                  <ResourceCard
                    key={`featured-${filteredAndSortedStories[0].id}`}
                    title={`Guía: ${filteredAndSortedStories[0].title}`}
                    description={
                      filteredAndSortedStories[0].description ||
                      "Guía de acompañamiento para esta historia."
                    }
                    imageUrl={filteredAndSortedStories[0].coverImage}
                    type="Guía de Historia"
                    tags={
                      filteredAndSortedStories[0].category
                        ? [
                            filteredAndSortedStories[0].category,
                            `Personaje: ${
                              filteredAndSortedStories[0].guideId || "Varios"
                            }`,
                          ]
                        : [
                            `Personaje: ${
                              filteredAndSortedStories[0].guideId || "Varios"
                            }`,
                          ]
                    }
                    actionButtonLabel="Ver Guía de Acompañamiento"
                    actionLink={`/dashboard/resources/story-guides/${filteredAndSortedStories[0].id}`}
                    // featured={true}
                  />
                </div>
              </div>
            )}

            {/* Guides Grid/List */}
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }`}
            >
              {(searchTerm
                ? filteredAndSortedStories.slice(1)
                : filteredAndSortedStories
              ).map((story) => (
                <ResourceCard
                  key={story.id}
                  title={`Guía: ${story.title}`}
                  description={
                    story.description ||
                    "Guía de acompañamiento para esta historia."
                  }
                  imageUrl={story.coverImage}
                  type="Guía de Historia"
                  tags={
                    story.category
                      ? [
                          story.category,
                          `Personaje: ${story.guideId || "Varios"}`,
                        ]
                      : [`Personaje: ${story.guideId || "Varios"}`]
                  }
                  actionButtonLabel="Ver Guía de Acompañamiento"
                  actionLink={`/dashboard/resources/story-guides/${story.id}`}
                  // viewMode={viewMode}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-condor/10 to-condor/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCompass className="w-8 h-8 text-condor/40" />
            </div>
            <h3 className="text-lg font-semibold text-condor mb-2">
              No se encontraron guías
            </h3>
            <p className="text-condor/60 mb-4">
              No hay guías que coincidan con los criterios de búsqueda actuales.
            </p>
            {(searchTerm || currentFilter !== "todos") && (
              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-jaguar to-jaguar/90 hover:from-jaguar/90 hover:to-jaguar text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <FiFilter className="w-4 h-4" />
                Limpiar Filtros
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelGuidesSection;
