import pool from "../../pool.js";

const deletePost = async () => {
  try {
    const postId = process.argv
      .find((arg) => arg.startsWith("--id="))
      ?.split("=")[1];

    if (!postId) {
      throw new Error("ID is required");
    }

    const result = await pool.query(
      "DELETE FROM newsPosts WHERE id = $1 RETURNING *",
      [postId],
    );

    if (result.rowCount === 0) {
      console.log("Post not found");
    } else {
      console.log("Post deleted successfully");
    }
  } catch (err) {
    console.log(err);
  } finally {
    await pool.end();
  }
};

deletePost();
