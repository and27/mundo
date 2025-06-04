"use client";

import React, { useState, useEffect, FC } from "react";
import {
  HiOutlineShare,
  HiOutlineX,
  HiOutlineMail,
  HiOutlineDeviceMobile,
  HiOutlineLink,
  HiOutlineChevronDown,
  HiOutlineUserCircle,
  HiOutlineChatAlt,
  HiOutlineCheckCircle, // Importado para el mensaje de éxito
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

interface Child {
  id: string;
  name: string;
  age: number;
  emoji: string;
  hasApp?: boolean;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityTitle: string;
  activityId: string; // Para construir el link a compartir
  childrenProfiles?: Child[];
}

const ShareModal: FC<ShareModalProps> = ({
  isOpen,
  onClose,
  activityTitle,
  activityId,
  childrenProfiles = [
    { id: "maria", name: "María P.", age: 8, emoji: "🦄", hasApp: true },
    { id: "carlos", name: "Carlos G.", age: 6, emoji: "🚀", hasApp: false },
    { id: "lucia", name: "Lucía V.", age: 10, emoji: "🎨", hasApp: true },
  ],
}) => {
  const [selectedChild, setSelectedChild] = useState<Child | undefined>(
    childrenProfiles.length > 0 ? childrenProfiles[0] : undefined
  );
  const [isChildDropdownOpen, setIsChildDropdownOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState(
    "¡Mira esta actividad! Creo que te ayudará mucho."
  );
  const [shareMethod, setShareMethod] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setSelectedChild(
          childrenProfiles.length > 0 ? childrenProfiles[0] : undefined
        );
        setIsChildDropdownOpen(false);
        setCustomMessage("¡Mira esta actividad! Creo que te ayudará mucho.");
        setShareMethod(null);
        setIsSharing(false);
        setShowSuccess(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, childrenProfiles]);

  const handleShare = async (method: string) => {
    if (!selectedChild) {
      alert("Por favor, selecciona un explorador para continuar.");
      return;
    }
    setIsSharing(true);
    setShareMethod(method);
    setShowSuccess(false);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const shareLink = `https://tuapp.com/actividad/${activityId}?explorador=${selectedChild.id}`;
    const messageToSend = `¡Hola ${selectedChild.name}! Tu guía te recomienda esta actividad: "${activityTitle}".\n${customMessage}\nEnlace: ${shareLink}`;

    switch (method) {
      case "email":
        console.log(
          `Simulando envío por email a padres de: ${selectedChild.name}. Mensaje: ${messageToSend}`
        );
        window.location.href = `mailto:?subject=Actividad recomendada: ${activityTitle}&body=${encodeURIComponent(
          messageToSend
        )}`;
        break;
      case "whatsapp":
        console.log(
          `Simulando generación de link de WhatsApp para: ${selectedChild.name}. Mensaje: ${messageToSend}`
        );
        window.open(
          `https://wa.me/?text=${encodeURIComponent(messageToSend)}`,
          "_blank"
        );
        break;
      case "app":
        console.log(
          `Simulando envío de notificación a app de: ${selectedChild.name}. Mensaje: ${messageToSend}`
        );
        break;
      case "link":
        console.log(
          `Copiando link para: ${selectedChild.name}. Link: ${shareLink}`
        );
        try {
          await navigator.clipboard.writeText(shareLink);
        } catch (err) {
          console.error("Error al copiar el link: ", err);
        }
        break;
    }

    setIsSharing(false);
    setShowSuccess(true);
    const successTimer = setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2500);
    return () => clearTimeout(successTimer);
  };

  const getShareFeedbackMessage = () => {
    if (!selectedChild) return "Selecciona un explorador...";
    switch (shareMethod) {
      case "email":
        return `Preparando email para los padres de ${selectedChild.name}...`;
      case "whatsapp":
        return `Abriendo WhatsApp para compartir con ${selectedChild.name}...`;
      case "app":
        return `Enviando notificación a la app de ${selectedChild.name}...`;
      case "link":
        return `Copiando link para la actividad de ${selectedChild.name}...`;
      default:
        return "Compartiendo...";
    }
  };

  const getSuccessMessageText = () => {
    if (!selectedChild) return "Acción cancelada.";
    switch (shareMethod) {
      case "email":
        return `¡Email listo para enviar a los padres de ${selectedChild.name}!`;
      case "whatsapp":
        return `¡Listo para compartir por WhatsApp con ${selectedChild.name}!`;
      case "app":
        return `¡Notificación enviada a ${selectedChild.name}!`;
      case "link":
        return `¡Link copiado al portapapeles!`;
      default:
        return "¡Compartido exitosamente!";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={!isSharing ? onClose : undefined}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 10,
              transition: { duration: 0.2 },
            }}
            transition={{ type: "spring", damping: 18, stiffness: 200 }}
            className="relative w-full max-w-lg glass-strong rounded-2xl shadow-xl overflow-hidden border border-white/10"
          >
            <div className="flex items-center justify-between p-5 bg-gradient-primary text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <HiOutlineShare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base sm:text-lg">
                    Compartir Actividad
                  </h2>
                  <p className="text-xs sm:text-sm opacity-80 truncate max-w-[200px] sm:max-w-xs">
                    {activityTitle}
                  </p>
                </div>
              </div>
              {!isSharing && !showSuccess && (
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Cerrar modal"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
              )}
            </div>

            {(isSharing || showSuccess) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 p-6 text-center"
              >
                {!showSuccess ? (
                  <>
                    <div className="w-10 h-10 border-4 border-color-primary-300/30 border-t-color-primary-400 rounded-full animate-spin mb-4" />
                    <p className="text-foreground font-medium">
                      {getShareFeedbackMessage()}
                    </p>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="w-12 h-12 bg-color-accent-success/20 rounded-full flex items-center justify-center mb-4"
                    >
                      <HiOutlineCheckCircle className="w-8 h-8 text-color-accent-success" />
                    </motion.div>
                    <p className="text-foreground font-medium text-lg">
                      {getSuccessMessageText()}
                    </p>
                  </>
                )}
              </motion.div>
            )}

            <div
              className={`p-5 sm:p-6 space-y-5 text-foreground ${
                isSharing || showSuccess
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground/90 mb-2">
                  <HiOutlineUserCircle className="w-5 h-5 text-color-primary-300" />
                  ¿Para quién es esta actividad?
                </label>
                {childrenProfiles.length > 0 && selectedChild ? (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setIsChildDropdownOpen(!isChildDropdownOpen)
                      }
                      className="w-full flex items-center justify-between p-3 bg-black/20 border border-white/20 rounded-xl hover:bg-black/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{selectedChild.emoji}</span>
                        <div className="text-left">
                          <p className="font-medium text-sm">
                            {selectedChild.name}
                          </p>
                          <p className="text-xs text-foreground/70">
                            {selectedChild.age} años
                          </p>
                        </div>
                      </div>
                      <HiOutlineChevronDown
                        className={`w-5 h-5 text-foreground/50 transition-transform ${
                          isChildDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isChildDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="absolute top-full left-0 right-0 mt-1 glass-medium border border-white/10 rounded-xl shadow-lg z-30 overflow-y-auto max-h-40 scrollbar-hide"
                        >
                          {childrenProfiles.map((child) => (
                            <button
                              key={child.id}
                              onClick={() => {
                                setSelectedChild(child);
                                setIsChildDropdownOpen(false);
                              }}
                              className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors text-left text-foreground first:rounded-t-xl last:rounded-b-xl"
                            >
                              <span className="text-xl">{child.emoji}</span>
                              <div>
                                <p className="font-medium text-sm">
                                  {child.name}
                                </p>
                                <p className="text-xs text-foreground/70">
                                  {child.age} años
                                </p>
                              </div>
                              {child.hasApp && (
                                <span className="ml-auto bg-color-accent-success/20 text-color-accent-success text-[10px] px-1.5 py-0.5 rounded-full">
                                  En la App
                                </span>
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <p className="text-sm text-foreground/60 p-3 bg-black/10 border border-white/10 rounded-lg text-center">
                    No hay perfiles de exploradores asociados.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="customMessage"
                  className="flex items-center gap-2 text-sm font-medium text-foreground/90 mb-2"
                >
                  <HiOutlineChatAlt className="w-5 h-5 text-color-primary-300" />
                  Añade un mensaje (opcional):
                </label>
                <textarea
                  id="customMessage"
                  rows={2}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Ej: ¡Creo que esta actividad te encantará!"
                  className="w-full p-3 rounded-lg bg-black/20 border border-white/20 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-1 focus:ring-color-accent-magic transition-all resize-none scrollbar-hide"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground/90 mb-2">
                  <HiOutlineShare className="w-5 h-5 text-color-primary-300" />
                  Elige cómo compartir:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      method: "app",
                      label: "Enviar a App",
                      sub: selectedChild?.hasApp
                        ? "Del Explorador"
                        : "No disponible",
                      icon: <HiOutlineDeviceMobile />,
                      color: "purple",
                      available: !!selectedChild?.hasApp,
                    },
                    {
                      method: "email",
                      label: "Email",
                      sub: "A los Padres",
                      icon: <HiOutlineMail />,
                      color: "blue",
                      available: true,
                    },
                    {
                      method: "whatsapp",
                      label: "WhatsApp",
                      sub: "Link Directo",
                      icon: (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.712-1.001z" />
                        </svg>
                      ),
                      color: "green",
                      available: true,
                    },
                    {
                      method: "link",
                      label: "Copiar Link",
                      sub: "Manual",
                      icon: <HiOutlineLink />,
                      color: "gray",
                      available: true,
                    },
                  ].map((item) => (
                    <button
                      key={item.method}
                      onClick={() =>
                        item.available &&
                        selectedChild &&
                        handleShare(item.method)
                      }
                      disabled={!item.available || !selectedChild}
                      className={`p-3 sm:p-4 rounded-xl transition-all duration-200 group relative flex flex-col items-center justify-center text-center 
                        ${
                          !item.available || !selectedChild
                            ? "bg-black/10 border border-white/10 text-foreground/30 cursor-not-allowed"
                            : `bg-black/20 border border-white/20 text-foreground/80 hover:border-${item.color}-500/50 hover:bg-${item.color}-500/10 hover:text-${item.color}-300`
                        }`}
                    >
                      <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 mb-1.5 transition-transform group-hover:scale-110 ${
                          (!item.available || !selectedChild) && "opacity-50"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <p
                        className={`font-medium text-xs sm:text-sm ${
                          (!item.available || !selectedChild) && "opacity-50"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p
                        className={`text-[10px] sm:text-xs opacity-60 ${
                          (!item.available || !selectedChild) && "opacity-50"
                        }`}
                      >
                        {item.sub}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

ShareModal.displayName = "ShareModal";

export default ShareModal;
