import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const filePath = path.join(process.cwd(), "users.json");

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    let users = [];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      users = JSON.parse(data);
    } catch (error) {
      console.error("Error reading file:", error);
    }
    if (users.some((user) => user.email === email)) {
      return Response.json({ message: "User already exists!" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    users.push({ name, email, password: hashedPassword });
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");

    return Response.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
