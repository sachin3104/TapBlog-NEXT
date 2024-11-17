import { readData } from "@/lib/fileHandler";
import { generateToken } from "@/lib/auth";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    // Parse the request body
    const { username, password } = await req.json();

    // Validate input
    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Username and password are required" }),
        { status: 400 }
      );
    }

    // Read users from users.json
    const users = readData("users.json");

    // Check if the username exists
    const user = users.find((u) => u.username === username);
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        { status: 401 }
      );
    }

    // Compare passwords using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        { status: 401 }
      );
    }

    // Generate a JWT
    const token = generateToken({ id: user.id, username: user.username });

    // Respond with the JWT
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // Handle unexpected errors
    console.error("Error during login:", err);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
