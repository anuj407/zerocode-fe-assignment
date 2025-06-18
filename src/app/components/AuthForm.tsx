"use client";

import { useRouter } from "next/navigation"; // ✅ Correct import
import { useState } from "react";

type AuthFormProps = {
  type: "login" | "register";
  validateForm?: (email: string, password: string) => boolean;
  emailError?: string;
  passwordError?: string;
};

export default function AuthForm({
  type,
  validateForm,
  emailError,
  passwordError,
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm && !validateForm(email, password)) return;

    const res = await fetch(`/api/auth/${type}`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token); // Save token
      localStorage.setItem("userId", data.user._id); // Save user ID
      localStorage.setItem("email", email); // Save email for future use
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div>
        <input
          type="email"
          placeholder="📧 Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none"
        />
        {emailError && (
          <p className="text-red-500 text-xs mt-1">{emailError}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="🔒 Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none"
        />
        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {type === "login" ? "🔑 Login" : "📝 Register"}
      </button>
    </form>
  );
}
