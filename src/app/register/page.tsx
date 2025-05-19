"use client";

import InputWithLabel from "@/components/ui/InputWithLabel";
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
    <div className="md:p-5  md:mx-20 min-h-screen flex flex-col items-center ">
      <div className="w-full rounded-lg py-2 md:py-5 shadow-lg backgrop-blur-sm bg-black/30 md:bg-black/20">
        <div className="p-5 md:p-10 grid md:grid-cols-2 gap-10">
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-16">
              ¿Cómo funciona <i>Mundo Interior?</i>
            </h1>
            <div className="text-white space-y-4 text-base md:text-lg">
              <p>
                Con nuestra Metodología Mim, te guiamos para que acompañes a tus
                hijos a:
              </p>
              <ol className="list-decimal list-inside space-y-3 pl-2">
                <li>
                  <strong>Explorar Emociones:</strong> A través de cuentos
                  andinos interactivos, los niños identifican y nombran lo que
                  sienten en un entorno seguro y lúdico.
                </li>
                <li>
                  <strong>Encontrar la Calma:</strong> Con ejercicios de
                  respiración y mindfulness sencillos (de 5-10 min), aprenden
                  herramientas prácticas para gestionar el estrés y la ansiedad.
                </li>
                <li>
                  <strong>Cultivar su Fortaleza Interior:</strong> Las historias
                  y actividades están diseñadas para reforzar su
                  autoconocimiento, resiliencia y conexión con su rica herencia
                  cultural.
                </li>
              </ol>
              <p className="pt-4">Regístrate y empieza a guiar su camino</p>
            </div>
          </div>
          <div>
            <h2 className="flex gap-5 text-xl  font-bold text-white mb-16">
              <p>Registrarme </p> |{" "}
              <p className="opacity-50"> Iniciar Sesión</p>
            </h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
