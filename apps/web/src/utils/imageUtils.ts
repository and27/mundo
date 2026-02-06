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
  return [
    prompt,
    "background only, no characters, no people, no animals",
    "stylized 3D render with soft cinematic lighting",
    "warm andean palette (ochres, terracottas, muted greens, soft blues)",
    "gentle depth of field, smooth clay-like materials",
    "subtle textile patterns in the landscape",
    "whimsical and child-friendly, calm and safe atmosphere",
    "avoid flat 2D illustration, harsh contrast, photorealism, clutter",
  ].join(", ");
}
