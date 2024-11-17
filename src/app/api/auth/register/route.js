import { readData, writeData } from "@/lib/fileHandler";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "username or password is not provided" }),
        { status: 400 }
      );
    }

    const users = readData("users.json");
    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      return new Response(JSON.stringify({ error: "Username already exist" }), {
        status: 409,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
    };

    users.push(newUser);
    writeData("users.json", users);
    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
