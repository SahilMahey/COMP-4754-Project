import { Pool } from "pg";

const pool = new Pool({
    user: "postgres", // Replace with your PostgreSQL username
    host: "localhost",
    database: "movieApp",
    password: "Faw@123456", // Replace with your PostgreSQL password
    port: 5432,
});

export default pool;
