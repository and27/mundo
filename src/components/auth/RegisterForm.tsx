"use client";

import InputWithLabel from "@/components/ui/InputWithLabel";
import { useState, FormEvent, ChangeEvent } from "react";
import Button from "../ui/Button";
import { registerUser } from "@/services/authService";
// import { registerUser } from "@/services/authService"; // Descomentar cuando el servicio esté listo

interface RegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}

interface RegistrationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiFeedback, setApiFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setApiFeedback(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setApiFeedback(null);

    const { email, password, confirmPassword, role } = registrationData;
    const newErrors: RegistrationErrors = {};

    if (!email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Formato de correo electrónico inválido.";
    }
    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = { email, password, role: role || undefined };
      const result = await registerUser(payload);
      setApiFeedback({
        type: "success",
        message: result.message,
      });
      setRegistrationData({
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      if (error instanceof Error)
        setApiFeedback({
          type: "error",
          message: error.message || "Ocurrió un error en el registro.",
        });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {apiFeedback && (
        <div
          className={`mb-4 rounded-md text-sm ${
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
        type="email"
        value={registrationData.email}
        handleChange={handleChange}
        error={errors.email}
      />
      <InputWithLabel
        label="Contraseña"
        name="password"
        type="password"
        value={registrationData.password}
        handleChange={handleChange}
        error={errors.password}
      />
      <InputWithLabel
        label="Confirmar Contraseña"
        name="confirmPassword"
        type="password"
        value={registrationData.confirmPassword}
        handleChange={handleChange}
        error={errors.confirmPassword}
      />
      <div className="-mt-1">
        <label htmlFor="role" className="block text-white text-sm mb-2">
          Soy principalmente... (Opcional)
        </label>
        <select
          id="role"
          name="role"
          value={registrationData.role}
          className="w-full p-3 rounded-md border border-white/50 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-transparent appearance-none"
          onChange={handleChange}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "1.5em 1.5em",
          }}
        >
          <option value="" className="text-gray-700 bg-white">
            Selecciona uno
          </option>
          <option value="parent" className="text-gray-700 bg-white">
            Padre/Madre/Tutor
          </option>
          <option value="educator" className="text-gray-700 bg-white">
            Educador/Maestro
          </option>
          <option value="therapist" className="text-gray-700 bg-white">
            Terapeuta/Psicólogo
          </option>
          <option value="other" className="text-gray-700 bg-white">
            Otro
          </option>
        </select>
      </div>
      <Button
        type="submit"
        className="w-full mt-5 transition focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
      </Button>
    </form>
  );
};

export default RegisterForm;
