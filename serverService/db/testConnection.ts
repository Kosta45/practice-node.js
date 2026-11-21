import pool from "./pool.js";

const testConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log("Connected to PostgreSQL!");
    console.log(result.rows);
  } catch (error) {
    console.error("Database connection error:", error);
  } finally {
    await pool.end();
  }
};
