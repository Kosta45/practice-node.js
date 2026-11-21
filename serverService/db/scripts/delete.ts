import pool from "../pool.js";

const deletePost = async () => {
  try {
    const postId = process.argv
      .find((arg) => arg.startsWith("--id="))
      ?.split("=")[1];

    if (!postId) {
      throw new Error("ID is required");
    }

    const result = await pool.query(
      "DELETE FROM newsposts WHERE id = $1 RETURNING *",
      [postId],
    );

    console.log(result.rows);
  } catch (err) {
    console.log(err);
  } finally {
    await pool.end();
  }
};

deletePost();
