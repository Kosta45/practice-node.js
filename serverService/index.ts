import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import logger from "./logger.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import NewspostsService from "./NewspostsService.js";
import errorHandler from "./errors/errorHandler.js";
import { NewspostsServiceError } from "./errors/NewspostsServiceError.js";

const app = express();
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info("Incoming request", {
    method: req.method,
    url: req.originalUrl,
    body: req.body,
  });

  next();
});

const host = process.env.HOST;
const port = Number(process.env.PORT);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientPath = path.resolve(__dirname, "../clientService/dist");

app.use(express.static(clientPath));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.get(
  "/api/newsposts/error",
  (req: Request, res: Response, next: NextFunction) => {
    throw new NewspostsServiceError("Test service error");
  },
);

app.get(
  "/api/newsposts/",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page ?? 0);
      const size = Number(req.query.size ?? 10);

      const posts = NewspostsService.getAll({ page, size });
      return res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  },
);

app.get(
  "/api/newsposts/:id",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      if (typeof id !== "string") {
        return res.status(400).json({
          message: "Invalid ID",
        });
      }

      const post = NewspostsService.getById(id);

      if (!post) {
        return res.status(404).json({
          message: "News post not found.",
        });
      }

      return res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  },
);

app.post(
  "/api/newsposts/",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Request body:", req.body);

      const post = NewspostsService.create(req.body);

      console.log("Post created:", post);
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  },
);

app.put(
  "/api/newsposts/:id",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      if (typeof id !== "string") {
        return res.status(400).json({
          message: "Invalid ID",
        });
      }

      const post = NewspostsService.getById(id);
      const updates = req.body;

      if (!post || !updates) {
        return res.status(404).json({
          message: "News post not found.",
        });
      }

      const updatedPost = NewspostsService.update(id, updates);

      if (!updatedPost) {
        return res.status(404).json({
          message: "News post not found.",
        });
      }

      return res.status(200).json(updatedPost);
    } catch (err) {
      next(err);
    }
  },
);

app.delete(
  "/api/newsposts/:id",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      if (typeof id !== "string") {
        return res.status(400).json({
          message: "Invalid ID",
        });
      }

      const post = NewspostsService.getById(id);

      if (!post) {
        return res.status(404).json({
          message: "News post not found.",
        });
      }

      NewspostsService.delete(id);
      return res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  },
);

app.get("/{*splat}", (req: Request, res: Response) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.use(errorHandler);
app.listen(port, host, () => {
  console.log(`Example app listensing on sport ${host}:${port}`);
});
