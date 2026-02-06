export function buildAudioFilename(storyId: string, stepId: string): string {
  return `${storyId}_${stepId}.mp3`;
}
