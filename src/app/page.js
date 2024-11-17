"use client";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-lavender-50 min-h-screen py-16">
        {/* Welcome Section */}
        <div className="container mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-lavender-900 mb-4">
            Welcome to the TapBlog Platform!
          </h1>
          <p className="text-lg text-gray-600">
            Share your ideas, explore insightful blogs, and connect with the
            world.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="container mx-auto text-center mb-16">
          <div className="space-x-4">
            <Link href={"/blog"}>
              <button className="bg-white text-lavender-600 px-6 py-3 rounded-lg border border-lavender-600 hover:bg-lavender-100 transition duration-300 shadow-md">
                Read Blogs
              </button>
            </Link>
            <Link href={"/login"}>
              <button className="bg-white text-lavender-600 px-6 py-3 rounded-lg border border-lavender-600 hover:bg-lavender-100 transition duration-300 shadow-md">
                Write Blogs
              </button>
            </Link>
          </div>
        </div>

        {/* Featured Blogs Section */}
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl font-bold text-lavender-800 mb-8 text-center">
            Featured Blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Card */}
            {[1, 2, 3].map((blog) => (
              <div
                key={blog}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={`https://via.placeholder.com/300?text=Blog+${blog}`}
                  alt={`Blog ${blog}`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-lavender-800 mb-2">
                    Blog Title {blog}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    A short description of what this blog is about. It provides
                    an overview of the content.
                  </p>
                  <a
                    href={`/blog/${blog}`}
                    className="text-lavender-600 hover:text-lavender-800 font-semibold transition duration-300"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-lavender-100 mt-16 py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-lavender-900 mb-4">
              Ready to Share Your Thoughts?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Join our community of bloggers and start sharing your unique
              perspectives today.
            </p>
            <button className="bg-white text-lavender-600 px-6 py-3 rounded-lg border border-lavender-600 hover:bg-lavender-100 transition duration-300 shadow-md">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
