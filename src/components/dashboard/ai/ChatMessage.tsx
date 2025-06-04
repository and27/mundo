"use client";

import React from "react";
import { ChatMessage as MessageProps } from "@/types/ai";
import Image from "next/image";
import { motion } from "framer-motion";
import ResourceCard from "../resources/ResourceCard";

interface ChatMessageComponentProps {
  message: MessageProps;
}

const ChatMessage: React.FC<ChatMessageComponentProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex my-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[75%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-primary flex items-center justify-center overflow-hidden shadow-md mt-1">
            <Image
              src="/images/guides/amaru_avatar.png"
              alt="Amaru"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        )}
        <div
          className={`px-3 py-2 sm:px-4 sm:py-4 rounded-xl shadow-md ${
            isUser
              ? "bg-primary-200/80 text-black rounded-br-none"
              : "bg-primary-900/50 backdrop-blur-md text-foreground rounded-bl-none"
          }`}
        >
          {message.text && (
            <p className="text-sm sm:text-base whitespace-pre-wrap">
              {message.text}
            </p>
          )}
          {message.resources && message.resources.length > 0 && (
            <div
              className={`mt-2 ${
                message.text ? "pt-2 border-t border-white/10" : ""
              }`}
            >
              {message.resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
