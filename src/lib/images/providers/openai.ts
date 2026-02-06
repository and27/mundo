import "server-only";
import OpenAI from "openai";
import { buildImageFilename } from "@/utils/imageUtils";
import type { ImageGenerationResult } from "../types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getOpenAIImageSize(orientation: "vertical" | "horizontal") {
  return orientation === "horizontal" ? "1536x1024" : "1024x1536";
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateImage(
  prompt: string,
  orientation: "vertical" | "horizontal" = "vertical",
): Promise<ImageGenerationResult> {
  const filename = buildImageFilename(prompt);
  const size = getOpenAIImageSize(orientation);

  const maxAttempts = 3;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const result = await openai.images.generate({
        model: "gpt-image-1-mini",
        prompt,
        size,
        quality: "low",
        output_format: "jpeg",
        output_compression: 90,
        moderation: "auto",
      });

      const imageBase64 = result?.data?.[0]?.b64_json;
      if (!imageBase64) {
        throw new Error("OpenAI image generation error: missing image data.");
      }

      const buffer = Buffer.from(imageBase64, "base64");
      return { buffer, filename };
    } catch (error) {
      lastError = error;
      const shouldRetry = isRateLimitError(error);
      if (!shouldRetry || attempt === maxAttempts) {
        throw error;
      }
      const backoffMs = 1500 * Math.pow(2, attempt - 1);
      await delay(backoffMs);
    }
  }

  throw lastError ?? new Error("OpenAI image generation failed.");
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
