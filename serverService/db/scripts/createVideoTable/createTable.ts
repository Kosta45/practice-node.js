import pool from "../../pool.js";

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY,
        title TEXT,
        views FLOAT4,
        category TEXT
      )
    `);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
};

createTable();
