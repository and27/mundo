export type ImageProvider = "hive" | "openai";

export type ImageGenerationResult = {
  buffer: Buffer;
  filename: string;
};
