import { GoogleGenAI } from "@google/genai";
import type { GenerateContentConfig } from "@google/genai";

function cleanTextForTTS(text: string): string {
  return text
    .replace(/\[SONIDO_[^\]]+\]/g, "") // Remover [SONIDO_X]
    .replace(/\[SILENCIO (\d+)s\]/g, " ... ") // Pausas naturales
    .replace(/\(\d+\.{3}\d+\.{3}\d+\.{3}\)/g, "") // Remover conteos
    .replace(/\s+/g, " ") // Limpiar espacios múltiples
    .trim();
}

/**
 * Parsea MIME type de audio para extraer bits per sample y rate
 * Ejemplo: "audio/L16;rate=24000" -> { bitsPerSample: 16, rate: 24000 }
 */
function parseAudioMimeType(mimeType: string): {
  bitsPerSample: number;
  rate: number;
} {
  let bitsPerSample = 16;
  let rate = 24000;

  // Extraer rate de los parámetros
  const parts = mimeType.split(";");
  for (const param of parts) {
    const trimmedParam = param.trim();
    if (trimmedParam.toLowerCase().startsWith("rate=")) {
      try {
        const rateStr = trimmedParam.split("=")[1];
        rate = parseInt(rateStr, 10);
      } catch (error) {
        console.log(error);
        // Mantener rate por defecto
      }
    } else if (trimmedParam.startsWith("audio/L")) {
      try {
        const bitsStr = trimmedParam.split("L")[1];
        bitsPerSample = parseInt(bitsStr, 10);
      } catch (error) {
        console.log(error);
        // Mantener bitsPerSample por defecto
      }
    }
  }

  return { bitsPerSample, rate };
}

/**
 * Convierte audio RAW a formato WAV con headers apropiados
 */
function convertToWav(audioData: Buffer, mimeType: string): Buffer {
  const { bitsPerSample, rate: sampleRate } = parseAudioMimeType(mimeType);
  const numChannels = 1;
  const dataSize = audioData.length;
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const chunkSize = 36 + dataSize; // 36 bytes para header fields antes del data chunk size

  // Crear header WAV según especificación http://soundfile.sapp.org/doc/WaveFormat/
  const header = Buffer.alloc(44);
  let offset = 0;

  // ChunkID "RIFF"
  header.write("RIFF", offset);
  offset += 4;
  // ChunkSize (total file size - 8 bytes)
  header.writeUInt32LE(chunkSize, offset);
  offset += 4;
  // Format "WAVE"
  header.write("WAVE", offset);
  offset += 4;
  // Subchunk1ID "fmt "
  header.write("fmt ", offset);
  offset += 4;
  // Subchunk1Size (16 para PCM)
  header.writeUInt32LE(16, offset);
  offset += 4;
  // AudioFormat (1 para PCM)
  header.writeUInt16LE(1, offset);
  offset += 2;
  // NumChannels
  header.writeUInt16LE(numChannels, offset);
  offset += 2;
  // SampleRate
  header.writeUInt32LE(sampleRate, offset);
  offset += 4;
  // ByteRate
  header.writeUInt32LE(byteRate, offset);
  offset += 4;
  // BlockAlign
  header.writeUInt16LE(blockAlign, offset);
  offset += 2;
  // BitsPerSample
  header.writeUInt16LE(bitsPerSample, offset);
  offset += 2;
  // Subchunk2ID "data"
  header.write("data", offset);
  offset += 4;
  // Subchunk2Size (size of audio data)
  header.writeUInt32LE(dataSize, offset);

  return Buffer.concat([header, audioData]);
}

export async function generateAudio(
  text: string,
  filename: string
): Promise<{ buffer: Buffer; filename: string }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
  }

  // Inicializar cliente de Gemini
  const ai = new GoogleGenAI({ apiKey });

  const cleanText = cleanTextForTTS(text);

  // Crear el prompt para TTS con estilo narrativo para niños
  const ttsPrompt = `Narra de forma calmada y amigable para niños de 8-12 años: ${cleanText}`;

  try {
    // Configuración para TTS
    const config: GenerateContentConfig = {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: "Callirrhoe", // Voz casual y amigable para niños
          },
        },
      },
    };

    console.log("[DEBUG] TTS Prompt:", ttsPrompt);

    // Usar stream para obtener el audio (como en el ejemplo de Python)
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash-preview-tts",
      contents: ttsPrompt,
      config: config,
    });

    const audioChunks: Buffer[] = [];
    let mimeType = "";

    for await (const chunk of stream) {
      console.log("[DEBUG] Received chunk");

      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const inlineData = chunk.candidates[0].content.parts[0].inlineData;

        if (inlineData.data) {
          console.log(
            "[DEBUG] Audio chunk received, size:",
            inlineData.data.length
          );
          mimeType = inlineData.mimeType || "audio/L16;rate=24000";

          // Convertir de base64 a Buffer
          const chunkBuffer = Buffer.from(inlineData.data, "base64");
          audioChunks.push(chunkBuffer);
        }
      }
    }

    if (audioChunks.length === 0) {
      throw new Error("No audio data received from Gemini TTS");
    }

    // Combinar todos los chunks de audio
    const rawAudioData = Buffer.concat(audioChunks);
    console.log("[DEBUG] Total raw audio size:", rawAudioData.length, "bytes");
    console.log("[DEBUG] MIME type:", mimeType);

    // Convertir a WAV con headers apropiados
    const wavBuffer = convertToWav(rawAudioData, mimeType);
    console.log("[DEBUG] WAV buffer size:", wavBuffer.length, "bytes");

    return { buffer: wavBuffer, filename };
  } catch (error) {
    console.error("[DEBUG] Error in generateAudio:", error);
    throw new Error(
      `Gemini TTS error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
