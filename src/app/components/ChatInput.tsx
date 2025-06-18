"use client";

import React, { useEffect, useRef, useState } from "react";

type ChatInputProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSend: (text: string) => void;
  history: string[];
  historyIndex: number | null;
  setHistoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

// ✅ TypeScript support for webkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    start: () => void;
    stop: () => void;
    onresult: (event: SpeechRecognitionResultEvent) => void;
    onerror: (event: Event) => void;
    onend: () => void;
  }

  interface SpeechRecognitionResultEvent extends Event {
    results: SpeechRecognitionResultList;
  }
}





export default function ChatInput({
  input,
  setInput,
  onSend,
  history,
  historyIndex,
  setHistoryIndex,
}: ChatInputProps) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.webkitSpeechRecognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: SpeechRecognitionResultEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
      };

      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);

      recognitionRef.current = recognition;
    }
  }, [setInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        onSend(input);
        setInput("");
        setHistoryIndex(null);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;

      const newIndex =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setInput(history[newIndex]);
      setHistoryIndex(newIndex);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0 || historyIndex === null) return;

      const newIndex =
        historyIndex < history.length - 1 ? historyIndex + 1 : null;

      setInput(newIndex === null ? "" : history[newIndex]);
      setHistoryIndex(newIndex);
    }
  };

  const handleSendClick = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
      setHistoryIndex(null);
    }
  };

  const handleMicClick = () => {
    if (recognitionRef.current) {
      if (listening) {
        recognitionRef.current.stop();
        setListening(false);
      } else {
        recognitionRef.current.start();
        setListening(true);
      }
    } else {
      alert("Your browser doesn't support speech recognition.");
    }
  };

  return (
    <div className="p-4 border-t bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type or speak..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleMicClick}
          className={`px-3 py-2 rounded-md text-white ${
            listening ? "bg-red-500" : "bg-blue-600"
          } hover:opacity-90 transition`}
          title="Voice Input"
        >
          🎙️
        </button>

        <button
          onClick={handleSendClick}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
