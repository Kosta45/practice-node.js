import pool from "../pool.js";

const insert = async () => {
  try {
    const createdDate = new Date();

    const postContent = {
      id: process.argv.find((arg) => arg.startsWith("--id="))?.split("=")[1],
      title: process.argv
        .find((arg) => arg.startsWith("--title="))
        ?.split("=")[1],
      text: process.argv
        .find((arg) => arg.startsWith("--text="))
        ?.split("=")[1],
    };

    const result = await pool.query(
      `INSERT INTO newsposts (id, title, text, created_date) VALUES ($1, $2, $3, $4)  RETURNING *`,
      [postContent.id, postContent.title, postContent.text, createdDate],
    );

    console.log(result.rows);
  } catch (err) {
    console.log(err);
  } finally {
    await pool.end();
  }
};

insert();
