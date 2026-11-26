import pool from "../../pool.js";

const paginate = async () => {
  try {
    const paginateParams = {
      page: Number(
        process.argv.find((arg) => arg.startsWith("--page"))?.split("=")[1],
      ),
      size: Number(
        process.argv.find((arg) => arg.startsWith("--size"))?.split("=")[1],
      ),
    };

    if (
      !paginateParams.page ||
      !paginateParams.size ||
      !Number.isInteger(paginateParams.page) ||
      !Number.isInteger(paginateParams.size) ||
      paginateParams.page < 1 ||
      paginateParams.size < 1
    ) {
      throw new Error("Invalid params");
    }

    const offset = (paginateParams.page - 1) * paginateParams.size;

    const result = await pool.query(`SELECT * FROM videos LIMIT $1 OFFSET $2`, [
      paginateParams.size,
      offset,
    ]);

    console.log(result.rows);
  } catch (err) {
    console.log(err);
  } finally {
    await pool.end();
  }
};

paginate();
