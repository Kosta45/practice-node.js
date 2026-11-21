import pool from "../pool.js";

const update = async () => {
  try {
    const postContent = {
      id: process.argv.find((arg) => arg.startsWith("--id="))?.split("=")[1],
      title: process.argv
        .find((arg) => arg.startsWith("--title="))
        ?.split("=")[1],
      text: process.argv
        .find((arg) => arg.startsWith("--text="))
        ?.split("=")[1],
    };

    if (!postContent.id) {
      throw new Error("ID is required");
    }

    if (postContent.title === undefined && postContent.text === undefined) {
      throw new Error("At least one field (title or text) is required");
    }

    const result = await pool.query(
      `UPDATE newsposts SET title = COALESCE($2, title), text = COALESCE($3, text)
       WHERE id = $1  RETURNING *`,
      [postContent.id, postContent.title, postContent.text],
    );

    console.log(result.rows);
  } catch (err) {
    console.log(err);
  } finally {
    await pool.end();
  }
};

update();
