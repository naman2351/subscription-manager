import { NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { getSession } from "@/app/lib/session";

export async function GET() {
  let connection;
  try {
    const session = await getSession();

    if (!session || !session.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.email;
    connection = await pool.getConnection();

    console.log(email);

    const [subscriptions] = await connection.query(
      "SELECT s.subscription_id,s.name,s.registered_email,s.amount,s.frequency,s.next_payment_date FROM subscriptions s JOIN users u ON s.userid = u.userid WHERE u.email = ?",
      [email]
    );

    console.log(subscriptions)

    connection.release();

    return NextResponse.json(subscriptions, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    if (connection) connection.release();
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
