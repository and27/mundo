import "server-only";
import { buildImageFilename } from "@/utils/imageUtils";
import type { ImageGenerationResult } from "../types";

export async function generateImage(
  prompt: string,
  orientation: "vertical" | "horizontal" = "vertical"
): Promise<ImageGenerationResult> {
  const filename = buildImageFilename(prompt);

  const imageSize =
    orientation === "horizontal"
      ? { width: 1344, height: 768 }
      : { width: 768, height: 1344 };

  const res = await fetch("https://api.thehive.ai/api/v3/hive/sdxl-enhanced", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HIVE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: {
        prompt,
        negative_prompt: "blurry, distorted, noisy, photorealistic",
        image_size: imageSize,
        num_inference_steps: 20,
        guidance_scale: 4.5,
        num_images: 1,
        seed: 42,
        output_format: "jpeg",
        output_quality: 90,
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Hive image generation error: ${errorText}`);
  }

  const data = await res.json();
  const hiveImageUrl = data?.output?.[0]?.url;
  if (!hiveImageUrl) throw new Error("No se generó imagen");

  const response = await fetch(hiveImageUrl);
  const buffer = await response.arrayBuffer();
  return { buffer: Buffer.from(buffer), filename };
}
