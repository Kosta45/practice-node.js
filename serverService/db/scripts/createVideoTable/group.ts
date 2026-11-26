import pool from "../../pool.js";

const group = async () => {
  try {
    const result = await pool.query(
      "SELECT category, SUM(views) FROM videos GROUP BY category",
    );

    console.log(result.rows);
  } catch (err) {
    console.log(err);
  } finally {
    await pool.end();
  }
};

group();
