import pool from "@/app/lib/db.js";
import bcrypt from "bcryptjs";

export async function POST(req) {
  let connection;
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const emails = await connection.query(
      "select email from users"
    );
  
    console.log(emails)
    const emailExists = emails[0].find((e) => e.email === email);
    console.log(emailExists);
    if (emailExists){
      return Response.json({ message: "User already exists" }, { status: 500 });
    }

    let new_user_id = 0;
    const check_user_id = await connection.query(
      'select userid from users order by userid desc limit 1'
    )
    if(check_user_id[0].length !== 0){
      new_user_id = parseInt(check_user_id[0][0].userid);
    }
    new_user_id+=1;

    await connection.query(
      'Insert into users (userid,name,email,password) values (?,?,?,?)',
      [new_user_id,name,email,hashedPassword]
    );

    await connection.commit();
    connection.release();

    return Response.json({ status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}