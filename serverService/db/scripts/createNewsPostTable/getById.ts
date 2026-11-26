import pool from "../../pool.js";

const getById = async () => {
  try {
    const postId = process.argv
      .find((arg) => arg.startsWith("--id="))
      ?.split("=")[1];

    if (!postId) {
      throw new Error("ID is required");
    }

    const result = await pool.query("SELECT * FROM newsPosts WHERE id = $1", [
      postId,
    ]);

    console.log(result.rows[0]);
  } catch (err) {
    console.log(err);
  } finally {
    await pool.end();
  }
};

getById();
