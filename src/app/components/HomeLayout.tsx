"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import ChatPage from "@/app/chat/page";
import useChatBot from "@/app/hook/useChatBot";
import useAutoScroll from "@/app/hook/useAutoScroll";

export default function HomeLayout() {
  const { messages, loading } = useChatBot();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useAutoScroll(bottomRef, [messages, loading]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <div
      className={`flex flex-col w-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <Header darkMode={darkMode} />

      <div className="flex flex-1 min-h-[calc(100vh-64px)] relative">
        {/* Sidebar for desktop */}
        <div className="hidden sm:block">
          <Sidebar darkMode={darkMode} />
        </div>

        {/* Sidebar Drawer for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className={`absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg p-4`}
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar darkMode={darkMode} />
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile toggle button */}
        <button
          className="absolute top-4 left-4 sm:hidden z-50 bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={20} className="text-gray-800 dark:text-white" />
        </button>

        {/* Main Content */}
        <div className="flex-1 h-screen overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          <ChatPage />
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed bottom-4 right-4 max-md:bottom-10 z-[9999]">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            darkMode
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-600"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
