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
      try {
        return await generateOpenAIImage(prompt, orientation);
      } catch (error) {
        if (isRateLimitError(error)) {
          console.warn(
            "[images] OpenAI rate limit. Falling back to Hive.",
            error
          );
          return generateHiveImage(prompt, orientation);
        }
        throw error;
      }
    default:
      throw new Error(
        `Unsupported IMAGE_PROVIDER "${provider}". Use "openai" or "hive".`
      );
  }
}

function isRateLimitError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const err = error as {
    status?: number;
    code?: string;
    type?: string;
    message?: string;
  };
  if (err.status === 429) return true;
  if (err.code === "rate_limit_exceeded") return true;
  if (err.type === "rate_limit_exceeded") return true;
  if (typeof err.message === "string") {
    return err.message.toLowerCase().includes("rate limit");
  }
  return false;
}
