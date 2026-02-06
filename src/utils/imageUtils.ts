export function buildImageFilename(
  prompt: string,
  orientation?: "vertical" | "horizontal"
): string {
  const base = prompt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .slice(0, 40)
    .replace(/_+$/, "");

  const suffix = orientation ? `_${orientation}` : "";
  return `${base}${suffix}_bg.jpg`;
}

export function enhancePromptStyle(prompt: string): string {
  return `${prompt}, children's book illustration, cartoon style, soft lighting, dreamlike colors, pixar-like`;
}
