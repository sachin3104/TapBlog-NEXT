"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.error);
        throw new Error(errorData.error || "Login failed");
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.log("Not logged in");
      setError(error.message);
    }
  };

  return (
    <div className="bg-lavender-50 min-h-screen flex items-center justify-center">
      {/* Login Card */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Welcome Message */}
        <h1 className="text-3xl font-bold text-lavender-900 mb-4 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Log in to access your account.
        </p>

        {/* Login Form */}
        <form>
          {/* username Input */}
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-lavender-100 text-black px-6 py-3 w-full rounded-lg hover:bg-lavender-700 transition duration-300 shadow-md"
          >
            Log In
          </button>
        </form>

        {/* Additional Links */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-lavender-600 hover:text-lavender-800 transition duration-300"
            >
              Sign Up
            </a>
          </p>
          <p className="mt-2">
            <a
              href="/forgot-password"
              className="text-lavender-600 hover:text-lavender-800 transition duration-300"
            >
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
