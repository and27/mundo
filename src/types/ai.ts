export interface ActivityGuideline {
  id: string;
  title: string;
  description: string;
  linkToDetail: string;
  type: string;
  emotionalActivityId?: string;
  emotionalActivityPreview?: string;
  imageUrl?: string;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text?: string;
  resources?: ActivityGuideline[];
  timestamp: number;
}
