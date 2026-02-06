import React from "react";
import {
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineBeaker,
  HiOutlineChat,
  HiOutlineCollection,
} from "react-icons/hi";

export interface Tab {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const tabs: Tab[] = [
  { id: "overview", label: "Resumen", icon: HiOutlineEye },
  { id: "objectives", label: "Objetivos", icon: HiOutlineCheckCircle },
  { id: "preparation", label: "Preparación", icon: HiOutlineBeaker },
  { id: "guidance", label: "Guía", icon: HiOutlineChat },
  { id: "tools", label: "Herramientas", icon: HiOutlineCollection },
];
