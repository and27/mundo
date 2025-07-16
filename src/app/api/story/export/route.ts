import { NextResponse } from "next/server";
import {
  generateStory,
  generateAudio,
  generateHiveImage,
} from "@/lib/storyEngine";
import { enhancePromptStyle } from "@/utils/imageUtils";
import { supabase } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  const body = await request.json();
  const { emotion, character, orientation } = body;

  if (!emotion || !character) {
    return NextResponse.json(
      { error: "emotion y character son requeridos." },
      { status: 400 }
    );
  }

  try {
    const story = await generateStory(emotion, character);

    story.initialStepId =
      story.initialStepId ?? story.steps[0]?.id ?? "scene_1";
    story.guideId = story.guideId ?? character;

    for (let i = 0; i < story.steps.length; i++) {
      const step = story.steps[i];
      const nextStep = story.steps[i + 1];

      // Audio
      const audioFilename = `${story.id}_${step.id}.mp3`;

      // Verificar si ya existe en Supabase
      const { data: existingAudio } = await supabase.storage
        .from("stories")
        .list("audio", { search: audioFilename });

      if (!existingAudio || existingAudio.length === 0) {
        const audioData = await generateAudio(step.subtitle, audioFilename);

        const audioUploadRes = await supabase.storage
          .from("stories")
          .upload(`audio/${audioFilename}`, audioData.buffer, {
            contentType: "audio/mpeg",
            upsert: true,
          });

        if (audioUploadRes.error) {
          throw new Error(
            `Error al subir audio: ${audioUploadRes.error.message}`
          );
        }
      } else {
        console.log(`Audio ya existe: ${audioFilename}`);
      }

      const { data: audioPublicUrl } = supabase.storage
        .from("stories")
        .getPublicUrl(`audio/${audioFilename}`);

      step.audioSrc = audioPublicUrl.publicUrl;

      // Interacción automática si no se define
      if (!step.interaction) {
        step.interaction = {
          type: "auto_proceed",
          nextStepId: nextStep?.id ?? "end",
        };
      }

      //images
      if (step.prompt_img) {
        const styledPrompt = enhancePromptStyle(step.prompt_img);
        const imageData = await generateHiveImage(styledPrompt, orientation);

        // Subir imagen a Supabase
        const imageUploadRes = await supabase.storage
          .from("stories")
          .upload(`images/${imageData.filename}`, imageData.buffer, {
            contentType: "image/jpeg",
            upsert: true,
          });

        if (imageUploadRes.error) {
          throw new Error(
            `Error al subir imagen: ${imageUploadRes.error.message}`
          );
        }

        // Obtener URL pública de la imagen
        const { data: imagePublicUrl } = supabase.storage
          .from("stories")
          .getPublicUrl(`images/${imageData.filename}`);

        step.visuals = {
          ...step.visuals,
          backgroundImage: imagePublicUrl.publicUrl,
        };
      }

      step.isNarration = true;
    }

    // Subir a Supabase Storage
    const filename = `${story.id}.json`;
    const uploadRes = await supabase.storage
      .from("stories") // nombre del bucket
      .upload(filename, JSON.stringify(story, null, 2), {
        contentType: "application/json",
        upsert: true,
      });

    if (uploadRes.error) {
      throw new Error(
        "Error al subir historia a Supabase: " + uploadRes.error.message
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("stories")
      .getPublicUrl(filename);

    return NextResponse.json({ story, url: publicUrlData?.publicUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generando historia", details: (error as Error).message },
      { status: 500 }
    );
  }
}
