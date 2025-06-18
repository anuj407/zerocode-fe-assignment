"use client";

import React, { useState } from "react";
import { BotIcon, Menu, X } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
  darkMode: boolean;
};

export default function Header({ darkMode }: HeaderProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-xl transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <BotIcon className="w-6 h-6" />
          <span>ChatBot</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-4">
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
        </nav>

        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 rounded-md focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden px-4 pb-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded-md text-sm font-medium bg-green-600 text-white text-center hover:bg-green-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
