"use client";
import InputWithLabel from "@/components/ui/InputWithLabel";
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { loginUser } from "@/services/authService";

interface LoginData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const LoginForm: React.FC = () => {
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
      const result = await loginUser(loginData);

      setApiFeedback({
        type: "success",
        message: result.message,
      });
      setIsSubmitting(false);
      router.push("/parentDashboard");
    } catch (error) {
      if (error instanceof Error) {
        setApiFeedback({
          type: "error",
          message: error.message || "Error al iniciar sesión.",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {apiFeedback && (
        <div
          className={`my-5 p-3 rounded-md text-sm ${
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
        label="Correo Electrónico"
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
      <Button
        type="submit"
        className="w-full mt-5 transition focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Iniciando Sesión..." : "Iniciar Sesión"}
      </Button>
    </form>
  );
};

export default LoginForm;
