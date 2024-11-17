"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function CreateBlogPage() {
  const authenticated = useAuth(); // Ensure the user is authenticated
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to create blog");
      }

      router.push("/blog"); // Redirect to blog listing page
    } catch (err) {
      setError(err.message);
    }
  };

  if (!authenticated) {
    return null; // Optional: Display a loading spinner here
  }

  return (
    <div className="bg-lavender-50 min-h-screen py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="bg-white p-8 border border-lavender-200 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-lavender-900 mb-6">
            Create a New Blog
          </h1>
          {error && (
            <div className="text-red-500 bg-red-50 p-3 rounded-md mb-6 border border-red-200">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-lavender-300 rounded-md shadow-sm focus:ring-2 focus:ring-lavender-500 focus:outline-none"
                placeholder="Enter blog title"
                required
              />
            </div>

            {/* Content Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="mt-2 block w-full px-4 py-2 border border-lavender-300 rounded-md shadow-sm focus:ring-2 focus:ring-lavender-500 focus:outline-none"
                placeholder="Write your blog content here"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-lavender-100 text-black py-3 px-6 rounded-lg hover:bg-lavender-700 transition duration-300 shadow-md"
            >
              Create Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
