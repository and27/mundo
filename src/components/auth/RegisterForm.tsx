"use client";

import InputWithLabel from "@/components/ui/InputWithLabel";
import { useState, FormEvent, ChangeEvent } from "react";
import Button from "../ui/Button";
import { registerUser } from "@/services/authService";
// import { registerUser } from "@/services/authService"; // Descomentar cuando el servicio est' listo
import { useAsyncSubmit } from "@/hooks/useAsyncSubmit";
import { toast } from "sonner";

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

const passwordMinLength = 8;

const getPasswordError = (password: string) => {
  if (password.length < passwordMinLength) {
    return "La contrase¤a debe tener al menos 8 caracteres.";
  }
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return "La contrase¤a debe incluir letras y numeros.";
  }
  return "";
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const { isSubmitting, run } = useAsyncSubmit();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const { email, password, confirmPassword, role } = registrationData;
    const newErrors: RegistrationErrors = {};

    if (!email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Formato de correo electrónico invÿlido.";
    }
    if (!password) {
      newErrors.password = "La contrase¤a es obligatoria.";
    } else {
      const passwordError = getPasswordError(password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contrase¤a.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contrase¤as no coinciden.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await run(async () => {
      try {
        const payload = { email, password, role: role || undefined };
        const result = await registerUser(payload);
        toast.success(result.message);
        setRegistrationData({
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
        if (onSuccess) onSuccess();
      } catch (error) {
        if (error instanceof Error)
          toast.error(error.message || "Ocurrió un error en el registro.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <InputWithLabel
        label="Correo Electr¢nico"
        name="email"
        type="email"
        value={registrationData.email}
        handleChange={handleChange}
        error={errors.email}
        inputProps={{
          autoComplete: "email",
          autoCapitalize: "none",
          autoCorrect: "off",
          inputMode: "email",
          spellCheck: false,
        }}
      />
      <InputWithLabel
        label="Contrase¤a"
        name="password"
        type="password"
        value={registrationData.password}
        handleChange={handleChange}
        error={errors.password}
        inputProps={{
          autoComplete: "new-password",
          autoCapitalize: "none",
          autoCorrect: "off",
          minLength: passwordMinLength,
        }}
      />
      <InputWithLabel
        label="Confirmar Contrase¤a"
        name="confirmPassword"
        type="password"
        value={registrationData.confirmPassword}
        handleChange={handleChange}
        error={errors.confirmPassword}
        inputProps={{
          autoComplete: "new-password",
          autoCapitalize: "none",
          autoCorrect: "off",
          minLength: passwordMinLength,
        }}
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

