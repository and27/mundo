"use client";
import InputWithLabel from "@/components/ui/InputWithLabel";
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { loginUser } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useAsyncSubmit } from "@/hooks/useAsyncSubmit";
import { toast } from "sonner";

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
  const setUser = useAuthStore((state) => state.setUser);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const { isSubmitting, run } = useAsyncSubmit();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const newErrors: LoginErrors = {};
    if (!loginData.email) {
      newErrors.email = "El correo es obligatorio.";
    }
    if (!loginData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await run(async () => {
      try {
        const result = await loginUser(loginData);

        toast.success(result.message);
        setUser({
          id: result.userId,
          email: result.email,
          displayName: result.display_name,
          role: result.role,
          onboardingCompleted: result.onboarding_completed,
        });
        router.push("/parentDashboard");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message || "Error al iniciar sesion");
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <InputWithLabel
        label="Correo Electrónico"
        name="email"
        type="email"
        value={loginData.email}
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
        label="Contraseña"
        name="password"
        type="password"
        value={loginData.password}
        handleChange={handleChange}
        error={errors.password}
        inputProps={{
          autoComplete: "current-password",
          autoCapitalize: "none",
          autoCorrect: "off",
        }}
      />
      <Button
        type="submit"
        className="w-full mt-5 transition focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Iniciando sesion..." : "Iniciar sesion"}
      </Button>
    </form>
  );
};

export default LoginForm;

