import React from "react";
import { HiOutlineLightBulb, HiOutlineStar } from "react-icons/hi";

export interface Ficha {
  id: string;
  title: string;
  type: string;
  icon: React.ReactNode;
  fullDescription: string;
  objectives: string[];
  materialsNeeded: string[];
  preparationSteps: string[];
  guidanceTips: string[];
  childContentLink: string;
  childContentPreview: string;
  duration: string;
  ageRange: string;
  difficulty: string;
  quickTips: string[];
}

export const fichas: Ficha[] = [
  {
    id: "explorando-la-ansiedad-tutor",
    title: "El Misterio de las Mariposas Inquietas",
    type: "Ficha para Tutor",
    icon: <HiOutlineLightBulb className="w-8 h-8 text-purple-400" />,
    fullDescription:
      "Esta guía te ayudará a utilizar la historia interactiva 'El Misterio de las Mariposas Inquietas' como una herramienta para conversar con los niños sobre la ansiedad, sus manifestaciones y estrategias simples para encontrar la calma.",
    objectives: [
      "Ayudar al niño a identificar las sensaciones físicas y emociones asociadas a la ansiedad.",
      "Introducir técnicas de respiración y mindfulness como herramientas de manejo.",
      "Fomentar un diálogo abierto sobre las preocupaciones y miedos.",
      "Reforzar la idea de que sentir ansiedad es normal y se puede aprender a manejar.",
    ],
    materialsNeeded: [
      "Acceso al cuento interactivo 'El Misterio de las Mariposas Inquietas'.",
      "Un espacio tranquilo y cómodo para la actividad.",
      "Opcional: Papel y colores para dibujar después de la historia.",
    ],
    preparationSteps: [
      "Familiarízate con el cuento interactivo y esta ficha guía.",
      "Prepara el ambiente: asegúrate de que sea un momento sin prisas ni interrupciones.",
      "Ten a mano cualquier material opcional que desees utilizar.",
    ],
    guidanceTips: [
      "Valida siempre las emociones del niño: 'Entiendo que te sientas así'.",
      "Anima la participación, pero no fuerces si el niño no quiere hablar de inmediato.",
      "Conecta la historia con sus propias experiencias: '¿Alguna vez te has sentido como el personaje...?'",
      "Celebra los pequeños pasos y esfuerzos.",
    ],
    childContentLink: "/cuentos/explorando-la-ansiedad",
    childContentPreview:
      "Cuento interactivo donde un personaje aprende a calmar sus 'mariposas en el estómago'.",
    duration: "25-30 min",
    ageRange: "6-12 años",
    difficulty: "Intermedio",
    quickTips: [
      "Usa el tono de voz calmado durante toda la sesión",
      "Si el niño se agita, pausa y haz respiraciones juntos",
      "Conecta con sus experiencias personales gradualmente",
    ],
  },
  {
    id: "el-reflejo-de-yachay-tutor",
    title: "El Reflejo de Yachay",
    type: "Ficha para Tutor",
    icon: <HiOutlineStar className="w-8 h-8 text-yellow-400" />,
    fullDescription:
      "Esta guía te ayudará a utilizar la conmovedora historia de 'El Reflejo de Yachay' para conversar con los niños sobre la autoestima, el reconocimiento del valor propio y la importancia de ser único. Una herramienta esencial para fortalecer su confianza interior.",
    objectives: [
      "Ayudar al niño a identificar sus propias cualidades y fortalezas únicas.",
      "Fomentar la aceptación de uno mismo y la validez de las emociones.",
      "Promover la reflexión interna sobre el valor personal, más allá de las comparaciones.",
      "Inspirar la confianza para 'brillar' con su luz interior.",
    ],
    materialsNeeded: [
      "Acceso al cuento interactivo 'El Reflejo de Yachay' (tu versión mejorada e interactiva).",
      "Un espejo pequeño (opcional, para la actividad de reconocer su reflejo).",
      "Papel y lápices de colores para dibujar sus propias 'luces' o cualidades.",
      "Un espacio tranquilo donde puedan hablar y reflexionar.",
    ],
    preparationSteps: [
      "Lee la historia de 'El Reflejo de Yachay' para familiarizarte con los personajes y el mensaje.",
      "Prepara el ambiente para la sesión, asegurando que sea un momento de conexión y sin interrupciones.",
      "Si usas materiales opcionales, tenlos a mano (ej. espejo, materiales de dibujo).",
      "Piensa en preguntas abiertas que puedan ayudar al niño a expresarse sobre cómo se siente consigo mismo.",
    ],
    guidanceTips: [
      "Valida cualquier sentimiento de comparación o inseguridad: 'Entiendo que a veces te sientas así, es normal'.",
      "Anima al niño a encontrar sus propias 'luces' o talentos, como Yachay recordó los suyos.",
      "Usa la analogía de las montañas de Kuntur para explicar que cada persona es valiosa por ser diferente.",
      "Haz hincapié en que el valor viene de dentro, como Yachay encontró su luz interior.",
      "Celebra sus pequeñas revelaciones y esfuerzos por reconocer su valía.",
      "Refuerza el mensaje clave: 'Tu valor no depende de ser como los demás, sino de ser la mejor versión de ti mismo.'",
    ],
    childContentLink: "/cuentos/yachay",
    childContentPreview:
      "Cuento interactivo donde Yachay, un joven jaguar, aprende a reconocer su valor único.",
    duration: "30-40 min",
    ageRange: "4-10 años",
    difficulty: "Fácil-Intermedio",
    quickTips: [
      "Enfócate en las cualidades únicas del niño, no en comparaciones.",
      "Fomenta la conversación sobre lo que les gusta de sí mismos.",
      "Recuérdales que todos somos especiales a nuestra manera.",
      "Permite que el niño lidere la conversación en momentos clave.",
    ],
  },
];
