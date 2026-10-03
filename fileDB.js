import fs from "fs";

const file = "./data.json";
const schemas = {};

function registerSchema(name, schema) {
  schemas[name] = schema;
}

function getTable(name) {
  const schema = schemas[name];

  {
    function getAll() {
      try {
        const data = fs.readFileSync(file, "utf-8");
        return JSON.parse(data);
      } catch (err) {
        console.log(err);
        return [];
      }
    }

    function getById(id) {
      const data = getAll();
      return data.find((item) => item.id === id);
    }

    function create(dataPost) {
      const data = getAll();

      const post = {
        id: Date.now(),
        ...dataPost,
        createDate: new Date(),
      };

      data.push(post);

      fs.writeFileSync(file, JSON.stringify(data, null, 2));

      return post;
    }

    function update(id, updates) {
      const data = getAll();

      const index = data.findIndex((item) => item.id === id);
      if (index === -1) return null;

      data[index] = {
        ...data[index],
        ...updates,
      };

      fs.writeFileSync(file, JSON.stringify(data, null, 2));

      return data[index];
    }

    function deletePost(id) {
      const data = getAll();

      const newData = data.filter((item) => item.id !== id);

      fs.writeFileSync(file, JSON.stringify(newData, null, 2));

      return id;
    }

    return {
      getAll,
      getById,
      create,
      update,
      delete: deletePost,
    };
  }
}

export default {
  registerSchema,
  getTable,
};
