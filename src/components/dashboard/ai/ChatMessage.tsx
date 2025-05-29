"use client";

import React from "react";
import ResourceCard from "../resources/ResourceCard";
export interface Message {
  role: "user" | "assistant";
  content: string; // El texto del mensaje
  resources?: {
    id: string;
    title: string;
    description: string;
    url: string;
    type: string;
    tags: string[];
    actionButtonLabel: string;
    imageUrl: string;
    actionLink: string;
  }[]; // Array de recursos recomendados por la IA
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 my-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-black/30 flex-shrink-0 mt-1">
          {/* <Image src="/guides/amaru3d.webp" alt="Amaru" width={32} height={32} /> */}
        </div>
      )}
      <div
        className={`p-4 rounded-lg max-w-lg ${
          isUser ? "bg-jaguar/20 text-condor" : "bg-black/20 text-condor/90"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>

        {/* Si el mensaje del asistente tiene recursos, los renderizamos */}
        {message.resources && message.resources.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-3">
            {message.resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                description={resource.description}
                imageUrl={resource.imageUrl}
                type={resource.type}
                tags={resource.tags}
                actionButtonLabel={resource.actionButtonLabel || "Ver"}
                actionLink={resource.actionLink}
                className="bg-black/30" // Un estilo ligeramente diferente para que encaje
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
