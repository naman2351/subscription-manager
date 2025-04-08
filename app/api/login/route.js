import pool from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  let connection;
  try {
    const { email, password } = await req.json();
    connection = await pool.getConnection();

    const users = await connection.query(
      "select * from users"
    );

    const user = users[0].find((u) => u.email === email);
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
