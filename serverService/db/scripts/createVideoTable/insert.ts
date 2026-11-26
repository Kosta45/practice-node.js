import pool from "../../pool.js";

const insert = async () => {
  try {
    const videoContent = {
      id: Number(
        process.argv.find((arg) => arg.startsWith("--id="))?.split("=")[1],
      ),
      title: process.argv
        .find((arg) => arg.startsWith("--title="))
        ?.split("=")[1]
        ?.toLowerCase()
        .trim(),
      views: Number(
        process.argv.find((arg) => arg.startsWith("--views="))?.split("=")[1],
      ),
      category: process.argv
        .find((arg) => arg.startsWith("--category="))
        ?.split("=")[1],
    };

    if (
      !Number.isInteger(videoContent.id) ||
      videoContent.id <= 0 ||
      !videoContent.title ||
      Number.isNaN(videoContent.views) ||
      !videoContent.category
    ) {
      throw new Error("Invalid video data");
    }

    const result = await pool.query(
      `INSERT INTO videos (id, title, views, category) VALUES ($1, $2, $3, $4)  RETURNING *`,
      [
        videoContent.id,
        videoContent.title,
        videoContent.views,
        videoContent.category,
      ],
    );

    console.log(result.rows);
  } catch (err) {
    console.log(err);
  } finally {
    await pool.end();
  }
};

insert();
