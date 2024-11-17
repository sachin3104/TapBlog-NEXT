"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
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

      setBlogs((prev) => prev.filter((blog) => blog.id !== id)); // Remove from UI
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBlogs();
  }, []);

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-lavender-50 min-h-screen py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-lavender-900 mb-10 text-center">
          Blog Posts
        </h1>

        {/* Blog List */}
        <ul className="space-y-6">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="bg-white p-6 border border-lavender-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link
                href={`/blog/${blog.id}`}
                className="text-2xl font-semibold text-lavender-800 hover:text-lavender-600 transition duration-300"
              >
                {blog.title}
              </Link>
              <p className="text-sm text-gray-600 mt-2">
                By <span className="font-medium">{blog.author}</span> on{" "}
                {new Date(blog.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
