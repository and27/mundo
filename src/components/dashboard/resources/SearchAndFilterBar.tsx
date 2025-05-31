"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiX,
  FiChevronDown,
  FiRefreshCw,
  FiSliders,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

interface SearchAndFilterBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  filterOptions: Array<{ value: string; label: string; count?: number }>;
  className?: string;
  searchInputId?: string;
  selectInputId?: string;
  searchPlaceholder?: string;
  showResultsCount?: boolean;
  resultsCount?: number;
  onClearAll?: () => void;
  isLoading?: boolean;
  showAdvancedFilters?: boolean;
  onToggleAdvancedFilters?: () => void;
}

const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchTerm,
  onSearchTermChange,
  currentFilter,
  onFilterChange,
  filterOptions,
  className = "",
  searchInputId = "search-input",
  selectInputId = "filter-select",
  searchPlaceholder = "Buscar por título o palabra clave...",
  showResultsCount = false,
  resultsCount = 0,
  onClearAll,
  isLoading = false,
  showAdvancedFilters = false,
  onToggleAdvancedFilters,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  console.log(isFocused);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasActiveFilters =
    searchTerm.length > 0 || currentFilter !== filterOptions[0]?.value;
  const activeFilterOption = filterOptions.find(
    (option) => option.value === currentFilter
  );

  const handleClearSearch = () => {
    onSearchTermChange("");
    searchInputRef.current?.focus();
  };

  const handleClearAll = () => {
    onSearchTermChange("");
    onFilterChange(filterOptions[0]?.value || "");
    onClearAll?.();
    setIsFilterOpen(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Search and Filter Bar */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-condor/10">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Search Input */}
          <div className="flex-1 relative group">
            <label htmlFor={searchInputId} className="sr-only">
              Buscar contenido
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-condor/50 group-focus-within:text-jaguar transition-colors">
                <FiSearch className="w-5 h-5" />
              </div>
              <input
                ref={searchInputRef}
                id={searchInputId}
                type="text"
                placeholder={searchPlaceholder}
                className="w-full pl-11 pr-12 py-3 rounded-xl border border-condor/20 bg-white/60 backdrop-blur-sm text-condor placeholder-condor/50 focus:outline-none focus:ring-2 focus:ring-jaguar/50 focus:border-jaguar/50 focus:bg-white/80 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-condor/40 hover:text-condor/70 hover:scale-110 transition-all duration-200"
                  aria-label="Limpiar búsqueda"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
              {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FiRefreshCw className="w-4 h-4 text-jaguar animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="relative" ref={filterRef}>
            <label htmlFor={selectInputId} className="sr-only">
              Filtrar contenido
            </label>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full lg:w-auto min-w-48 flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-condor/20 bg-white/60 backdrop-blur-sm text-condor hover:bg-white/80 hover:border-jaguar/30 focus:outline-none focus:ring-2 focus:ring-jaguar/50 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <FiFilter className="w-4 h-4 text-condor/60" />
                <span className="font-medium truncate">
                  {activeFilterOption?.label || "Filtros"}
                </span>
                {activeFilterOption?.count !== undefined && (
                  <span className="bg-jaguar/20 text-jaguar text-xs px-2 py-0.5 rounded-full font-medium">
                    {activeFilterOption.count}
                  </span>
                )}
              </div>
              <FiChevronDown
                className={`w-4 h-4 text-condor/60 transition-transform duration-200 ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isFilterOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 lg:right-auto lg:min-w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-condor/20 py-2 z-20 max-h-64 overflow-y-auto">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onFilterChange(option.value);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-jaguar/10 transition-colors duration-150 flex items-center justify-between group ${
                      currentFilter === option.value
                        ? "bg-jaguar/10 text-jaguar font-medium"
                        : "text-condor"
                    }`}
                  >
                    <span className="truncate">{option.label}</span>
                    {option.count !== undefined && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 ${
                          currentFilter === option.value
                            ? "bg-jaguar/20 text-jaguar"
                            : "bg-condor/10 text-condor/60 group-hover:bg-jaguar/20 group-hover:text-jaguar"
                        }`}
                      >
                        {option.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Advanced Filters Toggle */}
          {onToggleAdvancedFilters && (
            <button
              onClick={onToggleAdvancedFilters}
              className={`lg:w-auto px-4 py-3 rounded-xl border transition-all duration-200 flex items-center gap-2 ${
                showAdvancedFilters
                  ? "border-jaguar/50 bg-jaguar/10 text-jaguar"
                  : "border-condor/20 bg-white/60 text-condor/70 hover:bg-white/80 hover:border-jaguar/30 hover:text-condor"
              }`}
              title="Filtros avanzados"
            >
              <FiSliders className="w-4 h-4" />
              <span className="hidden md:inline font-medium">Avanzado</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Summary & Clear Actions */}
      {(showResultsCount || hasActiveFilters) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1">
          {/* Results Count */}
          {showResultsCount && (
            <div className="flex items-center gap-2 text-sm text-condor/70">
              <HiSparkles className="w-4 h-4 text-jaguar" />
              <span>
                {isLoading ? (
                  "Buscando..."
                ) : (
                  <>
                    <span className="font-semibold text-condor">
                      {resultsCount}
                    </span>
                    {resultsCount === 1
                      ? " resultado encontrado"
                      : " resultados encontrados"}
                    {hasActiveFilters && (
                      <span className="text-jaguar"> (filtrado)</span>
                    )}
                  </>
                )}
              </span>
            </div>
          )}

          {/* Active Filters & Clear Button */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm">
                {searchTerm && (
                  <span className="bg-jaguar/10 text-jaguar px-3 py-1 rounded-full border border-jaguar/20 flex items-center gap-1">
                    Búsqueda: {searchTerm}  
                    <button
                      onClick={handleClearSearch}
                      className="hover:bg-jaguar/20 rounded-full p-0.5 transition-colors"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {currentFilter !== filterOptions[0]?.value && (
                  <span className="bg-jaguar/10 text-jaguar px-3 py-1 rounded-full border border-jaguar/20">
                    {activeFilterOption?.label}
                  </span>
                )}
              </div>

              <button
                onClick={handleClearAll}
                className="text-sm text-condor/60 hover:text-condor hover:bg-condor/10 px-3 py-1 rounded-lg transition-all duration-200 flex items-center gap-1"
              >
                <FiX className="w-3 h-3" />
                Limpiar todo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilterBar;
