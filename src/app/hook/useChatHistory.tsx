// hooks/useChatHistory.ts
import { useEffect } from "react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

export function useChatHistory(
  messages: Message[],
  setMessages: (msgs: Message[]) => void
) {
  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("chat-history");
    if (stored) setMessages(JSON.parse(stored));
  }, [setMessages]);

  // Save to localStorage on update
  useEffect(() => {
    localStorage.setItem("chat-history", JSON.stringify(messages));
  }, [messages]);
}
