/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import ChatWindow from "@/app/components/ChatWindow";
import ChatInput from "@/app/components/ChatInput";


export type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

type ChatResponse = {
  reply?: string;
  error?: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);


const [chatId, setChatId] = useState<string | null>(null);
useEffect(() => {
  const storedId = localStorage.getItem("chatId");
  setChatId(storedId);
}, []);

useEffect(() => {
   const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages?chatId=${chatId}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          const formatted = data.map((msg: any) => ({
            id: Date.parse(msg.createdAt),
            sender: msg.role,
            text: msg.content,
          }));
          setMessages(formatted);
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    fetchMessages();
},[chatId])

  // Fetch messages on mount
  

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const chatId = localStorage.getItem("chatId");
    if (!chatId) return;

    setHistory((prev) => [...prev, text]);
    setHistoryIndex(null);

    const userMsg: Message = { id: Date.now(), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Save user message to MongoDB
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId,
        role: "user",
        content: text,
      }),
    });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data: ChatResponse = await res.json();

      const botMsg: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.reply?.trim() || "🤖 Sorry, I didn't understand that.",
      };

      setMessages((prev) => [...prev, botMsg]);

      // Save bot message to MongoDB
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          role: "bot",
          content: botMsg.text,
        }),
      });
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-2xl ml-[30%] pt-[5.2rem] h-screen border border-gray-500">
      <div className="flex-1 scrollbar-hide overflow-y-auto ">
        <ChatWindow messages={messages} loading={loading} />
      </div>
      <div className="sticky bottom-0 bg-white dark:bg-gray-800">
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          history={history}
          historyIndex={historyIndex}
          setHistoryIndex={setHistoryIndex}
        />
      </div>
    </div>
  );
}
