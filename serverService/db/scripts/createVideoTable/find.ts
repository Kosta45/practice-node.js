import pool from "../../pool.js";

const find = async () => {
  try {
    const findParam = process.argv
      .find((arg) => arg.startsWith("--search="))
      ?.split("=")[1];

    if (!findParam) {
      throw new Error("Invalid param");
    }

    const result = await pool.query(
      "SELECT * FROM videos WHERE title LIKE $1",
      [`%${findParam}%`],
    );

    console.log(result.rows);
  } catch (err) {
    console.log(err);
  } finally {
    await pool.end();
  }
};

find();
