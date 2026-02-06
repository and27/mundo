import { Story } from "@/types/story";

export const losOjosDelCondorStory: Story = {
  id: "kuntur", // Identificador único para este viaje
  title: "Los Ojos del Cóndor", // Título del viaje
  guideId: "kuntur", // ID de Kuntur como guía
  description:
    "Aprende a ver el mundo con perspectiva y conecta con tus emociones junto a Kuntur.", // Descripción del viaje
  coverImage: "/covers/kuntur_cover.png", // Imagen de portada del viaje
  category: "emotions", // Categoría del viaje (emociones, calma, etc.)
  initialStepId: "ko_intro_a", // El primer paso de la historia
  steps: [
    // --- Inicio: Introducción ---
    {
      id: "ko_intro_a",
      audioSrc: "/audio/kuntur/ko_intro_a.mp3",
      subtitle:
        "¿Te gustaría volar conmigo por encima de las nubes? Veremos el mundo con otros ojos... los ojos del corazón.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey4/altas_cumbres.png", // Fondo inicial de cumbres
      },
      interaction: { type: "auto_proceed", nextStepId: "ko_intro_b" },
      isNarration: true,
    },
    {
      id: "ko_intro_b",
      audioSrc: "/audio/kuntur/ko_intro_b.mp3",
      subtitle:
        "¡Mira qué alto estamos! Aquí arriba, todo se ve distinto, ¿verdad? El mundo se despliega como un tejido hermoso. Respira este aire limpio de las cumbres...",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey4/valle_amplio.png", // Vista amplia del valle
      },
      interaction: { type: "auto_proceed", nextStepId: "ko_respiracion_a" }, // Transición a la respiración
      isNarration: true,
    },
    // --- Momento de Calma y Respiración (AÑADIDO en V2.0) ---
    {
      id: "ko_respiracion_a",
      audioSrc: "/audio/kuntur/ko_respiracion_a.mp3",
      subtitle:
        "Siente la tranquilidad aquí arriba. El viento nos susurra calma. Vamos a tomar un momento para sentir esa calma en nosotros. Cierra tus ojos suavemente si quieres, o simplemente mira el vasto cielo.",
      visuals: {
        type: "scene", // Podría ser un visual más abstracto o enfocado en Kuntur calmado
        backgroundImage: "/images/journey4/cielo_sereno.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "ko_respiracion_b" },
      isNarration: true,
    },
    {
      id: "ko_respiracion_b",
      audioSrc: "/audio/kuntur/ko_respiracion_b.mp3",
      subtitle:
        "Ahora, inhala... siente el aire fresco llenar tus pulmones... y exhala... dejando ir cualquier tensión. De nuevo, inhala paz... y exhala despacio...", // Subtítulo guía la respiración
      visuals: {
        type: "breathing", // Tipo de visualización para guiar la respiración
        // backgroundImage: "/images/journey4/cielo_sereno.png", // Mantener el fondo o cambiar
      },
      interaction: { type: "auto_proceed", nextStepId: "ko_observacion_intro" }, // Continuar después de la respiración guiada (asumiendo que la visualización de respiración tiene una duración definida)
      isNarration: true,
    },
    // --- Continuación de la Escena del Viaje / Observación ---
    {
      id: "ko_observacion_intro",
      audioSrc: "/audio/kuntur/ko_observacion_intro.mp3",
      subtitle:
        "Desde aquí, podemos ver historias pequeñas que abajo no se notan. Observa conmigo... con atención...",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey4/valle_amplio.png", // Vuelve a la vista amplia del valle
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "ko_observacion_vicuna",
      }, // Pasa a la primera viñeta
      isNarration: true,
    },
    // --- Escenas de Observación Múltiples (MODIFICADO en V2.0) ---
    {
      id: "ko_observacion_vicuna",
      audioSrc: "/audio/kuntur/ko_observacion_vicuna.mp3",
      subtitle:
        "allá abajo, cerca del río... ¿Ves a esa pequeña vicuña? Parece que se ha alejado de su familia. Mira cómo está quietecita... su cabeza un poco baja...",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey4/vicuna_sola_vista.png", // Imagen enfocada en la vicuña
        // Podría incluir un campo para "subtleAnimationKey": "vicuna_sad" si la estructura visual lo soporta
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "ko_observacion_pajaros",
      }, // Pasa a la siguiente viñeta
      isNarration: true,
    },
    {
      id: "ko_observacion_pajaros",
      audioSrc: "/audio/kuntur/ko_observacion_pajaros.mp3",
      subtitle:
        "O mira a esos pajaritos allá. El viento es fuerte en las alturas... ¿cómo se ven acurrucados entre las rocas?",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey4/pajaros_acurrucados.png", // Imagen enfocada en los pájaros
        // Podría incluir un campo para "subtleAnimationKey": "birds_cold"
      },
      interaction: { type: "auto_proceed", nextStepId: "ko_observacion_flor" }, // Pasa a la siguiente viñeta
      isNarration: true,
    },
    {
      id: "ko_observacion_flor",
      audioSrc: "/audio/kuntur/ko_observacion_flor.mp3",
      subtitle: "Y esa pequeña flor... se ve un poco cansada, ¿verdad?",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey4/flor_cansada.png", // Imagen enfocada en la flor
        // Podría incluir un campo para "subtleAnimationKey": "flower_drooping"
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "ko_identificar_emocion_intro",
      }, // Pasa a la interacción de identificar emoción
      isNarration: true,
    },
    // --- Identificando la Emoción (Refinado en V2.0) ---
    {
      id: "ko_identificar_emocion_intro",
      audioSrc: "/audio/kuntur/ko_identificar_emocion_intro.mp3",
      subtitle:
        "Hemos visto diferentes seres en el valle. Ahora, piensa en la pequeña vicuñita cerca del río.", // Kuntur menciona una viñeta específica para la interacción
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey4/vicuna_sola_vista.png", // Vuelve a mostrar la viñeta de la vicuña
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "ko_identificar_emocion_tap",
      },
      isNarration: true,
    },
    {
      id: "ko_identificar_emocion_tap",
      audioSrc: "/audio/kuntur/ko_identificar_emocion_tap.mp3",
      subtitle:
        "¿Cómo crees que se siente esa vicuñita ahora mismo? Toca la palabra o el dibujo que mejor te parece.",
      visuals: {
        type: "choice", // O un tipo visual que superponga opciones sobre la escena
        backgroundImage: "/images/journey4/vicuna_sola_vista.png",
        choices: [
          // Opciones de emoción para tocar
          {
            id: "emotion_triste",
            icon: "/images/icons/triste.png",
            label: "Triste",
          },
          { id: "emotion_sola", icon: "/images/icons/sola.png", label: "Sola" },
          {
            id: "emotion_asustada",
            icon: "/images/icons/asustada.png",
            label: "Asustada",
          },
          {
            id: "emotion_calmada",
            icon: "/images/icons/calmada.png",
            label: "Calmada",
          }, // Opción distractora
        ],
        // Podría incluir un campo para "subtleAnimationTargetId": "vicuna_sola_vista" para que la animación ocurra sobre el visual principal tras la selección
      },
      interaction: {
        type: "wait_for_tap",
        tappableTarget: "choice", // Espera a que el usuario toque una opción
        // Asumimos que la lógica para manejar la elección (validación, posible animación sutil) se maneja internamente basado en el choice.id seleccionado
        defaultNextStepId: "ko_feedback_emocion", // Pasa al feedback general de la elección
      },
      isNarration: true,
    },
    {
      id: "ko_feedback_emocion",
      audioSrc: "/audio/kuntur/ko_feedback_emocion.mp3",
      subtitle:
        "Sí... quizás se siente así. A nadie le gusta estar solito o sentirse perdido. Es normal sentir esas cosas a veces.", // Feedback empático generalizado sobre la elección
      visuals: {
        type: "scene", // Puede volver a la vicuña con la animación sutil activada por la interacción anterior
        backgroundImage: "/images/journey4/vicuna_sola_vista.png",
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "ko_autoconciencia_intro",
      }, // Pasa a la reflexión sobre la propia emoción
      isNarration: true,
    },
    // --- Conectando con la Propia Emoción y Enlazando a la Bitácora (MODIFICADO en V2.0) ---
    {
      id: "ko_autoconciencia_intro",
      audioSrc: "/audio/kuntur/ko_autoconciencia_intro.mp3",
      subtitle:
        "Y ahora, mientras ves a la vicuñita desde aquí arriba... ¿qué color pondrías tú a la sensación que nace en tu propio corazón al observarla y pensar en cómo se siente?", // Pregunta reformulada
      visuals: {
        type: "scene", // Podría ser un visual más introspectivo o mantener la viñeta
        backgroundImage: "/images/journey4/foco_corazon.png", // Visual que represente el foco interior/corazón
      },
      interaction: {
        type: "auto_proceed",
        nextStepId: "ko_bitacora_color_tap",
      }, // Pasa directamente a la selección de color en la Bitácora
      isNarration: true,
    },
    {
      id: "ko_bitacora_color_tap",
      audioSrc: "/audio/kuntur/ko_bitacora_color_tap.mp3", // Audio que guía la selección del color
      subtitle:
        "Elige el color en tu Bitácora que mejor represente tu propia sensación en este momento. Toca el color que sientes.", // Subtítulo guía la acción
      visuals: {
        type: "scene", // Tipo de visualización para la paleta de colores de la Bitácora
        // backgroundImage: "/images/journey4/foco_corazon.png", // Mantener el fondo o cambiar a la interfaz de Bitácora
      },
      interaction: {
        type: "wait_for_tap",
        tappableTarget: "color_choice", // Espera a que el usuario toque un color en la paleta
        // Asumimos que la selección de color se maneja internamente basado en el id o valor del color tocado
        defaultNextStepId: "ko_feedback_bitacora", // Pasa al feedback de la Bitácora
      },
      isNarration: true,
    },
    {
      id: "ko_feedback_bitacora",
      audioSrc: "/audio/kuntur/ko_feedback_bitacora.mp3",
      subtitle:
        "Gracias por compartir el color de tu corazón hoy. Observar y reconocer lo que sentimos es el primer paso.", // Feedback de Kuntur sobre la selección de color
      visuals: {
        type: "scene", // Podría mostrar el color seleccionado integrándose en un visual de bitácora simple
        backgroundImage: "/images/journey4/bitacora_registro_color.png",
      },
      interaction: { type: "auto_proceed", nextStepId: "ko_mensaje_cierre_a" }, // Pasa al mensaje de cierre
      isNarration: true,
    },
    // --- Mensaje y Cierre ---
    {
      id: "ko_mensaje_cierre_a",
      audioSrc: "/audio/kuntur/ko_mensaje_cierre_a.mp3",
      subtitle:
        "Ver desde la distancia nos ayuda a entender, a conectar con lo que otros sienten. Eso es la empatía, como un hilo invisible que nos une.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey4/vista_panoramica_final.png", // Vuelve a la vista amplia final
      },
      interaction: { type: "auto_proceed", nextStepId: "ko_mensaje_cierre_b" },
      isNarration: true,
    },
    {
      id: "ko_mensaje_cierre_b",
      audioSrc: "/audio/kuntur/ko_mensaje_cierre_b.mp3",
      subtitle:
        "No siempre podemos bajar a cambiar las cosas, pero siempre podemos enviar un pensamiento bueno, como una pluma suave que lleva el viento.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey4/vista_panoramica_final.png",
        // animation: "feather_floats_away", // Si la estructura soporta animaciones
      },
      interaction: { type: "auto_proceed", nextStepId: "ko_mensaje_cierre_c" },
      isNarration: true,
    },
    {
      id: "ko_mensaje_cierre_c",
      audioSrc: "/audio/kuntur/ko_mensaje_cierre_c.mp3",
      subtitle:
        "Gracias por volar conmigo y abrir tu mirada y tu corazón. Que siempre recuerdes ver el mundo con claridad y cariño.",
      visuals: {
        type: "scene",
        backgroundImage: "/images/journey4/kuntur_se_eleva.png", // Kuntur se eleva
      },
      interaction: { type: "auto_proceed", nextStepId: "ko_outro_final" }, // Transición a la pantalla final/resumen
      isNarration: true,
    },
    // --- Outro / Pantalla Final (MODIFICADO en V2.0) ---
    {
      id: "ko_outro_final",
      audioSrc: "/audio/kuntur/ko_outro_final.mp3", // Audio final si es necesario, o silencio
      subtitle: "Viaje completado.", // Mensaje final
      visuals: {
        type: "scene", // Tipo de visualización para la pantalla final
        backgroundImage: "/images/journey4/pantalla_final_resumen.png",
        // Podría mostrar el color de la Bitácora seleccionado para este viaje aquí
      },
      interaction: { type: "auto_proceed", nextStepId: "end" }, // Finaliza el viaje
      isNarration: true, // O false si es solo una pantalla estática final
    },
  ],
};
