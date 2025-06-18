"use client";

import { useState } from "react";
import AuthForm from "@/app/components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = (email: string, password: string) => {
    let isValid = true;

    // Basic email pattern
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login to Your Account
        </h2>

        {/* AuthForm expects `type`, so we pass it along with our validation */}
        <AuthForm
          type="login"
          validateForm={validateForm}
          emailError={emailError}
          passwordError={passwordError}
        />

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-green-600 hover:underline dark:text-green-400"
          >
            Sign up 
          </Link>
        </p>
      </div>
    </div>
  );
}
