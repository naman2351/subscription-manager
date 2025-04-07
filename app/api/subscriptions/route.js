import pool from '@/app/lib/db.js'

export async function POST(req) {
  let connection;
  try {
    const body = await req.json();

    const { name, registered_email, amount, frequency, nextPaymentDate, email } = body;
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [userRows] = await connection.query(
      'SELECT userid FROM users WHERE email = ?',
      [email]
    );
    const userid = userRows[0].userid;

    const check_subscription_id = await connection.query(
      'SELECT subscription_id FROM subscriptions ORDER BY subscription_id DESC LIMIT 1'
    );
    let new_subscription_id = 0;
    if (check_subscription_id[0].length !==0){
      new_subscription_id = parseInt(check_subscription_id[0][0].subscription_id);
    }
    new_subscription_id+=1;
    await connection.query(
      'INSERT INTO subscriptions (subscription_id, userid, name, registered_email, amount, frequency, next_payment_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [new_subscription_id, userid, name, registered_email, amount, frequency, nextPaymentDate]
    );

    await connection.commit();
    connection.release();

    return new Response(JSON.stringify({ message: "Subscription added successfully" }), { status: 200 });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Server error:", error.message);
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500 });
  }
}
