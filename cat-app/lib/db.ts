import { Pool } from "pg";

let pool;

if(!pool) {
    pool = new Pool({
        user: process.env.PGSQL_USER,
        host: process.env.PGSQL_HOST,
        database: process.env.PGSQL_DATABASE,
        password: process.env.PGSQL_PASSWORD,
        port: 5432,
      });
}

export default pool;