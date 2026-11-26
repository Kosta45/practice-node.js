import pool from "../../pool.js";

const getAll = async () => {
  try {
    const result = await pool.query("SELECT * FROM newsPosts");

    console.log(result.rows);
  } catch (err) {
    console.log(err);
  } finally {
    await pool.end();
  }
};

getAll();
