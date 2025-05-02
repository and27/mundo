export interface Guide {
  id: string;
  name: string;
  subtitle: string;
  phrase: string;
  description: string;
  image: string;
  imageTransparent: string;
  refinedImage?: string;
}

export const guides: Guide[] = [
  {
    id: "yachay",
    name: "Yachay",
    subtitle: "Fuerza interior",
    phrase: "En tu calma vive toda tu fuerza.",
    description:
      "Yachay te ayudará a encontrar foco, valentía y conexión con tu fuerza interna.",
    image: "/guides/yachay3d.png",
    imageTransparent: "/guides/yachay-transparent.png",
  },
  {
    id: "kuntur",
    name: "Kuntur",
    subtitle: "El mensajero del cielo",
    phrase: "Tómate distancia. Todo se ve distinto desde arriba.",
    description:
      "Kuntur te acompaña a elevar tu mirada y encontrar esperanza en los momentos difíciles.",
    image: "/guides/kuntur3d.png",
    imageTransparent: "/guides/kuntur-transparent.png",
  },
  {
    id: "amaru",
    name: "Amaru",
    subtitle: "Fluir y crecer",
    phrase: "Cada emoción es una puerta hacia tu libertad.",
    description:
      "Amaru te guía a través de la liberación emocional, ayudándote a transmutar lo que ya no necesitas.",
    image: "/guides/amaru3d.png",
    imageTransparent: "/guides/amaru-transparent.png",
  },
  {
    id: "hatun",
    name: "Hatun",
    subtitle: "Abuela sabia",
    phrase: "Todo lo que es real se cultiva con paciencia.",
    description:
      "Hatun Tortuga te enseña a detenerte, confiar en el proceso y encontrar sabiduría en la lentitud.",
    image: "/guides/hatun3d.png",
    imageTransparent: "/guides/hatun-transparent.png",
  },
  {
    id: "pajaro",
    name: "Pájaro Brujo",
    subtitle: "Voz interior",
    phrase: "Tu autenticidad es medicina.",
    description:
      "Pájaro Brujo te anima a expresar lo que sientes, recordándote que tu voz es parte del equilibrio del mundo.",
    image: "/guides/mago3d.png",
    imageTransparent: "/guides/mago-transparent.png",
  },
];
