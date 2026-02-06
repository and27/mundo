// /types/program.ts

export interface ProgramLesson {
  id: string;

  /** Título del módulo (visible en kids y adulto) */
  title: string;

  /** Imagen/caratula del programa */
  coverImage: string;

  /** Referencias */
  storyId: string; // apunta a Story (niño)
  guideId: string; // apunta a ActionableGuide (adulto)

  /** Orden dentro del programa */
  order: number;

  /** Metadata opcional */
  emotion?: "miedo" | "ira" | "tristeza" | "vergüenza" | "calma";
}

export interface Program {
  id: string;
  title: string;
  description: string;
  lessons: ProgramLesson[];
}
