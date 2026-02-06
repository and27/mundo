export interface ModuleSection {
  id: string;
  titulo: string;
  tipo: "contenido" | "actividad" | "video" | string;
  duracion?: string;
  contenido: SectionContent;
}

export interface Etapa {
  rango: string;
  titulo: string;
  descripcion: string;
  hitos?: string[];
  desafios?: string[];
}

export interface SubSection {
  subtitulo: string;
  texto: string;
}

export interface Emotion {
  emocion: string;
  funcion: string;
  manifestaciones_por_edad?: Record<string, string>;
  cuando_preocuparse?: string[];
}

export interface SectionContent {
  texto?: string;
  puntosClave?: string[];
  subsecciones?: {
    subtitulo: string;
    texto: string;
  }[];
  etapas?: {
    rango: string;
    titulo: string;
    descripcion: string;
    hitos?: string[];
    desafios?: string[];
  }[];
  emociones?: Emotion[];
  instrucciones?: string;
  preguntas?: string[];
  ejercicio_practico?: {
    titulo: string;
    instrucciones: string;
    pasos: string[];
  };
  objetivo?: string;
}

export interface ModuleData {
  id: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  duracion: string;
  objetivos: string[];
  colorPrimario: string;
  colorSecundario: string;
  icono: string;
  secciones: ModuleSection[];
}

export interface CourseProgress {
  currentModule: number;
  completedSections: string[];
  moduleProgress: Record<string, number>;
  totalProgress: number;
  startedDate?: string;
  lastActivityDate?: string;
}
