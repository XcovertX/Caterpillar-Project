import { NextApiRequest, NextApiResponse } from 'next';
import Connect from '@/lib/db';

export async function GET() {
  let pool = Connect();
  if (pool) {
    try {
      pool.connect((err: any, client, done: () => void) => {
        if (err) {
          console.error('Error connecting to the database:', err);
          console.log("ddddddddddddddddddddddddddd")
          return Response.json({ error: 'Error fetching data', status: 500 });;
        }
        if (!client) {
          console.error('Client is undefined:', err);
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
          return Response.json({ error: 'Error fetching data', status: 500 });;
        }
      
        // Example query: Select all customers
        client.query('SELECT * FROM Customers', (err: any, result: { rows: any; }) => {
          done(); // Release the client back to the pool
      
          if (err) {
            console.error('Error executing query:', err);
            console.log("ffffffffffffffffffffff")
            return Response.json({ error: 'Error fetching data', status: 500 });;
          }
      
          // Process the query result here
          console.log('All Customers:', result.rows);
      
          // Close the pool when done with the database connection
          pool?.end();
          console.log("ggggggggggggggggggggggggg")
          return Response
        });
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return Response.json({ error: 'Error fetching data', status: 500 });
    }
  } else {
    return Response.json({ error: 'Error fetching data', status: 500 });
  }
};