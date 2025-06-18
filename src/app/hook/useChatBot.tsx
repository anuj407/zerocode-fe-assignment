// hooks/useChatBot.ts
import { useState } from "react";
import { useChatHistory } from "@/app/hook/useChatHistory";

// inside your useChatBot hook
type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

export default function useChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  
  useChatHistory(messages, setMessages);
  const sendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // Simulate bot reply
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: `Bot reply to: "${text}" 🤖`,
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1000);
  };

  return { messages, sendMessage, loading };
}
