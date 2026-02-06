import type { ImageProvider } from "./types";
import { generateImage as generateHiveImage } from "./providers/hive";
import { generateImage as generateOpenAIImage } from "./providers/openai";

export type { ImageProvider, ImageGenerationResult } from "./types";

export async function generateImage(
  prompt: string,
  orientation: "vertical" | "horizontal" = "vertical"
) {
  const provider = (process.env.IMAGE_PROVIDER ?? "openai")
    .toLowerCase()
    .trim() as ImageProvider;

  switch (provider) {
    case "hive":
      return generateHiveImage(prompt, orientation);
    case "openai":
      return generateOpenAIImage(prompt, orientation);
    default:
      throw new Error(
        `Unsupported IMAGE_PROVIDER "${provider}". Use "openai" or "hive".`
      );
  }
}
