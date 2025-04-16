export type StoryMode = "listen" | "play";

export type Story = {
  id: string; // usado en la URL
  title: string;
  guideId: string; // conexión con /lib/guides.ts
  description: string;
  type: "breathing" | "visualization" | "sleep" | "interactive"; // puedes ampliar
  availableModes: StoryMode[];
  image?: string;
};

export const stories: Story[] = [
  {
    id: "el-viaje-de-amaru",
    title: "El viaje de Amaru",
    guideId: "amaru",
    description:
      "Un cuento para volver al cuerpo a través de la respiración suave.",
    type: "breathing",
    availableModes: ["listen", "play"],
    image: "/covers/amaru.png", // opcional, por si usas en tarjetas
  },
  {
    id: "la-montaña-de-yachay",
    title: "La Montaña de Yachay",
    guideId: "yachay",
    description: "Explora la calma interior y el enfoque guiado por Yachay.",
    type: "breathing",
    availableModes: ["play"],
    image: "/covers/yachay.png",
  },
  // Agrega más cuentos fácilmente
];
