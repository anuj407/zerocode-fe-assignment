"use client";

import AuthForm from "@/app/components/AuthForm";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = (email: string, password: string) => {
    let valid = true;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
          📝 Create Account
        </h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
          Join us and start chatting instantly.
        </p>

        <AuthForm
          type="register"
          validateForm={validateForm}
          emailError={emailError}
          passwordError={passwordError}
        />

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-600 hover:underline dark:text-green-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
