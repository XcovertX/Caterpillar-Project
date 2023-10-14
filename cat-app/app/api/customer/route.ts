import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    pool.connect((err, client, done) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        return;
      }
    
      // Catch for client not defined
      if (!client) {
        console.error('Client is undefined:', err);
        return;
      }
    
      // Example query: Select all customers
      client.query('SELECT * FROM Customers', (err, result) => {
        done(); // Release the client back to the pool
    
        if (err) {
          console.error('Error executing query:', err);
          return;
        }
    
        // Process the query result here
        console.log('All Customers:', result.rows);
    
        // Close the pool when done with the database connection
        pool.end();
      });
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
};