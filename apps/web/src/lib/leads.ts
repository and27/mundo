// Opciones del formulario de /recursos, compartidas entre la pagina y la API
// para que el servidor solo acepte valores que el formulario puede enviar.

export const LEAD_CITIES = [
  "Quito",
  "Guayaquil",
  "Cuenca",
  "Otra ciudad de Ecuador",
  "Otro país",
] as const;

export const LEAD_ROLES = [
  "Psicóloga/o clínica/o",
  "Psicóloga/o educativa/o",
  "Otro profesional de la salud o la educación",
  "Madre, padre o cuidador",
] as const;

export const LEAD_RESOURCES = [
  {
    href: "/recursos/termometro-del-miedo.pdf",
    preview: "/recursos/termometro-del-miedo-preview.webp",
    title: "Termómetro del miedo",
    blurb:
      "Para decir cuánto miedo se siente, del 1 al 5. Incluye un registro semanal para llevar a sesión.",
  },
  {
    href: "/recursos/escalera-de-valentia.pdf",
    preview: "/recursos/escalera-de-valentia-preview.webp",
    title: "Escalera de valentía",
    blurb:
      "Exposición gradual en seis escalones, con un ejemplo resuelto y la guía para armarla con la familia.",
  },
] as const;
