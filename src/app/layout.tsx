// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatBot App",
  description: "A modern chatbot interface built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white font-sans scroll-smooth selection:bg-green-300">
        <main className="flex items-center justify-center min-h-screen p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
