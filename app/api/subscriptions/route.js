import pool from "@/app/lib/db.js"

export async function handler(req,res,connection) {
  const {name, registered_email, amount, frequency, nextPaymentDate} = await req.json();
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const userid = await connection.query('select userid from users where email = ?',[sessionStorage.getItem(userEmail)]);
    const lastid = await connection.query('select subscription_id from subscriptions order by subscription_id limit 1');
    let subscription_id = 0;
    if (lastid[0].length != 0){
      subscription_id = parseInt(checkid[0][0].loanid)
    }
    subscription_id += 1;
    await connection.query('Insert into transactions values (?,?,?,?,?,?,?)',[
      subscription_id,userid,name,registered_email,amount,frequency,nextPaymentDate
    ]);
    await connection.commit();
    connection.release();
    res.status(200).json({message: "Data successfully inserted"});
  }
  catch (e){
    if (connection){
      await connection.rollback();
    }
    console.error(e.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}