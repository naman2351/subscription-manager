import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const filePath = path.join(process.cwd(), "users.json");

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    let users = [];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      if (data.trim().length > 0) {
        users = JSON.parse(data);
      }
    } catch (error) {
      console.error("Error reading file:", error);
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ message: "Invalid password" }, { status: 401 });
    }

    return Response.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
