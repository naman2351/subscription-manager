// Using mysql2 package for MySQL database
import mysql from 'mysql2';

// Create a MySQL connection pool (change the credentials according to your database setup)
const pool = mysql.createPool({
  host: 'localhost',       // Replace with your database host
  user: 'root',            // Replace with your database user
  password: 'naman2351',    // Replace with your database password
  database: 'subscription_tracker', // Replace with your database name
});

// Wrap pool.query with a promise-based method for easier async/await usage
const promisePool = pool.promise();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user_id, name, cost, start_date, end_date, recurring } = req.body;

    // Simple validation to ensure all required fields are present
    if (!user_id || !name || !cost || !start_date || !end_date || typeof recurring !== 'boolean') {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      // Insert subscription data into the database
      const query = 'INSERT INTO subscriptions (user_id, name, cost, start_date, end_date, recurring) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [user_id, name, cost, start_date, end_date, recurring];

      // Execute the query
      await promisePool.query(query, values);
      res.status(200).json({ message: 'Subscription added successfully' });
    } catch (error) {
      console.error('Error adding subscription:', error);
      res.status(500).json({ message: 'Error adding subscription' });
    }
  } else {
    // If the request is not a POST request
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
