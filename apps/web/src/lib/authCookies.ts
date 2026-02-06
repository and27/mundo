export const ACCESS_TOKEN_COOKIE = "mundo-access-token";
export const REFRESH_TOKEN_COOKIE = "mundo-refresh-token";

export function getCookieValue(
  cookieHeader: string | null,
  name: string
): string | null {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    if (!cookie.startsWith(`${name}=`)) continue;
    return decodeURIComponent(cookie.slice(name.length + 1));
  }
  return null;
}
