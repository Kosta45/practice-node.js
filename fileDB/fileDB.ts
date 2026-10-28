import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type {
  NewPost,
  CreateNewPost,
  UpdateNewPost,
} from "./interfaces/NewPost.js";

type Schema = Record<string, unknown>;

const schemas: Record<string, Schema> = {};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function registerSchema(name: string, schema: Schema): void {
  schemas[name] = schema;
}

class NewsPostTable {
  private file: string;
  private schema: Schema;

  constructor(name: string, schema: Schema) {
    this.file = path.join(__dirname, "data", `${name}.json`);
    this.schema = schema;
  }

  getAll(): NewPost[] {
    try {
      const data = fs.readFileSync(this.file, "utf-8");
      const posts = JSON.parse(data) as NewPost[];

      return posts.map((post) => ({
        ...post,
        createDate: new Date(String(post.createDate)),
      }));
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  getById(id: number): NewPost | undefined {
    const data = this.getAll();
    return data.find((item) => item.id === id);
  }

  create(dataPost: CreateNewPost): NewPost {
    const data = this.getAll();

    const filteredData = Object.fromEntries(
      Object.entries(dataPost).filter(([key]) => key in this.schema),
    ) as CreateNewPost;

    const post: NewPost = {
      id: Date.now(),
      ...filteredData,
      createDate: new Date(),
    };

    data.push(post);

    fs.writeFileSync(this.file, JSON.stringify(data, null, 2));

    return post;
  }

  update(id: number, updates: UpdateNewPost): NewPost | null {
    const data = this.getAll();
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) return null;

    const post = data[index];
    if (!post) return null;

    data[index] = {
      ...post,
      ...updates,
    };

    fs.writeFileSync(this.file, JSON.stringify(data, null, 2));

    return data[index];
  }

  delete(id: number): number | null {
    const data = this.getAll();

    const newData = data.filter((item) => item.id !== id);

    if (newData.length === data.length) return null;

    fs.writeFileSync(this.file, JSON.stringify(newData, null, 2));

    return id;
  }
}

function getTable(name: string): NewsPostTable {
  return new NewsPostTable(name, schemas[name] ?? {});
}

export default {
  registerSchema,
  getTable,
};
