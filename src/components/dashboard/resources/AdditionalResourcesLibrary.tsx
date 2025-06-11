import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Play,
  FileText,
  Eye,
  Video,
  Download as DownloadIcon,
  Tag,
  BookOpen,
} from "lucide-react";
import Image from "next/image";

interface Resource {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  type: string;
  category: string;
  tags?: string[];
  actionLink: string;
}

interface Tab {
  id: string;
  label: string;
}

interface FilterOption {
  value: string;
  label: string;
}

interface ResourceCardProps {
  resource: Resource;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

interface SearchAndFilterBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  filterOptions: FilterOption[];
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "herramienta":
      case "descargable":
        return <DownloadIcon className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return "from-red-500 to-pink-600";
      case "herramienta":
      case "descargable":
        return "from-green-500 to-emerald-600";
      default:
        return "from-blue-500 to-indigo-600";
    }
  };

  const handleAction = () => {
    if (resource.actionLink.startsWith("http")) {
      window.open(resource.actionLink, "_blank");
    } else {
      const link = document.createElement("a");
      link.href = `data:text/plain;charset=utf-8,${resource.title} - ${resource.description}`;
      link.download = `${resource.title
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const defaultImageUrl = `https://images.unsplash.com/photo-150740${resource.id.slice(
    -1
  )}169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center`;

  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border border-white/50 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-indigo-50 overflow-hidden">
        <Image
          src={resource.imageUrl || defaultImageUrl}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <div
            className={`inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r ${getTypeColor(
              resource.type
            )} text-white text-xs font-medium rounded-full shadow-lg`}
          >
            {getTypeIcon(resource.type)}
            {resource.type}
          </div>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {resource.title}
        </h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-3">
          {resource.description}
        </p>

        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {resource.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="text-xs text-slate-500">
                +{resource.tags.length - 3} más
              </span>
            )}
          </div>
        )}

        <button
          onClick={handleAction}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {resource.type === "Video" ? (
            <>
              <Play className="w-4 h-4" />
              Ver Video
            </>
          ) : resource.type === "Herramienta" ? (
            <>
              <Download className="w-4 h-4" />
              Descargar
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Leer Más
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex flex-wrap gap-1 p-1 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
            activeTab === tab.id
              ? "bg-white text-indigo-600 shadow-lg"
              : "text-white hover:bg-white/20 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchTerm,
  onSearchTermChange,
  currentFilter,
  onFilterChange,
  filterOptions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Buscar recursos..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
        />
      </div>

      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <select
          value={currentFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="pl-10 pr-8 py-3 bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 min-w-[200px]"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const AdditionalResourcesLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentSearchFilter, setCurrentSearchFilter] =
    useState<string>("todos");

  const sampleAdditionalResources: Resource[] = [
    {
      id: "article1",
      title: "Entendiendo la Ansiedad Infantil: Signos y Apoyo",
      description:
        "Una guía completa para padres y educadores sobre cómo reconocer los signos tempranos de ansiedad en niños y proporcionar el apoyo adecuado mediante técnicas de la metodología MIM.",
      imageUrl:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop&crop=center",
      type: "Artículo",
      category: "articulos",
      tags: ["Ansiedad", "Apoyo Parental", "Bienestar Infantil"],
      actionLink: "/articles/ansiedad-infantil",
    },
    {
      id: "video1",
      title: "Demostración: Ejercicio de Respiración MIM 'La Pluma Flotante'",
      description:
        "Video tutorial paso a paso que muestra cómo guiar a un niño en este ejercicio de calma, incluyendo variaciones según la edad y consejos prácticos.",
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
      type: "Video",
      category: "videos",
      tags: ["Respiración", "MIM", "Técnicas de Calma"],
      actionLink: "https://youtube.com/watch?v=example",
    },
    {
      id: "tool1",
      title: "Mi Diario de Gratitud (Plantilla Imprimible)",
      description:
        "Plantilla PDF diseñada especialmente para niños, con espacios para dibujos y escritura, promoviendo la práctica diaria de la gratitud de manera divertida.",
      imageUrl:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
      type: "Herramienta",
      category: "descargables",
      tags: ["Gratitud", "Imprimible", "Desarrollo Emocional"],
      actionLink: "/downloads/diario_gratitud.pdf",
    },
    {
      id: "article2",
      title: "Cómo Fomentar la Autoestima en Adolescentes",
      description:
        "Estrategias basadas en la metodología MIM para ayudar a adolescentes a desarrollar una autoestima sólida y enfrentar los desafíos de esta etapa.",
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center",
      type: "Artículo",
      category: "articulos",
      tags: ["Autoestima", "Adolescentes", "Desarrollo Personal"],
      actionLink: "/articles/autoestima-adolescentes",
    },
    {
      id: "video2",
      title: "Técnicas de Mindfulness para Familias",
      description:
        "Sesión práctica de mindfulness familiar que pueden realizar juntos en casa, adaptada a diferentes edades y niveles de experiencia.",
      imageUrl:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&crop=center",
      type: "Video",
      category: "videos",
      tags: ["Mindfulness", "Familia", "Bienestar"],
      actionLink: "https://youtube.com/watch?v=example2",
    },
    {
      id: "tool2",
      title: "Kit de Emociones: Tarjetas Identificadoras",
      description:
        "Conjunto de tarjetas imprimibles para ayudar a los niños a identificar y expresar sus emociones de manera visual y divertida.",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
      type: "Herramienta",
      category: "descargables",
      tags: ["Emociones", "Identificación", "Herramientas Visuales"],
      actionLink: "/downloads/kit_emociones.pdf",
    },
  ];

  const tabOptionsForLibrary: Tab[] = [
    { id: "todos", label: "Todos los Recursos" },
    { id: "articulos", label: "Artículos" },
    { id: "videos", label: "Videos" },
    { id: "descargables", label: "Descargables" },
  ];

  const filterOptionsForSearch: FilterOption[] = [
    { value: "todos", label: "Todas las Etiquetas" },
    { value: "Ansiedad", label: "Ansiedad" },
    { value: "Respiración", label: "Respiración" },
    { value: "Gratitud", label: "Gratitud" },
    { value: "Autoestima", label: "Autoestima" },
    { value: "Mindfulness", label: "Mindfulness" },
    { value: "Emociones", label: "Emociones" },
  ];

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

  const getResourceCount = (category: string): number => {
    if (category === "todos") return sampleAdditionalResources.length;
    return sampleAdditionalResources.filter((r) => r.category === category)
      .length;
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCurrentSearchFilter("todos");
  };

  const handleShowAllResources = () => {
    setSearchTerm("");
    setCurrentSearchFilter("todos");
    setActiveTab("todos");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-4">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-700">
            Biblioteca de Recursos
          </span>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Amplía tus Herramientas como{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Guía
          </span>
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
          Encuentra artículos especializados, videos demostrativos y
          herramientas prácticas para enriquecer tu acompañamiento y fortalecer
          tu práctica como guía MIM.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {tabOptionsForLibrary.map((tab) => (
            <div
              key={tab.id}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50"
            >
              <div className="text-2xl font-bold text-indigo-600 mb-1">
                {getResourceCount(tab.id)}
              </div>
              <div className="text-sm text-slate-600">{tab.label}</div>
            </div>
          ))}
        </div>
      </div>

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

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {filteredResources.length > 0 ? (
            <>
              Mostrando{" "}
              <span className="font-semibold">{filteredResources.length}</span>{" "}
              recurso{filteredResources.length !== 1 ? "s" : ""}
            </>
          ) : (
            "No se encontraron recursos"
          )}
        </p>
        {searchTerm && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            No se encontraron recursos
          </h3>
          <p className="text-slate-600 mb-4">
            Intenta ajustar tus criterios de búsqueda o explora otras
            categorías.
          </p>
          <button
            onClick={handleShowAllResources}
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Ver todos los recursos
          </button>
        </div>
      )}
    </div>
  );
};

export default AdditionalResourcesLibrary;
