export interface MockSpecialist {
  id: string;
  name: string;
  title: string;
  specialty: string;
  location: string;
  availability: string;
  contact: string;
  riskLevel: "attention" | "professional_required";
}

export const MOCK_SPECIALISTS: MockSpecialist[] = [
  {
    id: "carmen-mendoza",
    name: "Dra. Carmen Mendoza",
    title: "Psicóloga Clínica Infantil",
    specialty: "Especialista en miedos infantiles",
    location: "Quito Centro",
    availability: "Disponible en 1-2 semanas",
    contact: "Ver perfil y contactar",
    riskLevel: "attention",
  },
  {
    id: "miguel-herrera",
    name: "Dr. Miguel Herrera",
    title: "Especialista en Ansiedad Infantil",
    specialty: "Trastornos de ansiedad • 8 años experiencia",
    location: "Quito Norte",
    availability: "Disponible en 2-3 semanas",
    contact: "Ver perfil y contactar",
    riskLevel: "attention",
  },
  {
    id: "ana-torres",
    name: "Dra. Ana Torres",
    title: "Especialista en Trauma Infantil",
    specialty: "Crisis familiares y trauma • Atención prioritaria",
    location: "Valle de los Chillos",
    availability: "Atención de emergencia disponible",
    contact: "Contacto inmediato",
    riskLevel: "professional_required",
  },
  {
    id: "luis-morales",
    name: "Dr. Luis Morales",
    title: "Psicólogo Infantil Certificado",
    specialty: "Desarrollo emocional y comportamental",
    location: "Cumbayá",
    availability: "Disponible esta semana",
    contact: "Ver perfil y contactar",
    riskLevel: "professional_required",
  },
];

export const getSpecialistsByRisk = (
  riskLevel: "attention" | "professional_required"
): MockSpecialist[] => {
  return MOCK_SPECIALISTS.filter(
    (specialist) => specialist.riskLevel === riskLevel
  ).slice(0, 3); // Máximo 3 especialistas
};

export const getAllSpecialists = (): MockSpecialist[] => {
  return MOCK_SPECIALISTS.slice(0, 3);
};
