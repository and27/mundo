"use client";

import InputWithLabel from "@/components/ui/InputWithLabel";
import Link from "next/link";
import { useState } from "react";

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
  role?: string;
}

const Register = () => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState<RegistrationErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors({});

    const { email, password, confirmPassword } = registrationData;

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

    if (!confirmPassword) {
      newErrors.confirmPassword = "Debes confirmar la contraseña.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    console.log(
      "Datos del formulario válidos, enviando a backend:",
      registrationData
    );

    console.log("Registro exitoso!");

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center mt-10 md:mt-0 md:p-5">
      <div className=" rounded-lg py-10 md:py-16 p-5 md:p-8 shadow-lg backgrop-blur-sm bg-black/30 md:bg-black/20  max-w-lg w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-16 text-center">
          Regístrate como Facilitador
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <InputWithLabel
            label="Correo Electrónico"
            name="email"
            type="email"
            handleChange={handleChange}
            error={errors.email}
          />

          <InputWithLabel
            label="Contraseña"
            name="password"
            type="password"
            handleChange={handleChange}
            error={errors.password}
          />

          <InputWithLabel
            label="Confirmar Contraseña"
            name="confirmPassword"
            type="password"
            handleChange={handleChange}
            error={errors.confirmPassword}
          />

          <div className="-mt-5">
            <label htmlFor="role" className="block text-white text-sm mb-2">
              Soy principalmente... (Opcional)
            </label>
            <select
              id="role"
              name="role"
              className="w-full p-3 rounded-md border border-white text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={handleChange}
            >
              <option value="">Selecciona uno</option>
              <option value="parent">Padre/Madre/Tutor</option>
              <option value="educator">Educador/Maestro</option>
              <option value="therapist">Terapeuta/Psicólogo</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 px-4 mt-4 rounded-md hover:bg-yellow-300 transition focus:outline-none focus:ring-2 focus:ring-yellow-500"
            disabled={isSubmitting}
          >
            Crear Cuenta
          </button>
        </form>

        <p className="mt-6 text-center text-white/80 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/acceso"
            className="text-white font-semibold hover:underline"
          >
            Iniciar sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
