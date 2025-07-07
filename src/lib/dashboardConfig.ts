import { FiActivity } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import AssistantSection from "@/components/dashboard/AssistantSetion";
import GeneratedStories from "@/components/dashboard/GeneratedStories";
import CursoSection from "@/components/curso/CourseSection";

export const dashboardSections = [
  {
    id: "asistente",
    label: "Crear guía",
    href: "/parentDashboard?section=asistente",
    icon: HiSparkles,
    component: AssistantSection,
    description: "Genera guías prácticas y empáticas",
    disabled: false,
    comingSoon: false,
  },
  {
    id: "guides",
    label: "Guías",
    href: "/parentDashboard?section=guides",
    icon: FiActivity,
    component: GeneratedStories,
    description: "Tus guías generadas",
    disabled: false,
    comingSoon: false,
  },
  {
    id: "curso",
    label: "Curso Guías Conscientes",
    href: "/parentDashboard?section=curso",
    icon: FiActivity,
    component: CursoSection,
    description: "Formación integral en desarrollo emocional",
    disabled: false,
    comingSoon: false,
  },
  // {
  //   id: "ninos",
  //   label: "Mis Exploradores",
  //   href: "/parentDashboard?section=ninos",
  //   icon: FiUsers,
  //   component: ManageChildrenSection,
  //   description: "Gestiona y acompaña el progreso de tus exploradores",
  //   disabled: true,
  //   comingSoon: true,
  // },
  // {
  //   id: "bitacora",
  //   label: "Bitácora Emocional",
  //   href: "/parentDashboard?section=bitacora",
  //   icon: FiActivity,
  //   component: EmotionalJournalSection,
  //   description: "Registra y analiza el desarrollo emocional",
  //   disabled: true,
  //   comingSoon: true,
  // },
  // {
  //   id: "recursos",
  //   label: "Centro de Guías",
  //   href: "/parentDashboard?section=recursos",
  //   icon: FiBookOpen,
  //   component: ResourcesPageLayout,
  //   description: "Accede a guías, recursos y materiales educativos",
  //   disabled: true,
  //   comingSoon: true,
  // },
];
