export function buildImageFilename(prompt: string): string {
  const base = prompt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .slice(0, 40)
    .replace(/_+$/, "");

  return `/images/generated/${base}_bg.jpg`;
}

export function enhancePromptStyle(prompt: string): string {
  return `${prompt}, children's book illustration, cartoon style, soft lighting, dreamlike colors, pixar-like`;
}
