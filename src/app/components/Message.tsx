import React from "react";

type MessageProps = {
  sender: "user" | "bot";
  text: string;
  isTyping?: boolean; // ✅ Optional typing indicator
};

export default function Message({ sender, text, isTyping = false }: MessageProps) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div className="relative max-w-[80%] sm:max-w-[70%] md:max-w-[60%]">
        <div
          className={`px-4 py-3 rounded-lg shadow-md text-sm md:text-base break-words transition-all duration-300 ${
            isUser
              ? "bg-green-500 text-white rounded-br-none"
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
          }`}
        >
          {isTyping ? (
            <span className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce"></span>
            </span>
          ) : (
            text
          )}
        </div>

        {/* Bubble Tail */}
        <div
          className={`absolute bottom-0 w-3 h-3 transform rotate-45 ${
            isUser
              ? "right-0 translate-x-1 bg-green-500"
              : "left-0 -translate-x-1 bg-white dark:bg-gray-800"
          }`}
        />
      </div>
    </div>
  );
}
