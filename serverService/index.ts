import "dotenv/config";
import express, { Request, Response } from "express";
import fileDB from "../fileDB/fileDB.js";

const app = express();
app.use(express.json());

const host = process.env.HOST;
const port = Number(process.env.PORT);

const newsPostSchema = {
  id: Number,
  title: String,
  text: String,
  createDate: Date,
};

fileDB.registerSchema("newspost", newsPostSchema);
const newsTablePosts = fileDB.getTable("newspost");

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/newsposts/", (req: Request, res: Response) => {
  try {
    res.json(newsTablePosts.getAll());
  } catch (err) {
    res.status(404).json({
      message: "Posts are not found.",
    });
  }
});
app.get("/api/newsposts/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const post = newsTablePosts.getById(id);

    if (!post) {
      return res.status(404).json({
        message: "News post not found.",
      });
    }

    return res.status(200).json(post);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get post.",
    });
  }
});

app.post("/api/newsposts/", (req: Request, res: Response) => {
  try {
    const post = newsTablePosts.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create news post.",
    });
  }
});

app.put("/api/newsposts/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const post = newsTablePosts.getById(id);
    const updates = req.body;

    if (!post || !updates) {
      return res.status(404).json({
        message: "News post not found.",
      });
    }

    const updatedPost = newsTablePosts.update(id, updates);
    return res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get post.",
    });
  }
});

app.delete("/api/newsposts/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const post = newsTablePosts.getById(id);

    if (!post) {
      return res.status(404).json({
        message: "News post not found.",
      });
    }

    newsTablePosts.delete(id);
    return res.status(200).json(post);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get post.",
    });
  }
});

app.listen(port, host, () => {
  console.log(`Example app listensing on sport ${host}:${port}`);
});
