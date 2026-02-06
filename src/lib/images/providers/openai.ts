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

export async function generateImage(
  prompt: string,
  orientation: "vertical" | "horizontal" = "vertical"
): Promise<ImageGenerationResult> {
  const filename = buildImageFilename(prompt);
  const size = getOpenAIImageSize(orientation);

  const result = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    size,
    quality: "medium",
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
}
