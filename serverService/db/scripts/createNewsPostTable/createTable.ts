import pool from "../../pool.js";

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsPosts (
        id INTEGER PRIMARY KEY,
        title TEXT,
        text TEXT,
        created_date DATE
      )
    `);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
};

createTable();
