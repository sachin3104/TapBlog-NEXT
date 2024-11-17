import { readData, writeData } from "@/lib/fileHandler";
import { protectedRoute } from "@/lib/middleware";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const blogs = readData("blogs.json");

    if (id) {
      const blog = blogs.find((b) => b.id === parseInt(id));
      if (!blog) {
        return new Response(JSON.stringify({ error: "Blog not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify(blog), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Error fetching blogs" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const user = protectedRoute(req);

    const { title, content } = await req.json();
    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Title and content are required" }),
        { status: 400 }
      );
    }

    const blogs = readData("blogs.json");

    const newBlog = {
      id: blogs.length + 1,
      title,
      content,
      author: user.username, // Use username from the decoded token
      date: new Date().toISOString(),
    };

    blogs.push(newBlog);
    writeData("blogs.json", blogs);
    return new Response(
      JSON.stringify({ message: "Blog created successfully", blog: newBlog }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.message.startsWith("Unauthorized") ? 401 : 500,
    });
  }
}

export async function PUT(req) {
  try {
    // Validate the token using middleware
    const user = protectedRoute(req);

    // Parse the blog data from the request body
    const { id, title, content } = await req.json();
    if (!id || !title || !content) {
      return new Response(
        JSON.stringify({ error: "ID, title, and content are required" }),
        { status: 400 }
      );
    }

    // Read existing blogs
    const blogs = readData("blogs.json");

    // Find the blog to update
    const blogIndex = blogs.findIndex((blog) => blog.id === id);
    if (blogIndex === -1) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
      });
    }

    // Update the blog content
    blogs[blogIndex] = {
      ...blogs[blogIndex],
      title,
      content,
      updatedDate: new Date().toISOString(),
    };

    // Save the updated blogs list
    writeData("blogs.json", blogs);

    return new Response(
      JSON.stringify({
        message: "Blog updated successfully",
        blog: blogs[blogIndex],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.message.startsWith("Unauthorized") ? 401 : 500,
    });
  }
}

export async function DELETE(req) {
  try {
    // Validate the token using middleware
    const user = protectedRoute(req);

    // Parse the blog ID from the request body
    const { id } = await req.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    // Read existing blogs
    const blogs = readData("blogs.json");

    // Find and remove the blog
    const filteredBlogs = blogs.filter((blog) => blog.id !== id);
    if (filteredBlogs.length === blogs.length) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
      });
    }

    // Save the updated blogs list
    writeData("blogs.json", filteredBlogs);

    return new Response(
      JSON.stringify({ message: "Blog deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.message.startsWith("Unauthorized") ? 401 : 500,
    });
  }
}
