interface RegistrationPayload {
  email: string;
  password: string;
  role?: string;
}

interface RegistrationSuccessResponse {
  message: string;
  userId: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginSuccessResponse {
  message: string;
  userId: string;
  email?: string;
  onboarding_completed: boolean;
  role: string;
  display_name?: string;
}

interface ApiErrorResponse {
  error: string;
}

export async function registerUser(
  payload: RegistrationPayload
): Promise<RegistrationSuccessResponse> {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMessage =
      (result as ApiErrorResponse)?.error ||
      `Error ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return result as RegistrationSuccessResponse;
}

export async function loginUser(
  payload: LoginPayload
): Promise<LoginSuccessResponse> {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMessage =
      (result as ApiErrorResponse)?.error ||
      `Error ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return result as LoginSuccessResponse;
}

interface LogoutResponse {
  message: string;
}

export async function logoutUser(): Promise<LogoutResponse> {
  const response = await fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMessage =
      (result as ApiErrorResponse)?.error ||
      `Error ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return result as LogoutResponse;
}
