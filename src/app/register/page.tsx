"use client";

import InputWithLabel from "@/components/ui/InputWithLabel";
import { useState, FormEvent, ChangeEvent } from "react";
import { registerUser } from "@/services/authService";
import { loginUser } from "@/services/authService";
import { useRouter } from "next/navigation";

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

interface LoginData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const LoginForm = ({ onSuccess }: { onSuccess?: () => void }) => {
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
    if (!loginData.email) newErrors.email = "El correo es obligatorio.";
    if (!loginData.password)
      newErrors.password = "La contraseña es obligatoria.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await loginUser(loginData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login attempt:", loginData);
      if (
        loginData.email === "test@example.com" &&
        loginData.password === "password"
      ) {
        setApiFeedback({
          type: "success",
          message: "¡Inicio de sesión exitoso!",
        });
        setLoginData({ email: "", password: "" });
        if (onSuccess) onSuccess();
        router.push("/dashboard");
      } else {
        throw new Error("Credenciales inválidas.");
      }
    } catch (error: any) {
      setApiFeedback({
        type: "error",
        message: error.message || "Error al iniciar sesión.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {apiFeedback && (
        <div
          className={`mb-4 p-3 rounded-md text-sm ${
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
        className="w-full bg-yellow-500 text-black py-3 px-4 mt-4 rounded-md hover:bg-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Iniciando Sesión..." : "Iniciar Sesión"}
      </button>
    </form>
  );
};
// --- Fin Componente LoginForm ---

const AuthTabsPage = () => {
  // Renombrado para reflejar su nuevo propósito
  // const router = useRouter(); // Para redirección
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");

  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [registrationErrors, setRegistrationErrors] =
    useState<RegistrationErrors>({});
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false);
  const [apiFeedbackRegister, setApiFeedbackRegister] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleRegisterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({ ...prev, [name]: value }));
    setRegistrationErrors((prev) => ({ ...prev, [name]: undefined }));
    setApiFeedbackRegister(null);
  };

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingRegister(true);
    setRegistrationErrors({});
    setApiFeedbackRegister(null);

    const { email, password, confirmPassword, role } = registrationData;
    const newErrors: RegistrationErrors = {};

    if (!email) newErrors.email = "El correo electrónico es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Formato de correo electrónico inválido.";
    if (!password) newErrors.password = "La contraseña es obligatoria.";
    else if (password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    if (!confirmPassword)
      newErrors.confirmPassword = "Debes confirmar la contraseña.";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    if (Object.keys(newErrors).length > 0) {
      setRegistrationErrors(newErrors);
      setIsSubmittingRegister(false);
      return;
    }

    try {
      const payload = { email, password, role: role || undefined };
      const result = await registerUser(payload);
      setApiFeedbackRegister({
        type: "success",
        message:
          result.message ||
          "¡Registro exitoso! Revisa tu correo para confirmar.",
      });
      setRegistrationData({
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
      // Opcionalmente, cambiar a la pestaña de login o redirigir
      // setTimeout(() => {
      //   setActiveTab("login");
      //   // router.push('/login?message=registration_successful');
      // }, 2000);
    } catch (error: any) {
      setApiFeedbackRegister({
        type: "error",
        message: error.message || "Ocurrió un error en el registro.",
      });
    } finally {
      setIsSubmittingRegister(false);
    }
  };

  const switchTab = (tab: "register" | "login") => {
    setActiveTab(tab);
    setRegistrationErrors({});
    setApiFeedbackRegister(null);
  };

  return (
    <div className="md:p-5 md:mx-20 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl rounded-lg py-2 md:py-5 shadow-lg backdrop-blur-sm bg-black/30 md:bg-black/20">
        <div className="p-5 md:p-10 flex flex-col-reverse lg:flex-row gap-x-10 gap-y-8">
          <div className="max-w-md">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-12">
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
                  andinos interactivos...
                </li>
                <li>
                  <strong>Encontrar la Calma:</strong> Con ejercicios de
                  respiración y mindfulness...
                </li>
                <li>
                  <strong>Cultivar su Fortaleza Interior:</strong> Las historias
                  y actividades están diseñadas...
                </li>
              </ol>
              <p className="pt-4">
                {activeTab === "register"
                  ? "Regístrate y empieza a guiar su camino."
                  : "Inicia sesión para continuar tu aventura."}
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="flex mb-15 border-b border-white/10">
              <button
                onClick={() => switchTab("register")}
                className={`py-3 px-5 text-lg font-semibold focus:outline-none transition-colors duration-200
                  ${
                    activeTab === "register"
                      ? "text-yellow-400 border-b-2 border-yellow-400"
                      : "text-gray-400 hover:text-yellow-300"
                  }`}
              >
                Registrarme
              </button>
              <button
                onClick={() => switchTab("login")}
                className={`py-3 px-5 text-lg font-semibold focus:outline-none transition-colors duration-200
                  ${
                    activeTab === "login"
                      ? "text-yellow-400 border-b-2 border-yellow-400"
                      : "text-gray-400 hover:text-yellow-300"
                  }`}
              >
                Iniciar Sesión
              </button>
            </div>

            {/* Contenido de la Pestaña Activa */}
            <div>
              {activeTab === "register" && (
                <>
                  {apiFeedbackRegister && (
                    <div
                      className={`mb-4 p-3 rounded-md text-sm ${
                        apiFeedbackRegister.type === "success"
                          ? "bg-green-100 border border-green-400 text-green-700"
                          : "bg-red-100 border border-red-400 text-red-700"
                      }`}
                      role="alert"
                    >
                      {apiFeedbackRegister.message}
                    </div>
                  )}
                  <form
                    onSubmit={handleRegisterSubmit}
                    className="flex flex-col gap-5"
                  >
                    <InputWithLabel
                      label="Correo Electrónico"
                      name="email"
                      type="email"
                      value={registrationData.email}
                      handleChange={handleRegisterChange}
                      error={registrationErrors.email}
                    />
                    <InputWithLabel
                      label="Contraseña"
                      name="password"
                      type="password"
                      value={registrationData.password}
                      handleChange={handleRegisterChange}
                      error={registrationErrors.password}
                    />
                    <InputWithLabel
                      label="Confirmar Contraseña"
                      name="confirmPassword"
                      type="password"
                      value={registrationData.confirmPassword}
                      handleChange={handleRegisterChange}
                      error={registrationErrors.confirmPassword}
                    />
                    <div className="-mt-1">
                      <label
                        htmlFor="role"
                        className="block text-white text-sm mb-2"
                      >
                        Soy principalmente... (Opcional)
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={registrationData.role}
                        className="w-full p-3 rounded-md border border-white/50 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-transparent appearance-none"
                        onChange={handleRegisterChange}
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
                        <option
                          value="parent"
                          className="text-gray-700 bg-white"
                        >
                          Padre/Madre/Tutor
                        </option>
                        <option
                          value="educator"
                          className="text-gray-700 bg-white"
                        >
                          Educador/Maestro
                        </option>
                        <option
                          value="therapist"
                          className="text-gray-700 bg-white"
                        >
                          Terapeuta/Psicólogo
                        </option>
                        <option
                          value="other"
                          className="text-gray-700 bg-white"
                        >
                          Otro
                        </option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-yellow-400 text-black  py-3 px-4 mt-2 rounded-md hover:bg-yellow-300 transition focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                      disabled={isSubmittingRegister}
                    >
                      {isSubmittingRegister
                        ? "Creando cuenta..."
                        : "Crear Cuenta"}
                    </button>
                  </form>
                </>
              )}

              {activeTab === "login" && (
                <LoginForm
                  onSuccess={() =>
                    console.log("Login success from AuthTabsPage")
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTabsPage;
