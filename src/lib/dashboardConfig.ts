import { FiUsers, FiBookOpen, FiActivity } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

import ManageChildrenSection from "@/components/dashboard/ManageChildrenSection";
import ResourcesPageLayout from "@/components/dashboard/resources/ResourcesPageLayout";
import EmotionalJournalSection from "@/components/dashboard/EmotionalJournalSection";
import AssistantSection from "@/components/dashboard/AssistantSetion";

export const dashboardSections = [
  {
    id: "asistente",
    label: "Guía emocional",
    href: "/parentDashboard?section=asistente",
    icon: HiSparkles,
    component: AssistantSection,
    description: "Genera guías prácticas y empáticas para cualquier situación",
  },

  {
    id: "ninos",
    label: "Mis Exploradores",
    href: "/parentDashboard?section=ninos",
    icon: FiUsers,
    component: ManageChildrenSection,
    description: "Gestiona y acompaña el progreso de tus exploradores",
  },

  {
    id: "bitacora",
    label: "Bitácora Emocional",
    href: "/parentDashboard?section=bitacora",
    icon: FiActivity,
    component: EmotionalJournalSection,
    description: "Registra y analiza el desarrollo emocional",
  },
  {
    id: "recursos",
    label: "Centro de Guías",
    href: "/parentDashboard?section=recursos",
    icon: FiBookOpen,
    component: ResourcesPageLayout,
    description: "Accede a guías, recursos y materiales educativos",
  },
];
