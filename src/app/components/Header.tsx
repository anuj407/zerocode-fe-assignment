"use client";

import React, { useState, useEffect } from "react";
import { BotIcon, Menu, X, UserCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { Logout } from "@/lib/logout";

type HeaderProps = {
  darkMode: boolean;
};

export default function Header({ darkMode }: HeaderProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showLogout, setShowLogout] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setShowLogout(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserEmail(payload.email);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const handleLogout = () => {
    Logout();
    closeMobileMenu();
  };

  const username = userEmail?.split("@")[0];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <BotIcon className="w-6 h-6" />
          <span>ChatBot</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex items-center gap-4">
          {!userEmail ? (
            <>
              <Link
                href="/login"
                className="text-sm px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-sm px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowLogout((prev) => !prev)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                <UserCircle className="w-5 h-5" />
                <span className="capitalize">{username}</span>
              </button>
              {showLogout && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md w-40 z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden p-2 rounded-md focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          className={`sm:hidden px-4 pb-4 pt-2 backdrop-blur-md transition-all duration-300 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
        >
          <div className="flex flex-col gap-2">
            {!userEmail ? (
              <>
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="py-2 px-3 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="py-2 px-3 rounded-md text-sm font-medium bg-green-600 text-white text-center hover:bg-green-700 transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLogout((prev) => !prev)}
                  className="flex items-center justify-between w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md"
                >
                  <span className="capitalize">{username}</span>
                  <UserCircle className="w-5 h-5" />
                </button>
                {showLogout && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-red-100 dark:bg-red-600 rounded hover:bg-red-200 dark:hover:bg-red-500 mt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
