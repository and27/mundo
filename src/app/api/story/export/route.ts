import { NextResponse } from "next/server";
import {
  generateStory,
  generateAudio,
  generateHiveImage,
} from "@/lib/storyEngine";
import fs from "fs";
import path from "path";
import { enhancePromptStyle } from "@/utils/imageUtils";

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
      step.audioSrc = await generateAudio(step.subtitle, audioFilename);

      if (!step.interaction) {
        step.interaction = {
          type: "auto_proceed",
          nextStepId: nextStep?.id ?? "end",
        };
      }

      // Visuales
      if (step.prompt_img) {
        const styledPrompt = enhancePromptStyle(step.prompt_img);
        const imageUrl = await generateHiveImage(styledPrompt, orientation);
        step.visuals = {
          ...step.visuals,
          backgroundImage: imageUrl,
        };
      }

      step.isNarration = true;
    }

    const storyPath = path.join(
      process.cwd(),
      "public",
      "stories",
      `${story.id}.json`
    );
    fs.mkdirSync(path.dirname(storyPath), { recursive: true });
    fs.writeFileSync(storyPath, JSON.stringify(story, null, 2), "utf8");

    return NextResponse.json({ story });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generando historia", details: (error as Error).message },
      { status: 500 }
    );
  }
}
