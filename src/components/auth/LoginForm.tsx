"use client";

import InputWithLabel from "@/components/ui/InputWithLabel";
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
// import { loginUser } from "@/services/authService"; // Descomentar cuando el servicio esté listo

interface LoginData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiFeedback, setApiFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setApiFeedback(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setApiFeedback(null);

    const newErrors: LoginErrors = {};
    if (!loginData.email) {
      newErrors.email = "El correo es obligatorio.";
    }
    if (!loginData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // const result = await loginUser(loginData);
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (loginData.email === "mundo" && loginData.password === "12345") {
        setApiFeedback({
          type: "success",
          message: "¡Inicio de sesión exitoso! Redirigiendo...",
        });

        if (onSuccess) onSuccess();

        setTimeout(() => {
          router.push("/parentDashboard");
        }, 1000);
      } else {
        throw new Error(
          "Credenciales inválidas. Intenta con 'mundo' y '12345'."
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        setApiFeedback({
          type: "error",
          message: error.message || "Error al iniciar sesión.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {apiFeedback && (
        <div
          className={`p-3 rounded-md text-sm ${
            apiFeedback.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
          role="alert"
        >
          {apiFeedback.message}
        </div>
      )}
      <InputWithLabel
        label="Correo Electrónico o Usuario"
        name="email"
        type="text"
        value={loginData.email}
        handleChange={handleChange}
        error={errors.email}
      />
      <InputWithLabel
        label="Contraseña"
        name="password"
        type="password"
        value={loginData.password}
        handleChange={handleChange}
        error={errors.password}
      />
      <button
        type="submit"
        className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 mt-2 rounded-md hover:bg-yellow-300 transition focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Iniciando Sesión..." : "Iniciar Sesión"}
      </button>
    </form>
  );
};

export default LoginForm;
