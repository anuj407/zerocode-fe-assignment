// components/ChatWindow.tsx
"use client";

import React, { useRef } from "react";
import Message from "./Message";
import useAutoScroll from "@/app/hook/useAutoScroll";

type MessageType = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

type ChatWindowProps = {
  messages: MessageType[];
  loading?: boolean;
};

export default function ChatWindow({ messages, loading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useAutoScroll(bottomRef, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-1 space-y-4 ">
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} text={msg.text} />
      ))}

      {loading && (
        <Message sender="bot" text="" isTyping /> // ✅ animated typing bubble
      )}

      <div ref={bottomRef} />
    </div>
  );
}
