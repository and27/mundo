import React from "react";
import { useRouter } from "next/navigation";
import { Sparkles, User, ArrowRight } from "lucide-react";

interface AccountPromptProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AccountPrompt: React.FC<AccountPromptProps> = ({
  isVisible,
  onClose,
}) => {
  const router = useRouter();

  if (!isVisible) return null;

  const handleCreateAccount = () => {
    router.push("/auth");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 animate-in slide-in-from-top-2 duration-500">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-slate-800 mb-2">
            ¡Guía guardada exitosamente!
          </h4>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Para acceder a tus guías guardadas desde cualquier dispositivo y
            recibir recomendaciones personalizadas, te invitamos a crear tu
            cuenta en Mundo Interior.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCreateAccount}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <User className="w-4 h-4" />
              <span>Crear cuenta gratuita</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onClose}
              className="px-6 py-3 text-slate-600 hover:text-slate-800 font-medium rounded-lg hover:bg-white/50 transition-all duration-200"
            >
              Más tarde
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
