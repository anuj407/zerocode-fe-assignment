"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare, Plus } from "lucide-react";

type Chat = {
  _id: string;
  messages: { role: string; content: string }[];
};

export default function Sidebar({ darkMode }: { darkMode: boolean }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState<string | null>(null);

  const handleNewChat = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error("Failed to create chat");

      const newChat = await res.json();
      localStorage.setItem("chatId", newChat._id);
      setChats([newChat]); // Update state with new chat
      setSelectedChatIndex(newChat._id); // Set it as selected

    } catch (err) {
      console.error("New chat error:", err);
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) return;

      try {
        const res = await fetch(`/api/chats?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch chats");
        }

        const data = await res.json();

        if (data.length === 0) {
          await handleNewChat(); // Create a chat if none found
        } else {
          setChats(data);
        }
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    const chatId = localStorage.getItem("chatId");
    if (chatId) {
      setSelectedChatIndex(chatId);
    } else {
      setSelectedChatIndex(null);
    }
  }, []);

  const handleChatClick = (chatId: string) => {
    localStorage.setItem("chatId", chatId);
    window.location.reload();
  };

  return (
    <aside
      className={`w-64 fixed top-20 p-4 overflow-y-auto border-r shadow-sm h-screen flex flex-col ${
        darkMode ? "bg-gray-950 text-white border-gray-700" : "bg-white text-black border-gray-200"
      }`}
    >
      {/* New Chat Button */}
      <button
        onClick={handleNewChat}
        className={`mb-4 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-md border transition hover:shadow-md ${
          darkMode
            ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
            : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
        }`}
      >
        <Plus className="w-4 h-4" />
        New Chat
      </button>

      {/* Chat List */}
      <div className="flex-1">
        {chats.length === 0 ? (
          <p className="text-center text-sm text-gray-400 mt-10">No previous chats found.</p>
        ) : (
          <ul className="space-y-2">
            {chats.map((chat, index) => {
              const chatLabel = "Chat - " + (index + 1);
              return (
                <li
                  key={chat._id}
                  onClick={() => handleChatClick(chat._id)}
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer truncate transition ${
                    selectedChatIndex === chat._id
                      ? darkMode
                        ? "bg-gray-800"
                        : "bg-gray-200"
                      : darkMode
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{chatLabel}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
