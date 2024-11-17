"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const authenticated = useAuth(); // Ensure the user is authenticated
  const router = useRouter();
  const [userBlogs, setUserBlogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized");

        const response = await fetch("/api/blogs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to fetch blogs");
        }

        const blogs = await response.json();
        setUserBlogs(blogs.filter((blog) => blog.author === "your-username")); // Replace 'your-username' dynamically
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserBlogs();
  }, []);

  const handleEdit = (id) => {
    router.push(`/blog/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const response = await fetch("/api/blogs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to delete blog");
      }

      setUserBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (!authenticated) {
    return null; // Optional: Add a loading spinner here
  }

  return (
    <div className="bg-lavender-50 min-h-screen py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="bg-white p-8 border border-lavender-200 rounded-lg shadow-lg">
          {/* Dashboard Header */}
          <h1 className="text-4xl font-bold text-lavender-900 mb-6">
            Dashboard
          </h1>
          {error && (
            <div className="text-red-500 bg-red-50 p-3 rounded-md mb-6 border border-red-200">
              {error}
            </div>
          )}

          {/* Create Blog Button */}
          <div className="mb-6">
            <button
              onClick={() => router.push("/blog/create")}
              className="bg-lavender-100 text-black py-3 px-6 rounded-lg hover:bg-lavender-700 transition duration-300 shadow-md"
            >
              Create New Blog
            </button>
          </div>

          {/* Your Blogs Section */}
          <h2 className="text-2xl font-semibold text-lavender-800 mb-6">
            Your Blogs
          </h2>
          {userBlogs.length > 0 ? (
            <ul className="space-y-6">
              {userBlogs.map((blog) => (
                <li
                  key={blog.id}
                  className="bg-white p-6 border border-lavender-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold text-lavender-900 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Created on: {new Date(blog.date).toLocaleDateString()}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(blog.id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">
              You have no blogs yet. Start by creating one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
