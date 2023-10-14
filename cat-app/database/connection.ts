import { Pool, Client } from 'pg';

// Create a connection pool for better performance
const pool = new Pool({
  user: 'your_database_user',
  host: 'your_database_host',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 5432, // Default PostgreSQL port
});

// Connecting to the database using a client
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
