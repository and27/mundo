import fs from "node:fs";
import path from "node:path";
import type { ImageGenerationResult } from "./types";

const DEFAULT_VERTICAL =
  process.env.DEFAULT_IMAGE_VERTICAL ?? "/images/forest-bg.png";
const DEFAULT_HORIZONTAL =
  process.env.DEFAULT_IMAGE_HORIZONTAL ?? "/images/forest-bg-h.png";

function resolvePublicAsset(assetPath: string): string {
  const normalized = assetPath.startsWith("/") ? assetPath.slice(1) : assetPath;
  return path.join(process.cwd(), "public", normalized);
}

export function getDefaultImage(
  orientation: "vertical" | "horizontal"
): ImageGenerationResult {
  const assetPath =
    orientation === "horizontal" ? DEFAULT_HORIZONTAL : DEFAULT_VERTICAL;
  const absolutePath = resolvePublicAsset(assetPath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(
      `Default image not found at ${absolutePath}. Set DEFAULT_IMAGE_VERTICAL/DEFAULT_IMAGE_HORIZONTAL.`
    );
  }
  const buffer = fs.readFileSync(absolutePath);
  const filename = path.basename(absolutePath);
  return { buffer, filename };
}
