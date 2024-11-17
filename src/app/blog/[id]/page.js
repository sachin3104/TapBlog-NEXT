"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function BlogDetailPage() {
  const params = useParams(); // Unwrap params
  const blogId = params.id; // Access the resolved `id`

  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs?id=${blogId}`);
        if (!response.ok) {
          console.losg("failed to fetch the bolg");
          throw new Error("Failed to fetch blog");
        }
        const data = await response.json();
        console.log(data);
        setBlog(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (blogId) fetchBlog();
  }, [blogId]);

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="bg-lavender-50 min-h-screen py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Blog Post Content */}
        <div className="bg-white p-8 border border-lavender-200 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-lavender-900 mb-6">
            {blog.title}
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            By <span className="font-medium">{blog.author}</span> on{" "}
            {new Date(blog.date).toLocaleDateString()}
          </p>
          <p className="text-lg text-gray-800 leading-relaxed">
            {blog.content}
          </p>
          <button
            onClick={() => router.push("/blog")}
            className="mt-6 bg-lavender-100 text-black py-3 px-6 rounded-lg hover:bg-lavender-700 transition duration-300 shadow-md"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
}
